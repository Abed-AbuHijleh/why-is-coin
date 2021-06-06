import React from "react";
import "./news.css";

import VN from "../../resources/emojis/very-negative.png";
import PN from "../../resources/emojis/partial-negative.png";
import N from "../../resources/emojis/neutral.png";
import PP from "../../resources/emojis/partial-positive.png";
import VP from "../../resources/emojis/very-positive.png";

const Component = info => {
  try {
    return (
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
              {window.innerWidth < 960 ? (
                <div
                  key={article.title}
                  style={
                    info.colors[0] === "RGB(34, 34, 34)"
                      ? {
                          width: "min(99%, 600px)",
                          height: "190px",
                          marginBottom: "10px",
                          borderRadius: "10px",
                          border: "2px solid " + info.colors[3],
                          backgroundColor: "black"
                        }
                      : {
                          width: "min(99%, 600px)",
                          height: "190px",
                          marginBottom: "10px",
                          borderRadius: "10px",
                          border: "1px solid gray",
                          backgroundColor: info.colors[3]
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
                        maxHeight: "100px",
                        float: "right",
                        maxWidth: "30%"
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
                              : Math.floor(article.sentiment * 100) / 100 + "%"
                          }
                          src={
                            // Positive
                            article.sentiment > 0.05
                              ? // Very Positive
                                article.sentiment > 0.3
                                ? VP
                                : PP
                              : // Negative
                              article.sentiment < 0.05
                              ? // Very negative
                                article.sentiment < 0.3
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
              ) : (
                <div
                  key={article.title}
                  style={
                    info.colors[0] === "RGB(34, 34, 34)"
                      ? {
                          display: "inline-block",
                          width: "min(49%, 550px)",
                          height: "420px",
                          marginLeft: "5px",
                          marginBottom: "10px",
                          overflow: "hidden",
                          borderRadius: "15px",
                          border: "2px solid " + info.colors[3],
                          backgroundColor: "black"
                        }
                      : {
                          display: "inline-block",
                          width: "min(49%, 550px)",
                          height: "420px",
                          marginLeft: "5px",
                          marginBottom: "10px",
                          overflow: "hidden",
                          borderRadius: "15px",
                          border: "1px solid gray",
                          backgroundColor: info.colors[3]
                        }
                  }
                >
                  <div
                    className="desktop-title-div"
                    style={{ height: "100px" }}
                  >
                    <div
                      style={{
                        display: "inline-block",
                        maxWidth: "50%"
                      }}
                    >
                      <h4 style={{ color: info.colors[2] }}>
                        {article.source}
                      </h4>

                      <h5 style={{ color: info.colors[2] }}>
                        {article.author}
                      </h5>
                      <h5>{date}</h5>
                    </div>
                    <div
                      style={{
                        display: "inline-block",
                        float: "right",
                        maxWidth: "50%"
                      }}
                    >
                      <img
                        style={{ height: "100px" }}
                        alt={article.title}
                        src={article.image}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      height: "170px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      padding: "10%",
                      width: "80%"
                    }}
                  >
                    <h3 style={{ color: info.colors[2] }}>{article.title}</h3>
                    <h5 style={{ color: "RGB(153, 153, 153)" }}>
                      {article.description}
                    </h5>
                  </div>
                  <div
                    style={{
                      marginLeft: "10px",
                      color: info.colors[5]
                    }}
                  >
                    Sentiment:{" "}
                    <img
                      alt={
                        article.sentiment === 0
                          ? "Neutral"
                          : Math.floor(article.sentiment * 100) / 100 + "%"
                      }
                      src={
                        // Positive
                        article.sentiment > 0.05
                          ? // Very Positive
                            article.sentiment > 0.3
                            ? VP
                            : PP
                          : // Negative
                          article.sentiment < 0.05
                          ? // Very negative
                            article.sentiment < 0.3
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
                  </div>
                </div>
              )}
            </a>
          );
        })}
      </div>
    );
  } catch (e) {
    return <h3>API error</h3>;
  }
};

export default Component;
