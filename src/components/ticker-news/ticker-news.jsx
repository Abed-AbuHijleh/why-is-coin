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

const polarThreshhold = 40;

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
    <React.Fragment>
      {window.innerWidth < 960 ? (
        <div
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: info.colors[2]
          }}
        >
          <div
            style={{
              backgroundColor: info.colors[3],
              boxShadow: "5px 5px 15px 5px rgba(0,0,0,0.1)",
              width: "95%",
              paddingBottom: "5px",
              paddingLeft: "5px",
              paddingRight: "5px",
              marginBottom: "40px"
            }}
          >
            <div
              style={{
                height: "35px",
                paddingLeft: "10px",
                paddingRight: "10px",
                marginTop: "-10px"
              }}
            >
              <h3>
                News{" "}
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
                        data.news.sentiment > 5
                        ? // Very Positive
                          data.news.sentiment > polarThreshhold
                          ? VP
                          : PP
                        : // Negative
                        data.news.sentiment < -5
                        ? // Very negative
                          data.news.sentiment < polarThreshhold * -1
                          ? VN
                          : PN
                        : // Neutral
                          N
                      : // no news
                        N
                  }
                  style={{ width: "25px", float: "right" }}
                />
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
                </span>
              </h3>
            </div>
            <div
              style={{
                overflowY: "scroll",
                maxHeight: "80vh"
              }}
            >
              {loading ? (
                <React.Fragment>Loading..</React.Fragment>
              ) : (
                <News articles={data.news} colors={info.colors} />
              )}
            </div>
          </div>
          <div
            style={{
              backgroundColor: info.colors[3],
              boxShadow: "5px 5px 15px 5px rgba(0,0,0,0.1)",
              width: "95%",
              paddingBottom: "5px",
              paddingLeft: "5px",
              paddingRight: "5px",
              marginBottom: "40px"
            }}
          >
            <div
              style={{
                height: "35px",
                paddingLeft: "10px",
                paddingRight: "10px",
                paddingTop: "10px"
              }}
            >
              <h3 style={{ margin: 0 }}>
                Twitter{" "}
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
                        data.twitter.sentiment > 5
                        ? // Very Positive
                          data.twitter.sentiment > polarThreshhold
                          ? VP
                          : PP
                        : // Negative
                        data.twitter.sentiment < -5
                        ? // Very negative
                          data.twitter.sentiment < polarThreshhold * -1
                          ? VN
                          : PN
                        : // Neutral
                          N
                      : // no news
                        N
                  }
                  style={{ width: "25px", float: "right" }}
                />
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
                </span>
              </h3>
            </div>
            <div
              style={{
                overflowY: "scroll",
                maxHeight: "600px"
              }}
            >
              {loading ? (
                <React.Fragment>Loading..</React.Fragment>
              ) : (
                <Twitter tweets={data.twitter} colors={info.colors} />
              )}
            </div>
          </div>
          <div
            style={{
              backgroundColor: info.colors[3],
              boxShadow: "5px 5px 15px 5px rgba(0,0,0,0.1)",
              width: "95%",
              paddingBottom: "5px",
              paddingLeft: "5px",
              paddingRight: "5px",
              marginBottom: "40px"
            }}
          >
            <div style={{ marginTop: "-10px" }}>
              <h3 style={{ paddingLeft: "5px" }}>Whales</h3>
            </div>
            <div>
              <Transactions colors={info.colors} />
            </div>
          </div>
        </div>
      ) : (
        <React.Fragment>
          {info.largeScreen ? (
            <div
              style={{
                display: "inline-block",
                width: "calc(100vw - 300px)",
                paddingTop: "50px",
                paddingBottom: "30px",
                color: info.colors[2]
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "calc(100vw - 300px)",
                  justifyContent: "center",
                  alignItems: "baseline"
                }}
              >
                <div
                  style={{
                    width: "min(25%, 550px)",
                    backgroundColor: info.colors[3],
                    boxShadow: "5px 5px 15px 5px rgba(0,0,0,0.1)"
                  }}
                >
                  <div
                    style={{
                      paddingBottom: "40px",
                      paddingLeft: "5px",
                      borderBottom: "1px solid RGB(153, 153, 153)"
                    }}
                  >
                    <div
                      style={{
                        height: "35px",
                        paddingLeft: "5px",
                        paddingRight: "10px",
                        paddingTop: "10px"
                      }}
                    >
                      <h3 style={{ margin: 0 }}>
                        Twitter{" "}
                        <img
                          alt={
                            data.twitter !== undefined
                              ? data.twitter.sentiment === 0
                                ? "Neutral"
                                : Math.floor(data.twitter.sentiment * 100) /
                                    100 +
                                  "%"
                              : ""
                          }
                          src={
                            data.twitter !== undefined
                              ? // Positive
                                data.twitter.sentiment > 5
                                ? // Very Positive
                                  data.twitter.sentiment > polarThreshhold
                                  ? VP
                                  : PP
                                : // Negative
                                data.twitter.sentiment < -5
                                ? // Very negative
                                  data.twitter.sentiment < polarThreshhold * -1
                                  ? VN
                                  : PN
                                : // Neutral
                                  N
                              : // no news
                                N
                          }
                          style={{ width: "25px", float: "right" }}
                        />
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
                        </span>
                      </h3>
                    </div>
                    <div
                      style={{
                        overflowY: "scroll",
                        maxHeight: "1000px"
                      }}
                    >
                      {loading ? (
                        <React.Fragment>Loading..</React.Fragment>
                      ) : (
                        <Twitter tweets={data.twitter} colors={info.colors} />
                      )}
                    </div>
                  </div>
                  <div>
                    <div>
                      <h3 style={{ paddingLeft: "5px" }}>Whales</h3>
                    </div>
                    <div>
                      <Transactions colors={info.colors} />
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: info.colors[3],
                    boxShadow: "5px 5px 15px 5px rgba(0,0,0,0.1)",
                    width: "calc(80% - min(25%, 450px))",
                    marginLeft: "3%",
                    paddingBottom: "10px"
                  }}
                >
                  <div
                    style={{
                      height: "35px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      marginTop: "-10px"
                    }}
                  >
                    <h3>
                      News{" "}
                      <img
                        alt={
                          data.news !== undefined
                            ? data.news.sentiment === 0
                              ? "Neutral"
                              : Math.floor(data.news.sentiment * 100) / 100 +
                                "%"
                            : ""
                        }
                        src={
                          data.news !== undefined
                            ? // Positive
                              data.news.sentiment > 5
                              ? // Very Positive
                                data.news.sentiment > polarThreshhold
                                ? VP
                                : PP
                              : // Negative
                              data.news.sentiment < -5
                              ? // Very negative
                                data.news.sentiment < polarThreshhold * -1
                                ? VN
                                : PN
                              : // Neutral
                                N
                            : // no news
                              N
                        }
                        style={{ width: "25px", float: "right" }}
                      />
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
                      </span>
                    </h3>
                  </div>
                  <div
                    style={{
                      overflowY: "scroll",
                      maxHeight: "1500px"
                    }}
                  >
                    {loading ? (
                      <React.Fragment>Loading..</React.Fragment>
                    ) : (
                      <News articles={data.news} colors={info.colors} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "inline-block",
                width: "calc(100vw - min(24vw, 300px))",
                paddingTop: "30px",
                paddingBottom: "30px",
                color: info.colors[2]
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "calc(100vw - min(24vw, 300px))",
                  justifyContent: "baseline",
                  alignItems: "center"
                }}
              >
                <div
                  style={{
                    backgroundColor: info.colors[3],
                    boxShadow: "5px 5px 15px 5px rgba(0,0,0,0.1)",
                    width: "85%",
                    paddingBottom: "10px"
                  }}
                >
                  <div
                    style={{
                      height: "35px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                      marginTop: "-10px"
                    }}
                  >
                    <h3>
                      News{" "}
                      <img
                        alt={
                          data.news !== undefined
                            ? data.news.sentiment === 0
                              ? "Neutral"
                              : Math.floor(data.news.sentiment * 100) / 100 +
                                "%"
                            : ""
                        }
                        src={
                          data.news !== undefined
                            ? // Positive
                              data.news.sentiment > 5
                              ? // Very Positive
                                data.news.sentiment > polarThreshhold
                                ? VP
                                : PP
                              : // Negative
                              data.news.sentiment < -5
                              ? // Very negative
                                data.news.sentiment < polarThreshhold * -1
                                ? VN
                                : PN
                              : // Neutral
                                N
                            : // no news
                              N
                        }
                        style={{ width: "25px", float: "right" }}
                      />
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
                      </span>
                    </h3>
                  </div>
                  <div
                    style={{
                      overflowY: "scroll",
                      maxHeight: "86vh"
                    }}
                  >
                    {loading ? (
                      <React.Fragment>Loading..</React.Fragment>
                    ) : (
                      <News articles={data.news} colors={info.colors} />
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-evenly",
                    width: "100%",
                    marginTop: "40px"
                  }}
                >
                  <div
                    style={{
                      width: "min(60%, 550px)",
                      backgroundColor: info.colors[3],
                      boxShadow: "5px 5px 15px 5px rgba(0,0,0,0.1)"
                    }}
                  >
                    <div
                      style={{
                        paddingBottom: "40px",
                        paddingLeft: "5px",
                        borderBottom: "1px solid RGB(153, 153, 153)"
                      }}
                    >
                      <div
                        style={{
                          height: "35px",
                          paddingLeft: "5px",
                          paddingRight: "10px",
                          paddingTop: "10px"
                        }}
                      >
                        <h3 style={{ margin: 0 }}>
                          Twitter{" "}
                          <img
                            alt={
                              data.twitter !== undefined
                                ? data.twitter.sentiment === 0
                                  ? "Neutral"
                                  : Math.floor(data.twitter.sentiment * 100) /
                                      100 +
                                    "%"
                                : ""
                            }
                            src={
                              data.twitter !== undefined
                                ? // Positive
                                  data.twitter.sentiment > 5
                                  ? // Very Positive
                                    data.twitter.sentiment > polarThreshhold
                                    ? VP
                                    : PP
                                  : // Negative
                                  data.twitter.sentiment < -5
                                  ? // Very negative
                                    data.twitter.sentiment <
                                    polarThreshhold * -1
                                    ? VN
                                    : PN
                                  : // Neutral
                                    N
                                : // no news
                                  N
                            }
                            style={{ width: "25px", float: "right" }}
                          />
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
                          </span>
                        </h3>
                      </div>
                      <div
                        style={{
                          overflowY: "scroll",
                          maxHeight: "600px"
                        }}
                      >
                        {loading ? (
                          <React.Fragment>Loading..</React.Fragment>
                        ) : (
                          <Twitter tweets={data.twitter} colors={info.colors} />
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundColor: info.colors[3],
                      boxShadow: "5px 5px 15px 5px rgba(0,0,0,0.1)",
                      width: "30%"
                    }}
                  >
                    <div style={{ marginTop: "-10px" }}>
                      <h3 style={{ paddingLeft: "5px" }}>Whales</h3>
                    </div>
                    <div>
                      <Transactions colors={info.colors} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Component;
