import React from 'react'
// eslint-disable-next-line
import { BrowserRouter as Router, Link, useLocation } from 'react-router-dom'

import Pagination from '@material-ui/lab/Pagination'
import PaginationItem from '@material-ui/lab/PaginationItem'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import './Footer.css'

import { createBrowserHistory } from 'history'

createBrowserHistory({
  forceRefresh: true,
})

const Footer = ({
  rowsPerPage,
  updateRowsPerPage,
  totalPosts,
  page,
  fetchPosts,
  sort_dir,
  sort,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const changePage = (newPage) => {
    fetchPosts(
      (newPage - 1) * rowsPerPage + 1,
      newPage * rowsPerPage,
      sort_dir,
      sort,
    )
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleCloseT = () => {
    if (rowsPerPage === 20) {
    } else {
      fetchPosts((page - 1) * 20 + 1, page * 20, sort_dir, sort)
      updateRowsPerPage(20)
    }
    setAnchorEl(null)
  }

  const handleCloseF = () => {
    if (rowsPerPage === 50) {
    } else {
      fetchPosts((page - 1) * 50 + 1, page * 50, sort_dir, sort)
      updateRowsPerPage(50)
    }
    setAnchorEl(null)
  }

  const handleCloseH = () => {
    if (rowsPerPage === 100) {
    } else {
      fetchPosts((page - 1) * 100 + 1, page * 100, sort_dir, sort)
      updateRowsPerPage(100)
    }
    setAnchorEl(null)
  }

  return (
    <div
      className={
        window.innerWidth < 960
          ? 'home-footer-div-mobile'
          : 'home-footer-div-full'
      }
    >
      <h4 className="home-footer-text">
        Showing Results{' '}
        {(page - 1) * rowsPerPage + 1 > totalPosts
          ? totalPosts
          : (page - 1) * rowsPerPage + 1}{' '}
        - {rowsPerPage * page > totalPosts ? totalPosts : rowsPerPage * page}{' '}
        out of {totalPosts}
      </h4>
      <Pagination
        color="primary"
        shape="rounded"
        variant="outlined"
        siblingCount={2}
        page={page}
        count={Math.ceil(totalPosts / rowsPerPage)}
        size={window.innerWidth < 960 ? 'small' : 'medium'}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/home${item.page === 1 ? '' : `?page=${item.page}`}`}
            {...item}
            onClick={() => {
              changePage(item.page)
            }}
          />
        )}
      />
      <div>
        Rows per Page:
        <Button
          color="primary"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <h3>{rowsPerPage}</h3>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleCloseT}>20</MenuItem>
          <MenuItem onClick={handleCloseF}>50</MenuItem>
          <MenuItem onClick={handleCloseH}>100</MenuItem>
        </Menu>
      </div>
    </div>
  )
}

export default Footer
