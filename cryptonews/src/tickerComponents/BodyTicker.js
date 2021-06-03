import React, { useState, useEffect } from "react";
import DatePicker from "react-date-picker";
import NewsPosts from "./NewsPosts";
import "./styling/BodyTicker.css";
import TickerData from "./TickerData";

const BodyTicker = ({ ticker, displayPortrait }) => {
  const [tickerData, loadTickerData] = useState([]);
  const [tickerPriceStats, updateStats] = useState([]);
  const [tickerLoading, setTickerLoading] = useState(true);

  const [news, updateNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(false);

  const [startDate, changeStartDate] = useState(new Date());
  const [endDate, changeEndDate] = useState(new Date());

  function numberWithCommas(x) {
    const parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  function gotNews() {
    try {
      console.log(JSON.parse(this.responseText));
      setNewsLoading(false);
      updateNews(JSON.parse(this.responseText));
    } catch (e) {
      setNewsLoading(false);
      updateNews("");
    }
  }

  async function beginSearch() {
    let url = "http://localhost:8000/news";
    url += "?keyword=" + tickerData.name;
    url += "&startDate=" + startDate.toISOString().split("T")[0];
    url += "&endDate=" + endDate.toISOString().split("T")[0];
    setNewsLoading(true);
    let res = await new XMLHttpRequest();
    res.onload = gotNews;
    res.onerror = apiError;
    res.open("GET", url);
    res.send();
  }

  function returnSigFigs(value, sigFigs) {
    if (sigFigs === 4) {
      if (value < 1 && value > -1) {
        return Math.round(value * 10000) / 10000;
      } else {
        return Math.round(value * 100) / 100;
      }
    } else if (sigFigs === 2) {
      if (value > 0) {
        return "+" + Math.round(value * 100) / 100;
      } else {
        return Math.round(value * 100) / 100;
      }
    } else {
      return Math.round(value);
    }
  }

  function apiSuccess() {
    try {
      if (this.responseText === "") {
        setTickerLoading(null);
      } else {
        setTickerLoading(false);
      }
      updateStats(JSON.parse(this.responseText).quote.USD);
      loadTickerData(JSON.parse(this.responseText));
    } catch (e) {}
  }

  function apiError() {
    console.log("error");
  }

  const fetchTickerData = async () => {
    setTickerLoading(true);
    let res = await new XMLHttpRequest();
    res.onload = apiSuccess;
    res.onerror = apiError;
    res.open("GET", "http://localhost:8000/data/ticker?ticker=" + ticker);
    res.send();
  };

  useEffect(() => {
    fetchTickerData();
    // eslint-disable-next-line
  }, []);

  if (tickerLoading) {
    return <div>Loading...</div>;
  } else if (tickerLoading === null) {
    return <div>Invalid ticker please try again</div>;
  } else {
    return (
      <div className="outer-div">
        <div className="parent-div">
          <table>
            <tbody>
              <tr>
                <td rowSpan="2">
                  <img
                    alt="img"
                    className="crypto-icon-page"
                    src={
                      "https://s2.coinmarketcap.com/static/img/coins/64x64/" +
                      tickerData.id +
                      ".png"
                    }
                  />
                </td>
                <td>{tickerData.name}</td>
                <td>{ticker}</td>
                <td rowSpan="2">
                  <h3>
                    ${" "}
                    {numberWithCommas(returnSigFigs(tickerPriceStats.price, 4))}
                  </h3>
                </td>
              </tr>
              <tr>
                <td>Rank</td>
                <td># {tickerData.cmc_rank}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="parent-div">
          <div className="news-div">
            <table>
              <thead>
                <tr>
                  <td colSpan="2">Find Information for {tickerData.name}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Select Start Date:</td>
                  <td>
                    <DatePicker
                      onChange={changeStartDate}
                      value={startDate}
                      maxDate={new Date()}
                      minDate={new Date(tickerData.date_added)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Select End Date:</td>
                  <td>
                    <DatePicker
                      onChange={changeEndDate}
                      value={endDate}
                      maxDate={new Date()}
                      minDate={startDate}
                    />
                  </td>
                </tr>
                <tr>
                  <td>News</td>
                  <td>
                    <button onClick={beginSearch}>Search</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <NewsPosts loading={newsLoading} data={news} />
          </div>
          <TickerData
            loading={tickerLoading}
            displayPortrait={displayPortrait}
            tickerData={tickerData}
            tickerPriceStats={tickerPriceStats}
          />
        </div>
      </div>
    );
  }
};

export default BodyTicker;
