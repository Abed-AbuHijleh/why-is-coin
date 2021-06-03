import React, { useState, useEffect } from 'react'
// eslint-disable-next-line
import { useParams } from 'react-router-dom'

import TickerNotFound from '../resources/images/ticker-not-found.png'

import TopSearch from '../components/top-search/top-search.jsx'
import TickerNews from '../components/ticker-news/ticker-news.jsx'
import TickerInfo from '../components/ticker-info/ticker-info.jsx'

const Ticker = () => {
  let { id } = useParams()
  const [badTicker, setBadTicker] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchTickerData = async (symbol) => {
    let res = await new XMLHttpRequest()
    res.onload = apiSucc
    res.onerror = console.log()
    res.open('GET', 'http://192.168.68.56:8000/data/ticker?ticker=' + symbol)
    res.send()
  }

  function apiSucc() {
    try {
      setData(JSON.parse(this.responseText))
      setLoading(false)
    } catch (e) {
      setLoading(false)
      setBadTicker(true)
    }
  }

  useEffect(() => {
    fetchTickerData(id)
    // eslint-disable-next-line
  }, [])

  return (
    <React.Fragment>
      <TopSearch data={data} />
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <React.Fragment>
          {badTicker ? (
            <div
              style={{
                width: '100%',
                height: '80vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 10,
              }}
            >
              <img
                alt="ticker not found"
                src={TickerNotFound}
                style={{ width: 'min(600px, 90vw)' }}
              />
            </div>
          ) : (
            <div
              style={{
                overflow: 'hidden',
                backgroundColor: 'RGB(70, 69, 69)',
              }}
            >
              <TickerNews data={[data.pc_day, data.name]} />
              <TickerInfo data={data} />
            </div>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default Ticker
