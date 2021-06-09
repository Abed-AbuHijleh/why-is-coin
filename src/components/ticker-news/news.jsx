import React from "react";
import "./news.css";

import VN from "../../resources/emojis/very-negative.png";
import PN from "../../resources/emojis/partial-negative.png";
import N from "../../resources/emojis/neutral.png";
import PP from "../../resources/emojis/partial-positive.png";
import VP from "../../resources/emojis/very-positive.png";

const polarThreshhold = 40;

const Component = info => {
  try {
    return (
      <React.Fragment>
        {window.innerWidth < 960 ? (
          <div
            style={{
              margin: 0,
              padding: 0,
              overflowX: "hidden"
            }}
          >
            {info.articles.articles.map(article => {
              let date = new Date(article.date);
              date = date.toDateString();
              return (
                <a
                  key={article.date}
                  href={article.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    textDecoration: "none"
                  }}
                >
                  <div
                    key={article.title}
                    style={
                      info.colors[0] === "RGB(34, 34, 34)"
                        ? {
                            width: "min(99%, 600px)",
                            minHeight: "190px",
                            marginBottom: "10px",
                            borderRadius: "10px",
                            border: "1px solid RGB(44, 44, 54)",
                            backgroundColor: info.colors[6]
                          }
                        : {
                            width: "min(99%, 600px)",
                            minHeight: "190px",
                            marginBottom: "10px",
                            borderRadius: "10px",
                            border: "1px solid RGB(203, 203, 213)",
                            backgroundColor: info.colors[6]
                          }
                    }
                  >
                    <div
                      style={{
                        height: "120px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        margin: "5%",
                        marginBottom: "-15px"
                      }}
                    >
                      <h3
                        style={{
                          color: info.colors[2],
                          maxWidth: "60%",
                          textDecoration: "underline",
                          textDecorationColor: info.colors[5]
                        }}
                      >
                        {article.title}
                      </h3>
                      <img
                        style={{
                          height: "100px",
                          width: "35%",
                          objectFit: "cover",
                          float: "right",
                          borderRadius: "10px"
                        }}
                        alt={article.title}
                        src={article.image}
                      />
                    </div>
                    <div
                      style={{
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        margin: "5%"
                      }}
                      className="mobile-news-div"
                    >
                      <span>
                        <h5 style={{ color: info.colors[2] }}>
                          {article.source}{" "}
                        </h5>
                        <h5 style={{ color: "RGB(153, 153, 153)" }}>
                          {article.author}{" "}
                        </h5>
                      </span>
                      <span>
                        <h5 style={{ color: info.colors[2] }}>
                          {" "}
                          Sentiment:{" "}
                          <img
                            alt={
                              article.sentiment === 0
                                ? "Neutral"
                                : Math.floor(article.sentiment * 100) / 100 +
                                  "%"
                            }
                            src={
                              // Positive
                              article.sentiment > 5
                                ? // Very Positive
                                  article.sentiment > polarThreshhold
                                  ? VP
                                  : PP
                                : // Negative
                                article.sentiment < -5
                                ? // Very negative
                                  article.sentiment < polarThreshhold * -1
                                  ? VN
                                  : PN
                                : // Neutral
                                  N
                            }
                            style={{ width: "18px", display: "inline" }}
                          />
                        </h5>
                        <h5 style={{ color: "RGB(153, 153, 153)" }}> {date}</h5>
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <div className="news-div">
            {info.articles.articles.map((article, index) => {
              let date = new Date(article.date);
              date = date.toDateString();
              if (index === 0) {
                return (
                  <div
                    className="news-large"
                    style={
                      info.colors[0] === "RGB(34, 34, 34)"
                        ? {
                            backgroundColor: info.colors[6],
                            color: info.colors[2],
                            border: "1px solid RGB(44, 44, 54)"
                          }
                        : {
                            backgroundColor: info.colors[6],
                            color: info.colors[2],
                            border: "1px solid RGB(203, 203, 213)"
                          }
                    }
                  >
                    <a
                      key={article.date}
                      href={article.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        textDecoration: "none"
                      }}
                    >
                      <img
                        style={{
                          width: "100%",
                          objectFit: "cover",
                          maxHeight: "calc((67.5vw - 22px) / 3)"
                        }}
                        alt={article.title}
                        src={article.image}
                      />
                      <div
                        style={{
                          width: "calc(100% - 30px)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingTop: "5px",
                          paddingLeft: "10px",
                          paddingRight: "20px"
                        }}
                      >
                        <span>
                          <h4
                            style={{
                              margin: 0,
                              color: info.colors[2]
                            }}
                          >
                            {article.source}{" "}
                            <span
                              style={{
                                marginLeft: "10px",
                                color: "RGB(153, 153, 153)"
                              }}
                            >
                              {article.author}
                            </span>
                          </h4>
                          <br />
                          <h5
                            style={{
                              color: info.colors[2],
                              margin: 0,
                              marginTop: "-10px"
                            }}
                          >
                            {date}
                          </h5>
                        </span>
                        <span
                          style={{ color: info.colors[2], fontSize: "14px" }}
                        >
                          Sentiment:{" "}
                          <img
                            alt={
                              article.sentiment === 0
                                ? "Neutral"
                                : Math.floor(article.sentiment * 100) / 100 +
                                  "%"
                            }
                            src={
                              // Positive
                              article.sentiment > 5
                                ? // Very Positive
                                  article.sentiment > polarThreshhold
                                  ? VP
                                  : PP
                                : // Negative
                                article.sentiment < -5
                                ? // Very negative
                                  article.sentiment < polarThreshhold * -1
                                  ? VN
                                  : PN
                                : // Neutral
                                  N
                            }
                            style={{
                              width: "30px",
                              display: "inline"
                            }}
                          />
                        </span>
                      </div>
                      <h1
                        style={{
                          color: info.colors[2],
                          textAlign: "center",
                          fontWeight: "550"
                        }}
                      >
                        {article.title}
                      </h1>
                      {window.innerWidth < 1500 ? (
                        <h3
                          style={{
                            color: "RGB(153, 153, 153)",
                            margin: 0,
                            paddingLeft: "15px",
                            paddingRight: "15px",
                            paddingTop: "10px",
                            textAlign: "center",
                            fontWeight: "450"
                          }}
                        >
                          {article.content.slice(
                            0,
                            article.content.length - 13
                          )}
                        </h3>
                      ) : (
                        <h2
                          style={{
                            color: "RGB(153, 153, 153)",
                            margin: 0,
                            paddingLeft: "15px",
                            paddingRight: "15px",
                            paddingTop: "10px",
                            textAlign: "center"
                          }}
                        >
                          {article.content.slice(
                            0,
                            article.content.length - 13
                          )}
                        </h2>
                      )}
                    </a>
                  </div>
                );
              } else if (index === 1 || index === 2) {
                return (
                  <div
                    className="news-side"
                    style={
                      info.colors[0] === "RGB(34, 34, 34)"
                        ? {
                            backgroundColor: info.colors[6],
                            color: info.colors[2],
                            border: "1px solid RGB(44, 44, 54)"
                          }
                        : {
                            backgroundColor: info.colors[6],
                            color: info.colors[2],
                            border: "1px solid RGB(203, 203, 213)"
                          }
                    }
                  >
                    <a
                      key={article.date}
                      href={article.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        textDecoration: "none"
                      }}
                    >
                      <div
                        style={{
                          width: "calc(100% - 30px)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingTop: "5px",
                          paddingLeft: "10px",
                          paddingRight: "20px"
                        }}
                      >
                        <h5
                          style={{
                            margin: 0,
                            color: info.colors[2]
                          }}
                        >
                          {article.source}{" "}
                          <span
                            style={{
                              color: "RGB(153, 153, 153)"
                            }}
                          >
                            <br />
                            {article.author}
                          </span>
                        </h5>
                        <span
                          style={{ color: info.colors[2], fontSize: "14px" }}
                        >
                          {date}
                        </span>
                      </div>
                      <h3
                        style={{
                          color: info.colors[2],
                          margin: 0,
                          paddingLeft: "15px",
                          paddingRight: "15px",
                          paddingTop: "calc(20px + 15%)",
                          textAlign: "center"
                        }}
                      >
                        {article.title}
                      </h3>
                      <h4
                        style={{
                          color: "RGB(153, 153, 153)",
                          margin: 0,
                          paddingLeft: "15px",
                          paddingRight: "15px",
                          paddingTop: "10px",
                          textAlign: "center"
                        }}
                      >
                        {article.content.slice(0, article.content.length - 13)}
                      </h4>
                      <div
                        style={{
                          width: "100%",
                          height: "35px",
                          marginTop: "40px"
                        }}
                      >
                        <span
                          style={{
                            color: info.colors[2],
                            fontSize: "14px",
                            float: "right",
                            paddingRight: "10px",
                            position: "absolute",
                            bottom: "10px",
                            right: "10px"
                          }}
                        >
                          Sentiment:{" "}
                          <img
                            alt={
                              article.sentiment === 0
                                ? "Neutral"
                                : Math.floor(article.sentiment * 100) / 100 +
                                  "%"
                            }
                            src={
                              // Positive
                              article.sentiment > 5
                                ? // Very Positive
                                  article.sentiment > polarThreshhold
                                  ? VP
                                  : PP
                                : // Negative
                                article.sentiment < -5
                                ? // Very negative
                                  article.sentiment < polarThreshhold * -1
                                  ? VN
                                  : PN
                                : // Neutral
                                  N
                            }
                            style={{
                              width: "25px",
                              display: "inline"
                            }}
                          />
                        </span>
                      </div>
                    </a>
                  </div>
                );
              } else {
                return (
                  <div
                    className="news-remainder"
                    style={
                      info.colors[0] === "RGB(34, 34, 34)"
                        ? {
                            backgroundColor: info.colors[6],
                            color: info.colors[2],
                            border: "1px solid RGB(44, 44, 54)"
                          }
                        : {
                            backgroundColor: info.colors[6],
                            color: info.colors[2],
                            border: "1px solid RGB(203, 203, 213)"
                          }
                    }
                  >
                    <a
                      key={article.date}
                      href={article.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        textDecoration: "none"
                      }}
                    >
                      <img
                        style={{
                          width: "100%",
                          objectFit: "cover",
                          maxHeight: "calc((67.5vw - 27px) / 6)"
                        }}
                        alt={article.title}
                        src={article.image}
                      />
                      <div
                        style={{
                          width: "calc(100% - 30px)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingTop: "5px",
                          paddingLeft: "10px",
                          paddingRight: "20px"
                        }}
                      >
                        <h5
                          style={{
                            margin: 0,
                            color: info.colors[2]
                          }}
                        >
                          {article.source}{" "}
                          <span
                            style={{
                              color: "RGB(153, 153, 153)"
                            }}
                          >
                            <br />
                            {article.author}
                          </span>
                        </h5>
                        <span
                          style={{ color: info.colors[2], fontSize: "14px" }}
                        >
                          {date}
                        </span>
                      </div>
                      <h3
                        style={{
                          color: info.colors[2],
                          margin: 0,
                          paddingLeft: "15px",
                          paddingRight: "15px",
                          paddingTop: "20px",
                          textAlign: "center"
                        }}
                      >
                        {article.title}
                      </h3>
                      <h4
                        style={{
                          color: "RGB(153, 153, 153)",
                          margin: 0,
                          paddingLeft: "15px",
                          paddingRight: "15px",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                          textAlign: "center"
                        }}
                      >
                        {article.content.slice(0, article.content.length - 13)}
                      </h4>
                      <div
                        style={{
                          width: "100%",
                          marginTop: "40px"
                        }}
                      >
                        <span
                          style={{
                            color: info.colors[2],
                            fontSize: "14px",
                            float: "right",
                            position: "absolute",
                            bottom: "10px",
                            right: "10px"
                          }}
                        >
                          Sentiment:{" "}
                          <img
                            alt={
                              article.sentiment === 0
                                ? "Neutral"
                                : Math.floor(article.sentiment * 100) / 100 +
                                  "%"
                            }
                            src={
                              // Positive
                              article.sentiment > 5
                                ? // Very Positive
                                  article.sentiment > polarThreshhold
                                  ? VP
                                  : PP
                                : // Negative
                                article.sentiment < -5
                                ? // Very negative
                                  article.sentiment < polarThreshhold * -1
                                  ? VN
                                  : PN
                                : // Neutral
                                  N
                            }
                            style={{
                              width: "25px",
                              display: "inline"
                            }}
                          />
                        </span>
                      </div>
                    </a>
                  </div>
                );
              }
            })}
          </div>
        )}
      </React.Fragment>
    );
  } catch (e) {
    return <h3>API error</h3>;
  }
};

export default Component;
