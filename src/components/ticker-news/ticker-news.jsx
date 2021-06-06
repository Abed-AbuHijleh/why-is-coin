import React, { useState, useEffect } from "react";
import "./ticker-news.css";

import Twitter from "./twitter.jsx";
import News from "./news.jsx";
import Transactions from "./transactions.jsx";

import VN from "../../resources/emojis/very-negative.png";
import PN from "../../resources/emojis/partial-negative.png";
import N from "../../resources/emojis/neutral.png";
import PP from "../../resources/emojis/partial-positive.png";
import VP from "../../resources/emojis/very-positive.png";

const Component = info => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    let res = await new XMLHttpRequest();
    res.onload = apiSucc;
    res.onerror = console.log();
    res.open(
      "GET",
      "https://why-is-coin-api.herokuapp.com/rtdata/news?keyword=" +
        info.data[1] +
        "&delta=" +
        info.data[0] / 100
    );
    res.send();
  };

  function apiSucc() {
    try {
      setData(JSON.parse(this.responseText));
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className="news-parent-div"
      style={
        window.innerWidth < 960
          ? {
              width: "100%",
              backgroundColor: info.colors[0],
              color: info.colors[2],
              marginTop: "-15px"
            }
          : {
              width: "75vw",
              display: "inline-block",
              backgroundColor: info.colors[0],
              color: info.colors[2]
            }
      }
    >
      <div className="news-div-block">
        <div id="news-div-top">
          <h3>
            News{" "}
            <span
              style={{
                float: "right",
                margin: 0,
                marginTop: "4px",
                marginRight: "5px",
                fontSize: "14px"
              }}
            >
              {" "}
              Total Sentiment:{" "}
              <img
                alt={
                  data.news !== undefined
                    ? data.news.sentiment === 0
                      ? "Neutral"
                      : Math.floor(data.news.sentiment * 100) / 100 + "%"
                    : ""
                }
                src={
                  data.news !== undefined
                    ? // Positive
                      data.news.sentiment > 0.05
                      ? // Very Positive
                        data.news.sentiment > 0.3
                        ? VP
                        : PP
                      : // Negative
                      data.news.sentiment < 0.05
                      ? // Very negative
                        data.news.sentiment < 0.3
                        ? VN
                        : PN
                      : // Neutral
                        N
                    : // no news
                      N
                }
                style={{ width: "17px", display: "inline" }}
              />
            </span>
          </h3>
        </div>
        <div className="news-div-content">
          {loading ? (
            <React.Fragment>Loading..</React.Fragment>
          ) : (
            <News articles={data.news} colors={info.colors} />
          )}
        </div>
      </div>
      <div
        style={
          window.innerWidth < 960
            ? {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                flexDirection: "column"
              }
            : {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                flexDirection: "row"
              }
        }
      >
        <div
          className="news-div-block"
          style={
            window.innerWidth < 960
              ? { width: "90%" }
              : { width: "45%", maxWidth: "600px" }
          }
        >
          <div id="news-div-top">
            <h3 style={{ margin: 0 }}>
              Twitter{" "}
              <span
                style={{
                  float: "right",
                  margin: 0,
                  marginTop: "4px",
                  marginRight: "5px",
                  fontSize: "14px"
                }}
              >
                {" "}
                Total Sentiment:{" "}
                <img
                  alt={
                    data.twitter !== undefined
                      ? data.twitter.sentiment === 0
                        ? "Neutral"
                        : Math.floor(data.twitter.sentiment * 100) / 100 + "%"
                      : ""
                  }
                  src={
                    data.twitter !== undefined
                      ? // Positive
                        data.twitter.sentiment > 0.05
                        ? // Very Positive
                          data.twitter.sentiment > 0.3
                          ? VP
                          : PP
                        : // Negative
                        data.twitter.sentiment < 0.05
                        ? // Very negative
                          data.twitter.sentiment < 0.3
                          ? VN
                          : PN
                        : // Neutral
                          N
                      : // no news
                        N
                  }
                  style={{ width: "17px", display: "inline" }}
                />
              </span>
            </h3>
          </div>
          <div className="news-div-content">
            {loading ? (
              <React.Fragment>Loading..</React.Fragment>
            ) : (
              <Twitter tweets={data.twitter} colors={info.colors} />
            )}
          </div>
        </div>
        <div
          className="news-div-block"
          style={window.innerWidth < 960 ? { width: "90%" } : { width: "45%" }}
        >
          <div id="news-div-top">
            <h3>Whales</h3>
          </div>
          <div className="news-div-content">
            <Transactions colors={info.colors} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component;
