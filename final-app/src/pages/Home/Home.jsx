import React, { useState, useEffect } from 'react'
// eslint-disable-next-line
import { BrowserRouter as Router, Link, useLocation } from 'react-router-dom'
import Footer from './Footer.jsx'
import './Home.css'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Slider from '@material-ui/core/Slider'
import TableSortLabel from '@material-ui/core/TableSortLabel'

function circSuppCalc(post) {
  if (post.max_supply > 0) {
    return (
      <React.StrictMode>
        <span className="inline-table-extra">
          {Math.round((post.circulating_supply / post.max_supply) * 100) + '%'}
        </span>
        <Slider
          disabled
          style={{ width: 110, display: 'block', marginLeft: '5vw' }}
          defaultValue={Math.round(
            (post.circulating_supply / post.max_supply) * 100,
          )}
          aria-labelledby="disabled-slider"
        />
      </React.StrictMode>
    )
  } else {
    return null
  }
}

const useStyles = makeStyles({
  root: {
    width: '98%',
    marginTop: '2%',
    marginLeft: '1%',
  },
  container: {
    maxHeight: window.innerWidth < 960 ? '10000px' : '80vh',
  },
})

const Home = () => {
  const classes = useStyles()

  const query = new URLSearchParams(useLocation().search)
  const page = parseInt(query.get('page') || '1', 10)

  const [rowsPerPage, updateRowsPerPage] = useState(50)
  const [posts, setPosts] = useState([])
  const [totalPosts, setTotalPosts] = useState(0)
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState('desc')
  const [orderBy, setOrderBy] = useState('market_cap')

  const createSortHandler = (property) => (event) => {
    if (property !== 'graph') {
      const isAsc = orderBy === property && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(property)
      fetchPosts(
        (page - 1) * rowsPerPage + 1,
        page * rowsPerPage,
        isAsc ? 'desc' : 'asc',
        property,
      )
    }
  }

  function apiSuccess() {
    try {
      setLoading(false)
      setPosts(JSON.parse(this.responseText).data)
      setTotalPosts(parseInt(JSON.parse(this.responseText).status.total_count))
    } catch (e) {
      console.log(this)
    }
  }

  const fetchPosts = async (start, end, sort_dir, sort) => {
    setLoading(true)
    let res = await new XMLHttpRequest()
    res.onload = apiSuccess
    res.onerror = console.log()
    res.open(
      'GET',
      'http://192.168.68.59:8000/data/latest?start=' +
        start +
        '&end=' +
        end +
        '&sort=' +
        sort +
        '&sort_dir=' +
        sort_dir,
    )
    res.send()
  }

  useEffect(() => {
    fetchPosts((page - 1) * rowsPerPage + 1, page * rowsPerPage, order, orderBy)
    // eslint-disable-next-line
  }, [])

  function numberWithCommas(x) {
    const parts = x.toString().split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.join('.')
  }

  function returnSigFigs(value, sigFigs) {
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

  function createData(post) {
    if (loading) {
      const market_cap = <h3> </h3>
      const name = <h3> Loading...</h3>
      const price = <h3> </h3>
      const percent_change_1h = <h3> </h3>
      const percent_change_24h = <h3> </h3>
      const percent_change_7d = <h3> </h3>
      const circulating_supply = <h3> </h3>
      const graph = <h3> </h3>
      return {
        market_cap,
        name,
        price,
        percent_change_1h,
        percent_change_24h,
        percent_change_7d,
        circulating_supply,
        graph,
      }
    } else {
      try {
        const market_cap = post.cmc_rank
        const name = (
          <React.StrictMode>
            <span>
              <img
                alt="img"
                className="crypto-icon"
                src={
                  'https://s2.coinmarketcap.com/static/img/coins/32x32/' +
                  post.id +
                  '.png'
                }
              />
            </span>
            <span>
              <h4 className="table-name">
                <a
                  className="table-select-ticker"
                  href={'/ticker/' + post.symbol}
                >
                  {post.name}
                </a>
              </h4>
            </span>
            <span className="inline-table-extra">{post.symbol}</span>
          </React.StrictMode>
        )

        const price = (
          <h4>
            {'$' + numberWithCommas(returnSigFigs(post.quote.USD.price, 4))}
          </h4>
        )

        const percent_change_1h = (
          <h4 id={post.quote.USD.percent_change_1h < 0 ? 'red' : 'green'}>
            {returnSigFigs(post.quote.USD.percent_change_1h, 2) + '%'}
          </h4>
        )

        const percent_change_24h = (
          <h4 id={post.quote.USD.percent_change_24h < 0 ? 'red' : 'green'}>
            {returnSigFigs(post.quote.USD.percent_change_24h, 2) + '%'}
          </h4>
        )

        const percent_change_7d = (
          <h4 id={post.quote.USD.percent_change_7d < 0 ? 'red' : 'green'}>
            {returnSigFigs(post.quote.USD.percent_change_7d, 2) + '%'}
          </h4>
        )

        const circulating_supply = (
          <div className="circ-supp-div">
            {post.circulating_supply === 0 ? (
              <h4>---</h4>
            ) : (
              <h4>
                {numberWithCommas(returnSigFigs(post.circulating_supply, 4))}{' '}
                {circSuppCalc(post)}
              </h4>
            )}
          </div>
        )

        const graph = (
          <img
            alt="img"
            className="crypto-graph"
            id={
              post.quote.USD.percent_change_7d < 0 ? 'redGraph' : 'greenGraph'
            }
            src={
              'https://s3.coinmarketcap.com/generated/sparklines/web/7d/usd/' +
              post.id +
              '.png'
            }
          />
        )
        return {
          market_cap,
          name,
          price,
          percent_change_1h,
          percent_change_24h,
          percent_change_7d,
          circulating_supply,
          graph,
        }
      } catch (e) {
        console.log('error ' + e)
        const market_cap = <h3> </h3>
        const name = <h3>Error: Try Again</h3>
        const price = <h3> </h3>
        const percent_change_1h = <h3> </h3>
        const percent_change_24h = <h3> </h3>
        const percent_change_7d = <h3> </h3>
        const circulating_supply = <h3> </h3>
        const graph = <h3> </h3>
        return {
          market_cap,
          name,
          price,
          percent_change_1h,
          percent_change_24h,
          percent_change_7d,
          circulating_supply,
          graph,
        }
      }
    }
  }

  const columns = [
    { id: 'market_cap', label: '#', maxWidth: 20 },
    { id: 'name', label: 'Name' },
    {
      id: 'price',
      label: 'Price',
      align: 'right',
    },
    {
      id: 'percent_change_1h',
      label: '1h%',
      align: 'right',
    },
    {
      id: 'percent_change_24h',
      label: '24h%',
      align: 'right',
    },
    {
      id: 'percent_change_7d',
      label: '7d%',
      align: 'right',
    },
    {
      id: 'circulating_supply',
      label: 'Circulating Supply',
      align: 'right',
      minWidth: 170,
    },
    {
      id: 'graph',
      label: '7 Day Graph',
      minWidth: 170,
      align: 'right',
    },
  ]

  const rows = [posts.map((post) => createData(post))][0]

  return (
    <div className="home-outer-div">
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={createSortHandler(column.id)}
                    >
                      {column.label}
                      {orderBy === column.id ? (
                        <span className={classes.visuallyHidden}></span>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Footer
        rowsPerPage={rowsPerPage}
        updateRowsPerPage={updateRowsPerPage}
        totalPosts={totalPosts}
        page={page}
        fetchPosts={fetchPosts}
        sort_dir={order}
        sort={orderBy}
      />
    </div>
  )
}

export default Home
