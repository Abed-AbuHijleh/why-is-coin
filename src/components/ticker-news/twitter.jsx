import React from "react";
import { Tweet } from "react-twitter-widgets";

const Component = info => {
  try {
    return (
      <React.Fragment>
        {info.tweets.tweets.map(tweet => {
          return (
            <Tweet
              key={tweet.id}
              options={{
                theme: info.colors[0] === "#f3f3f3" ? "light" : "dark"
              }}
              tweetId={tweet.id}
            />
          );
        })}
      </React.Fragment>
    );
  } catch (e) {
    return <h3>API Error</h3>;
  }
};

export default Component;
