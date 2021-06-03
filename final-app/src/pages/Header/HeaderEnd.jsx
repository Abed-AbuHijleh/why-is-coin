import React from 'react'
import './HeaderEnd.css'

// Components
import TextField from '@material-ui/core/TextField'

// Icons
import { BsFillPersonFill } from 'react-icons/bs'
import { BsBriefcaseFill } from 'react-icons/bs'

const HeaderEnd = () => {
  function TickerSearch() {
    document.location.href =
      '/ticker/' + document.querySelector('#standard-basic').value
  }

  return (
    <div className="header-right-side">
      <div>
        <a id="header-a-links" href="/About">
          <BsFillPersonFill size="1rem" style={{ marginRight: '5px' }} />
          About
        </a>
        <a id="header-a-links" href="/Plans">
          <BsBriefcaseFill size="1rem" style={{ marginRight: '5px' }} />
          Plans
        </a>
      </div>
      <div className="header-far-right">
        <div>
          <a id="header-a-links" href="/Login">
            Login
          </a>
        </div>
        <div>
          <a href="/Signup" className="header-signup">
            Signup
          </a>
        </div>
        <div>
          <TextField
            variant="outlined"
            type="search"
            id="standard-basic"
            label="Search Ticker"
            size="small"
            color="primary"
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                if (document.querySelector('#standard-basic').value !== '') {
                  TickerSearch()
                } else {
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default HeaderEnd
