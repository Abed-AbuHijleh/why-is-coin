import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import TopSearch from '../components/top-search/top-search.jsx'
import HomePreview from '../components/home-preview/home-preview.jsx'

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)

  const query = new URLSearchParams(useLocation().search)
  const page = parseInt(query.get('page') || '1', 10)
  const rowsPerPage = 100

  const fetchHomeData = async (start, end) => {
    let res = await new XMLHttpRequest()
    res.onload = apiSucc
    res.onerror = console.log()
    res.open(
      'GET',
      'https://why-is-coin-api.herokuapp.com/data/latest?start=' + start + '&end=' + end,
    )
    res.send()
  }

  function apiSucc() {
    try {
      setTotal(JSON.parse(this.responseText)[0].total)
      setData(JSON.parse(this.responseText))
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchHomeData((page - 1) * rowsPerPage + 1, page * rowsPerPage)
    // eslint-disable-next-line
  }, [])

  return (
    <React.Fragment>
      <TopSearch data={data} loading={loading} home={true} />
      <HomePreview
        data={data}
        loading={loading}
        total={total}
        rowsPerPage={rowsPerPage}
        page={page}
        fetchHomeData={fetchHomeData}
      />
    </React.Fragment>
  )
}

export default Home
