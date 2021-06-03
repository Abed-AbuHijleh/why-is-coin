import React, { useState } from 'react'
import './ticker-info.css'

import InfoTable from './info-table.jsx'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'

import { BsX } from 'react-icons/bs'

const Component = (info) => {
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
  const [DrawerToggled, ToggleDrawer] = useState(false)
  function MenuClicked() {
    ToggleDrawer(!DrawerToggled)
  }
  return (
    <React.Fragment>
      {window.innerWidth < 960 ? (
        <React.Fragment>
          <SwipeableDrawer
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            anchor="bottom"
            height="80%"
            open={DrawerToggled}
            onOpen={() => {}}
            onClose={() => {}}
          >
            <span
              onClick={MenuClicked}
              style={{
                backgroundColor: 'RGB(39,41,59)',
                color: 'white',
                borderBottom: 'solid 1px RGB(241,241,241)',
              }}
            >
              <BsX size="2em" className="mobile-drawer-x" />
            </span>
            <div
              style={{ overflowY: 'scroll', backgroundColor: 'RGB(39,41,59)' }}
            >
              <InfoTable data={info.data} />
            </div>
          </SwipeableDrawer>
          <div className="mobile-drawer-toggle-div" onClick={MenuClicked}>
            Click to Show More Stats
          </div>
        </React.Fragment>
      ) : (
        <div className="ticker-info-div">
          <InfoTable data={info.data} />
        </div>
      )}
    </React.Fragment>
  )
}

export default Component
