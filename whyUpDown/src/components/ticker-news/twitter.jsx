import React from 'react'
import { Tweet } from 'react-twitter-widgets'

const Component = (tweets) => {
  try {
    return (
      <React.Fragment>
        {tweets.tweets.tweets.map((tweet) => {
          return (
            <Tweet
              key={tweet.id}
              options={{
                theme: 'dark',
              }}
              tweetId={tweet.id}
            />
          )
        })}
      </React.Fragment>
    )
  } catch (e) {
    return <h3>API Error</h3>
  }
}

export default Component
