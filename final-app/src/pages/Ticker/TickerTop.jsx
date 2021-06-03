import React, { useState, useEffect } from 'react'
import './TickerTop.css'

import Button from '@material-ui/core/Button'
import Slider from '@material-ui/core/Slider'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { BsArrowCounterclockwise } from 'react-icons/bs'

const TickerTop = ({ id, data, dataQuotes, fetchPosts }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [highlowTime, setHighLowTime] = useState('24h')
  const [highlow, setHighLow] = useState([0, 1])

  const numberWithCommas = (x) => {
    const parts = x.toString().split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.join('.')
  }

  const returnSigFigs = (value, sigFigs) => {
    if (sigFigs === 4) {
      if (value < 1 && value > -1) {
        if (value < 0.001 && value > -0.001) {
          return Math.round(value * 10000000) / 10000000
        } else {
          return Math.round(value * 10000) / 10000
        }
      } else {
        return Math.round(value * 100) / 100
      }
    } else if (sigFigs === 2) {
      if (value > 0) {
        return '+' + Math.round(value * 100) / 100
      } else {
        return Math.round(value * 100) / 100
      }
    } else {
      return Math.round(value)
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleCloseT = () => {
    if (highlowTime === '1h') {
    } else {
      fetchHighLow('1h')
      setHighLowTime('1h')
    }
    setAnchorEl(null)
  }

  const handleCloseF = () => {
    if (highlowTime === '24h') {
    } else {
      fetchHighLow('24h')
      setHighLowTime('24h')
    }
    setAnchorEl(null)
  }

  const handleCloseH = () => {
    if (highlowTime === '7d') {
    } else {
      fetchHighLow('7d')
      setHighLowTime('7d')
    }
    setAnchorEl(null)
  }

  const markings = [
    {
      value: 0,
      label: '$' + numberWithCommas(returnSigFigs(highlow[0], 4)),
    },
    {
      value: 100,
      label: '$' + numberWithCommas(returnSigFigs(highlow[1], 4)),
    },
  ]

  const value =
    ((dataQuotes.price - highlow[0]) / (highlow[1] - highlow[0])) * 100

  function apiFail() {
    console.log(this)
  }

  function fetchHLSucc() {
    try {
      let res = JSON.parse(this.responseText)[0]
      setHighLow([res.price_low, res.price_high])
    } catch (e) {
      console.log(e)
    }
  }

  const fetchHighLow = async (time) => {
    try {
      let res = await new XMLHttpRequest()
      res.onload = fetchHLSucc
      res.onerror = apiFail
      res.open(
        'GET',
        'http://192.168.68.59:8000/data/latest/hl?symbol=' +
          id +
          '&time=' +
          time,
      )
      res.send()
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchHighLow(highlowTime)
    // eslint-disable-next-line
  }, [])

  return (
    <React.Fragment>
      {window.innerWidth < 960 ? (
        <React.Fragment>
          <span style={{ display: 'inline-block' }}>
            <img
              alt={data.name}
              src={
                'https://s2.coinmarketcap.com/static/img/coins/128x128/' +
                data.id +
                '.png'
              }
              style={{ width: '6vh', marginTop: '1vh', marginLeft: 7 }}
            />
          </span>
          <span
            style={{
              display: 'inline-block',
              margin: '1vw',
              marginRight: 0,
            }}
          >
            <h2 style={{ marginBottom: -10 }}>
              {data.name}{' '}
              <span>
                <div
                  style={{
                    display: 'inline',
                    padding: 5,
                    borderRadius: 5,
                    backgroundColor: 'rgb(130, 130, 140)',
                    color: 'white',
                    fontSize: '0.7em',
                  }}
                >
                  {data.symbol}
                </div>
              </span>
            </h2>
            <h5>Market Cap Rank #{data.cmc_rank}</h5>
          </span>
          <span
            style={{
              float: 'right',
              display: 'inline-block',
              margin: '2vw',
              marginTop: '2vh',
              marginLeft: 0,
            }}
          >
            <h2 style={{ marginBottom: -10, marginTop: -1 }}>
              {'$' + numberWithCommas(returnSigFigs(dataQuotes.price, 4))}
            </h2>
            <h3 id={dataQuotes.percent_change_1h < 0 ? 'red' : 'green'}>
              {returnSigFigs(dataQuotes.percent_change_1h, 2) + '%'}
            </h3>
          </span>
          <div
            style={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: '5px',
              marginBottom: '5px',
            }}
          >
            <span>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => {
                  fetchPosts()
                  fetchHighLow(highlowTime)
                }}
              >
                Refresh
                <BsArrowCounterclockwise style={{ marginLeft: 3 }} />
              </Button>
            </span>
            <span>High/Low</span>
            <span>
              <Slider
                value={value}
                valueLabelDisplay="off"
                marks={markings}
                style={{
                  color: 'blue',
                  margin: 0,
                  padding: 0,
                  display: 'inline-block',
                  width: '33vw',
                }}
                disabled
              />
            </span>
            <span>
              <Button
                color="primary"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                size="small"
              >
                <h3>{highlowTime}</h3>
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleCloseT}>1h</MenuItem>
                <MenuItem onClick={handleCloseF}>24h</MenuItem>
                <MenuItem onClick={handleCloseH}>7d</MenuItem>
              </Menu>
            </span>
          </div>
        </React.Fragment>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          <span style={{ display: 'inline-block' }}>
            <img
              alt={data.name}
              src={
                'https://s2.coinmarketcap.com/static/img/coins/128x128/' +
                data.id +
                '.png'
              }
              style={{ width: '6vh', marginTop: '1vh', marginLeft: 7 }}
            />
          </span>
          <span
            style={{
              display: 'inline-block',
              margin: '1vw',
              marginRight: 0,
            }}
          >
            <h2 style={{ marginBottom: -10, marginRight: '50px' }}>
              {data.name}{' '}
              <span>
                <div
                  style={{
                    display: 'inline',
                    padding: 5,
                    borderRadius: 5,
                    backgroundColor: 'rgb(130, 130, 140)',
                    color: 'white',
                    fontSize: '0.7em',
                  }}
                >
                  {data.symbol}
                </div>
              </span>
            </h2>
            <h5>Market Cap Rank #{data.cmc_rank}</h5>
          </span>
          <span>
            <span style={{ marginRight: '15px' }}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => {
                  fetchPosts()
                  fetchHighLow(highlowTime)
                }}
              >
                Refresh
                <BsArrowCounterclockwise style={{ marginLeft: 3 }} />
              </Button>
            </span>
            <span>
              <h5 style={{ display: 'inline', marginRight: '15px' }}>
                High/Low
              </h5>
            </span>
            <span>
              <Slider
                value={value}
                valueLabelDisplay="off"
                marks={markings}
                style={{
                  color: 'blue',
                  margin: 0,
                  padding: 0,
                  display: 'inline-block',
                  width: '25vw',
                }}
                disabled
              />
            </span>
            <span>
              <Button
                color="primary"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                size="small"
              >
                <h3>{highlowTime}</h3>
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleCloseT}>1h</MenuItem>
                <MenuItem onClick={handleCloseF}>24h</MenuItem>
                <MenuItem onClick={handleCloseH}>7d</MenuItem>
              </Menu>
            </span>
          </span>
          <span
            style={{
              margin: '2vw',
              marginTop: '2vh',
              marginLeft: 0,
              display: 'inline-block',
            }}
          >
            <h2 style={{ marginBottom: -10, marginTop: -1 }}>
              {'$' + numberWithCommas(returnSigFigs(dataQuotes.price, 4))}
            </h2>
            <h3 id={dataQuotes.percent_change_1h < 0 ? 'red' : 'green'}>
              {returnSigFigs(dataQuotes.percent_change_1h, 2) + '%'}
            </h3>
          </span>
        </div>
      )}
    </React.Fragment>
  )
}

export default TickerTop
