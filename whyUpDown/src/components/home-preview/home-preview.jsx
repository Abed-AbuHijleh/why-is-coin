import React from 'react'
import './home-preview.css'

import { Link } from 'react-router-dom'

import Table from './home-table.jsx'
import Pagination from '@material-ui/lab/Pagination'
import PaginationItem from '@material-ui/lab/PaginationItem'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(3),
      justifyContent: 'center',
      alignItems: 'center',
      width: 'min(800px,80vw)',
    },
    '& .Mui-selected': {
      backgroundColor: 'RGB(153, 153, 153)',
      color: 'black',
      fontWeight: 'bold',
    },
  },
  item: {
    color: 'white',
    '&.MuiPaginationItem-sizeSmall': {
      padding: 0,
      margin: 0,
    },
  },
}))

const Component = (info) => {
  const classes = useStyles()
  const changePage = (newPage) => {
    info.fetchHomeData(
      (newPage - 1) * info.rowsPerPage + 1,
      newPage * info.rowsPerPage,
    )
  }

  return (
    <div className="home-preview">
      <div
        style={{
          margin: '5vw',
          borderRadius: '30px',
          width: 'min(800px,90vw)',
          minHeight: '200px',
          backgroundColor: 'RGB(39,41,59)',
          padding: '15px',
          boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.3)',
          overflowY: 'hidden',
        }}
      >
        {info.loading ? <h5>Loading...</h5> : <Table data={info.data} />}
        <Pagination
          className={classes.root}
          shape="rounded"
          siblingCount={window.innerWidth < 960 ? 2 : 3}
          page={info.page}
          count={Math.ceil(info.total / info.rowsPerPage)}
          size={window.innerWidth < 960 ? 'small' : 'medium'}
          renderItem={(item) => (
            <PaginationItem
              className={classes.item}
              component={Link}
              to={`${item.page === 1 ? '' : `?page=${item.page}`}`}
              {...item}
              onClick={() => {
                changePage(item.page)
              }}
            />
          )}
        />
      </div>
    </div>
  )
}

export default Component
