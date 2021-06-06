import React, { useState } from "react";
import "./ticker-info.css";

import InfoTable from "./info-table.jsx";

import Drawer from "@material-ui/core/Drawer";

import { BsX } from "react-icons/bs";

const Component = info => {
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [DrawerToggled, ToggleDrawer] = useState(false);
  function MenuClicked() {
    ToggleDrawer(!DrawerToggled);
  }
  return (
    <React.Fragment>
      {window.innerWidth < 960 ? (
        <React.Fragment>
          <Drawer
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
                backgroundColor: info.colors[3],
                color: info.colors[2],
                borderBottom: "solid 1px " + info.colors[3]
              }}
            >
              <BsX size="2em" className="mobile-drawer-x" />
            </span>
            <div
              style={{ overflowY: "scroll", backgroundColor: info.colors[3] }}
            >
              <InfoTable data={info.data} colors={info.colors} />
            </div>
          </Drawer>
          <div
            className="mobile-drawer-toggle-div"
            style={{
              backgroundColor: info.colors[3],
              color: info.colors[2],
              borderTop: "1px solid " + info.colors[1],
              height: "30px"
            }}
            onClick={MenuClicked}
          >
            <h4>Click to Show More Stats</h4>
          </div>
        </React.Fragment>
      ) : (
        <div
          className="ticker-info-div"
          style={{
            boxShadow: "5px 5px 15px 5px rgba(0,0,0,0.35)",
            backgroundColor: info.colors[3]
          }}
        >
          <InfoTable data={info.data} colors={info.colors} />
        </div>
      )}
    </React.Fragment>
  );
};

export default Component;
