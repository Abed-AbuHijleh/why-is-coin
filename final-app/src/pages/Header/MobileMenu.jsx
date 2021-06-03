import React, { useState } from 'react'
import './MobileMenu.css'
import Drawer from '@material-ui/core/Drawer'
import TextField from '@material-ui/core/TextField'

// Icons
import { BsList } from 'react-icons/bs'
import { BsArrowBarRight } from 'react-icons/bs'
import { BsSearch } from 'react-icons/bs'

const MobileMenu = () => {
  const [DrawerToggled, ToggleDrawer] = useState(false)
  function MenuClicked() {
    ToggleDrawer(!DrawerToggled)
  }

  function TickerSearch() {
    document.location.href =
      '/ticker/' + document.querySelector('#standard-basic').value
  }

  return (
    <React.StrictMode>
      <span onClick={MenuClicked}>
        <BsList size="3em" className="header-mobile-menu" />
      </span>
      <Drawer anchor="right" open={DrawerToggled}>
        <div className="mobile-side-bar">
          <span onClick={MenuClicked}>
            <BsArrowBarRight size="3em" className="header-mobile-menu-exit" />
          </span>

          <div className="mobile-menu-item">
            <TextField
              type="filled"
              id="standard-basic"
              label="Search Ticker"
              size="medium"
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  if (document.querySelector('#standard-basic').value !== '') {
                    TickerSearch()
                  } else {
                  }
                }
              }}
            />
            <BsSearch size="2rem" />
          </div>
          <a href="/Home">
            <div
              className="mobile-menu-item"
              id={window.location.pathname === '/Home' ? 'on-menu-item' : null}
            >
              Home
            </div>
          </a>
          <a href="/About">
            <div
              className="mobile-menu-item"
              id={window.location.pathname === '/About' ? 'on-menu-item' : null}
            >
              About
            </div>
          </a>
          <a href="/Plans">
            <div
              className="mobile-menu-item"
              id={window.location.pathname === '/Plans' ? 'on-menu-item' : null}
            >
              Plans
            </div>
          </a>
          <a href="/Signup">
            <div className="mobile-menu-item" id="mobile-menu-signup">
              Create an Account
            </div>
          </a>
          <a href="/Login">
            <div className="mobile-menu-item" id="mobile-menu-login">
              Login
            </div>
          </a>
        </div>
      </Drawer>
    </React.StrictMode>
  )
}

export default MobileMenu
