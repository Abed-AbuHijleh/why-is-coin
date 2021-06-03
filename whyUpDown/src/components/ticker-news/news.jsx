import React from 'react'
import './news.css'

const Component = (articles) => {
  try {
    return (
      <div
        style={{
          margin: 0,
          padding: 0,
        }}
      >
        {articles.articles.articles.map((article) => {
          let date = new Date(article.date)
          date = date.toDateString()
          return (
            <a
              key={article.date}
              href={article.url}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: 'none' }}
            >
              {window.innerWidth < 960 ? (
                <div
                  key={article.title}
                  style={{
                    width: '100%',
                    height: '190px',
                    marginBottom: '10px',
                    borderRadius: '10px',
                    backgroundColor: 'black',
                  }}
                >
                  <div
                    style={{
                      height: '120px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      margin: '5%',
                    }}
                  >
                    <h3
                      style={{
                        color: 'white',
                        maxWidth: '60%',
                        textDecoration: 'underline',
                        textDecorationColor: 'blue',
                      }}
                    >
                      {article.title}
                    </h3>
                    <img
                      style={{
                        maxHeight: '100px',
                        float: 'right',
                        maxWidth: '30%',
                      }}
                      alt={article.title}
                      src={article.image}
                    />
                  </div>
                  <div
                    style={{
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      margin: '5%',
                    }}
                    className="mobile-news-div"
                  >
                    <span>
                      <h5>{article.source} </h5>
                      <h5 style={{ color: 'RGB(153, 153, 153)' }}>
                        {article.author}{' '}
                      </h5>
                    </span>
                    <span>
                      <h5>
                        {' '}
                        Sentiment:{' '}
                        {article.sentiment === 0
                          ? 'Neutral'
                          : Math.floor(article.sentiment * 100) / 100 + '%'}
                      </h5>
                      <h5 style={{ color: 'RGB(153, 153, 153)' }}> {date}</h5>
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  key={article.title}
                  style={{
                    display: 'inline-block',
                    width: '49%',
                    height: '400px',
                    borderLeft: '1px solid white',
                    backgroundColor: 'black',
                    marginBottom: '10px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    className="desktop-title-div"
                    style={{ height: '100px' }}
                  >
                    <div
                      style={{
                        display: 'inline-block',
                        maxWidth: '50%',
                      }}
                    >
                      <h4>{article.source}</h4>

                      <h5 style={{ color: 'white' }}>{article.author}</h5>
                      <h5>{date}</h5>
                    </div>
                    <div
                      style={{
                        display: 'inline-block',
                        float: 'right',
                        maxWidth: '50%',
                      }}
                    >
                      <img
                        style={{ height: '100px' }}
                        alt={article.title}
                        src={article.image}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      height: '170px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      padding: '10%',
                      width: '80%',
                    }}
                  >
                    <h3 style={{ color: 'white' }}>{article.title}</h3>
                    <h5 style={{ color: 'RGB(153, 153, 153)' }}>
                      {article.description}
                    </h5>
                  </div>
                  <div
                    style={{
                      marginLeft: '10px',
                      color: 'RGB(62,136,199)',
                    }}
                  >
                    Sentiment:{' '}
                    {article.sentiment === 0
                      ? 'Neutral'
                      : Math.floor(article.sentiment * 100) / 100 + '%'}
                  </div>
                </div>
              )}
            </a>
          )
        })}
      </div>
    )
  } catch (e) {
    return <h3>API error</h3>
  }
}

export default Component
