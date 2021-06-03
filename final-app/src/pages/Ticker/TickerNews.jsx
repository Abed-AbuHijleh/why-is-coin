import React from 'react'

const TickerNews = ({ news, months }) => {
  try {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          overflowY: 'scroll',
          border: '2px solid #5B5B5B',
        }}
      >
        {news.map((article) => {
          return (
            <a
              href={article.url}
              rel="noreferrer"
              target="_blank"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <div
                style={{
                  width: '100%',
                  height: '20vh',
                  backgroundColor: 'white',
                  marginBottom: '1px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: '28%',
                    display: 'inline-block',
                    paddingLeft: '2%',
                  }}
                >
                  <img
                    alt="img"
                    src={article.urlToImage}
                    style={{ width: '90%', marginTop: '20%' }}
                  />
                  <p>
                    {months[
                      parseInt(
                        article.publishedAt.split('T')[0].split('-')[1],
                      ) - 1
                    ][0].name +
                      ' ' +
                      article.publishedAt.split('T')[0].split('-')[2] +
                      ', ' +
                      article.publishedAt.split('T')[0].split('-')[0]}
                  </p>
                </div>
                <div
                  style={{
                    width: '70%',
                    display: 'inline-block',
                    float: 'right',
                  }}
                >
                  <h3>{article.title.substring(0, 25) + '...'}</h3>
                  <h5 style={{ marginTop: '-15px' }}>
                    {article.author}
                    {'      '}
                    <span style={{ color: 'gray' }}>{article.source.name}</span>
                  </h5>
                  <p>{article.description.substring(0, 100) + '...'}</p>
                </div>
              </div>
            </a>
          )
        })}
      </div>
    )
  } catch (e) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h2>Select Dates and Press Search</h2>
        <h4>Upgrade to Pro for Advanced Search</h4>
      </div>
    )
  }
}

export default TickerNews
