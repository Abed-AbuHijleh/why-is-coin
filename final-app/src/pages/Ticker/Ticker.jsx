import React, { useState, useEffect } from 'react'
import TickerDNE from '../../assets/img/Ticker-Not-Found.png'
import NewsImg from '../../assets/img/Coming-Soon.png'
import './Ticker.css'

// eslint-disable-next-line
import { BrowserRouter as Router, useParams } from 'react-router-dom'

import TickerInfo from './TickerInfo.jsx'
import TickerNews from './TickerNews.jsx'
import TickerTop from './TickerTop.jsx'
import TickerMain from './TickerMain.jsx'

import DatePicker from 'react-date-picker'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Slider from '@material-ui/core/Slider'

import { BsX } from 'react-icons/bs'
import { BsArrowCounterclockwise } from 'react-icons/bs'

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

const Ticker = () => {
  // endpoint
  let { id } = useParams()

  // Data
  const [loading, setLoading] = useState(false)
  const [badTicker, setBadTicker] = useState(false)
  const [data, setData] = useState({})

  // For Mobile
  const [DrawerToggled, ToggleDrawer] = useState(false)

  // Date picker
  const [sliderToggled, toggleSlider] = useState(true)

  // Date Values
  const [sliderLength, setSliderLength] = useState(7)
  const [sliderValue, setSliderValue] = useState([0, sliderLength])
  const [startDate, changeStartDate] = useState(new Date())
  const [endDate, changeEndDate] = useState(new Date())

  const [news, updateNews] = useState([''])

  const months = [
    {
      0: [
        {
          name: 'January',
          days: '31',
        },
      ],
      1: [
        {
          name: 'February',
          days: '28',
        },
      ],
      2: [
        {
          name: 'March',
          days: '31',
        },
      ],
      3: [
        {
          name: 'April',
          days: '30',
        },
      ],
      4: [
        {
          name: 'May',
          days: '31',
        },
      ],
      5: [
        {
          name: 'June',
          days: '30',
        },
      ],
      6: [
        {
          name: 'July',
          days: '31',
        },
      ],
      7: [
        {
          name: 'August',
          days: '31',
        },
      ],
      8: [
        {
          name: 'September',
          days: '30',
        },
      ],
      9: [
        {
          name: 'October',
          days: '31',
        },
      ],
      10: [
        {
          name: 'November',
          days: '30',
        },
      ],
      11: [
        {
          name: 'December',
          days: '31',
        },
      ],
    },
  ]

  function MenuClicked() {
    ToggleDrawer(!DrawerToggled)
  }

  function apiFail() {
    console.log(this)
  }

  function postSucc() {
    try {
      setLoading(false)
      setData(JSON.parse(this.responseText))
    } catch (e) {
      setBadTicker(true)
      console.log(e)
    }
  }

  const fetchPosts = async () => {
    setLoading(true)
    let res = await new XMLHttpRequest()
    res.onload = postSucc
    res.onerror = apiFail
    res.open('GET', 'http://192.168.68.59:8000/data/ticker?ticker=' + id)
    res.send()
  }

  function newsSucc() {
    try {
      updateNews(JSON.parse(this.responseText).articles)
    } catch (e) {
      console.log(e)
    }
  }

  const fetchNews = async (reqParams) => {
    try {
      let res = await new XMLHttpRequest()
      res.onload = newsSucc
      res.onerror = apiFail
      res.open(
        'GET',
        'http://192.168.68.59:8000/news?keyword=' +
          reqParams[0] +
          '&startDate=' +
          reqParams[1] +
          '&endDate=' +
          reqParams[2],
      )
      res.send()
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchPosts()
    // eslint-disable-next-line
  }, [])

  const handleChange = (event, newValue) => {
    setSliderValue(newValue)
  }

  const updateSearchParams = () => {
    try {
      const array = [data.name]
      if (sliderToggled) {
        let sliderStartDate = ''
        let sliderEndDate = ''
        const dateArray = new Date().toISOString().split('T')[0].split('-')

        if (parseInt(dateArray[2]) + sliderValue[0] - sliderLength <= 0) {
          // Setback
          if (parseInt(dateArray[1]) === 1) {
            // Setback month and year by 1
            sliderStartDate += parseInt(dateArray[0]) - 1 + '-'
            sliderStartDate += '12-'
            sliderStartDate +=
              31 -
              sliderLength +
              parseInt(dateArray[2]) +
              parseInt(sliderValue[0])
          } else {
            // Setback month by 1
            sliderStartDate += dateArray[0] + '-'
            sliderStartDate += parseInt(dateArray[1]) - 1 + '-'
            if (
              Math.round(parseInt(dateArray[0]) / 4) -
                parseInt(dateArray[0]) / 4 ===
                0 &&
              parseInt(dateArray[1]) === 3
            ) {
              // Check if leapyear
              sliderStartDate +=
                29 -
                sliderLength +
                parseInt(sliderValue[0]) +
                parseInt(dateArray[2])
            } else {
              sliderStartDate +=
                parseInt(
                  months[0][
                    Object.keys(months[0])[parseInt(dateArray[1]) - 2]
                  ][0].days,
                ) +
                parseInt(sliderValue[0]) +
                parseInt(dateArray[2]) -
                sliderLength
            }
          }
        } else {
          // No setbacks
          sliderStartDate += dateArray[0] + '-' + dateArray[1] + '-'
          sliderStartDate +=
            parseInt(dateArray[2]) + sliderValue[0] - sliderLength
        }
        array.push(sliderStartDate)

        if (parseInt(dateArray[2]) + sliderValue[1] - sliderLength <= 0) {
          // Setback
          if (parseInt(dateArray[1]) === 1) {
            // Setback month and year by 1
            sliderEndDate += parseInt(dateArray[0]) - 1 + '-'
            sliderEndDate += '12-'
            sliderEndDate +=
              31 -
              sliderLength +
              parseInt(dateArray[2]) +
              parseInt(sliderValue[1])
          } else {
            // Setback month by 1
            sliderEndDate += dateArray[0] + '-'
            sliderEndDate += parseInt(dateArray[1]) - 1 + '-'
            if (
              Math.round(parseInt(dateArray[0]) / 4) -
                parseInt(dateArray[0]) / 4 ===
                0 &&
              parseInt(dateArray[1]) === 3
            ) {
              // Check if leapyear
              sliderEndDate +=
                29 -
                sliderLength +
                parseInt(sliderValue[1]) +
                parseInt(dateArray[2])
            } else {
              sliderEndDate +=
                parseInt(
                  months[0][
                    Object.keys(months[0])[parseInt(dateArray[1]) - 2]
                  ][0].days,
                ) +
                parseInt(sliderValue[1]) +
                parseInt(dateArray[2]) -
                sliderLength
            }
          }
        } else {
          // No setbacks
          sliderEndDate += dateArray[0] + '-' + dateArray[1] + '-'
          sliderEndDate +=
            parseInt(dateArray[2]) + sliderValue[1] - sliderLength
        }
        array.push(sliderEndDate)
      } else {
        array.push(startDate.toISOString().split('T')[0])
        array.push(endDate.toISOString().split('T')[0])
      }
      fetchNews(array)
    } catch (e) {
      console.log(e)
    }
  }

  try {
    return (
      <React.Fragment>
        {badTicker ? (
          <div
            style={{
              width: '100vw',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 10,
            }}
          >
            <img
              alt="ticker not found"
              src={TickerDNE}
              style={{ width: '70vw' }}
            />
          </div>
        ) : (
          <div style={{ overflowX: 'hidden' }}>
            {loading ? (
              <h1>Loading...</h1>
            ) : (
              <React.Fragment>
                {window.innerWidth < 960 ? (
                  <React.Fragment>
                    <SwipeableDrawer
                      disableBackdropTransition={!iOS}
                      disableDiscovery={iOS}
                      anchor="bottom"
                      height="80%"
                      open={DrawerToggled}
                      hysteresis="0.2"
                    >
                      <span onClick={MenuClicked}>
                        <BsX size="2em" className="mobile-drawer-x" />
                      </span>
                      <TickerInfo data={data} dataQuotes={data.quote.USD} />
                    </SwipeableDrawer>
                    <div
                      className="mobile-drawer-toggle-div"
                      onClick={MenuClicked}
                    >
                      Click to Show More Stats
                    </div>
                  </React.Fragment>
                ) : (
                  <div className="ticker-info-div">
                    <TickerInfo data={data} dataQuotes={data.quote.USD} />
                  </div>
                )}
              </React.Fragment>
            )}
            <div
              className={
                window.innerWidth < 960
                  ? 'mobile-ticker-main-div'
                  : 'ticker-main-div'
              }
            >
              <div
                className="ticker-main"
                style={{
                  borderBottom: '1px solid #38414c',
                }}
              >
                <TickerTop
                  id={id}
                  data={data}
                  dataQuotes={data.quote.USD}
                  fetchPosts={fetchPosts}
                />
              </div>
              <div className="ticker-main">
                <TickerMain id={id} data={data} dataQuotes={data.quote.USD} />
              </div>
              <div className="ticker-main">
                <div
                  style={{
                    display: 'flex',
                    height: '30px',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: 15,
                  }}
                >
                  <h3>{data.name} Chart</h3>

                  <Tooltip title="Interactive Graphs Coming Soon">
                    <ButtonGroup
                      variant="contained"
                      color="primary"
                      aria-label="contained primary button group"
                      style={window.innerWidth < 960 ? { width: '60%' } : {}}
                      disabled
                    >
                      <Button>1D</Button>
                      <Button variant="text">7D</Button>
                      <Button>30D</Button>
                      <Button>60D</Button>
                      <Button>1Y</Button>
                      <Button>All</Button>
                    </ButtonGroup>
                  </Tooltip>
                </div>
                <div>
                  <img
                    alt="img"
                    className="crypto-graph"
                    id={
                      data.quote.USD.percent_change_7d < 0
                        ? 'redGraph'
                        : 'greenGraph'
                    }
                    src={
                      'https://s3.coinmarketcap.com/generated/sparklines/web/7d/usd/' +
                      data.id +
                      '.png'
                    }
                    style={{ width: '90%', margin: '5%' }}
                  />
                </div>
                <div>
                  {sliderToggled ? (
                    <Slider
                      style={{
                        width: '90%',
                        marginLeft: '5%',
                      }}
                      color="primary"
                      value={sliderValue}
                      onChange={handleChange}
                      valueLabelDisplay="off"
                      marks
                      min={0}
                      max={sliderLength}
                    />
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingLeft: '10vw',
                        paddingRight: '10vw',
                      }}
                    >
                      <span>
                        <h3 style={{ display: 'inline', marginRight: '5px' }}>
                          Start Date:
                        </h3>
                        <DatePicker
                          onChange={changeStartDate}
                          value={startDate}
                          maxDate={new Date()}
                          minDate={new Date(data.date_added)}
                        />
                      </span>
                      <span>
                        <h3 style={{ display: 'inline', marginRight: '5px' }}>
                          End Date:
                        </h3>
                        <DatePicker
                          onChange={changeEndDate}
                          value={endDate}
                          maxDate={new Date()}
                          minDate={startDate}
                        />
                      </span>
                    </div>
                  )}
                  <div
                    style={{
                      margin: 20,
                      marginLeft: '5%',
                      marginRight: '5%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      size="medium"
                      onClick={() => {
                        toggleSlider(!sliderToggled)
                      }}
                    >
                      {sliderToggled ? 'Use Date' : 'Use Slider'}
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="medium"
                      onClick={() => {
                        updateSearchParams()
                      }}
                    >
                      Search
                    </Button>
                  </div>
                </div>
              </div>
              <div
                className="ticker-main"
                id={window.innerWidth < 960 ? 'mobile-news-div' : 'news-div'}
              >
                <div
                  className={
                    window.innerWidth < 960
                      ? 'mobile-ticker-news-block'
                      : 'ticker-news-block'
                  }
                >
                  <div
                    style={{
                      display: 'block',
                      width: '100%',
                      height: '25px',
                      backgroundColor: 'white',
                      borderBottom: '5px solid rgba(52, 52, 255,0.27)',
                      marginTop: -20,
                    }}
                  >
                    <h3>News</h3>
                  </div>
                  <TickerNews news={news} months={months[0]} />
                </div>
                <div
                  className={
                    window.innerWidth < 960
                      ? 'mobile-ticker-news-block'
                      : 'ticker-news-block'
                  }
                >
                  <div
                    style={{
                      display: 'block',
                      width: '100%',
                      height: '25px',
                      backgroundColor: 'white',
                      borderBottom: '5px solid rgba(52, 52, 255,0.27)',
                      marginTop: -20,
                    }}
                  >
                    <h3>Social Media</h3>
                  </div>
                  <img
                    alt="Social Media Search Coming Soon"
                    src={NewsImg}
                    style={{ width: '100%', filter: 'invert(100%)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  } catch (e) {
    return <h3>loading</h3>
  }
}

export default Ticker
