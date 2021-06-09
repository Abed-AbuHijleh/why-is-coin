import React, { useState } from "react";
import "./top-nav.css";

import LogoDark from "../../resources/images/logo-dark.png";
import LogoLight from "../../resources/images/logo-light.png";

import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { BsArrowBarRight, BsClipboard } from "react-icons/bs";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "RGB(83, 184, 143)",
    borderColor: "#0063cc"
  }
}));

const Component = info => {
  const [DrawerToggled, ToggleDrawer] = useState(false);

  const classes = useStyles();

  function MenuClicked() {
    ToggleDrawer(!DrawerToggled);
  }

  return (
    <React.Fragment>
      <div
        style={
          info.mobileOpen
            ? {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                backgroundColor: info.colors[0]
              }
            : {
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                backgroundColor: info.colors[0]
              }
        }
        className="top-nav"
      >
        <a href="/">
          <img
            alt="Why is Coin"
            src={info.darkmode ? LogoDark : LogoLight}
            style={{
              width: "80px",
              marginTop: "0px",
              marginRight: "20px"
            }}
          />
        </a>
        <span onClick={MenuClicked} style={{ color: "white" }}>
          <h3 style={{ color: info.colors[5] }}>About</h3>
        </span>
      </div>
      <Drawer anchor="right" open={DrawerToggled}>
        <div
          style={{
            width: "Min(400px,80vw)",
            height: "100%",
            backgroundColor: info.colors[3],
            overflow: "hidden",
            paddingTop: "5px"
          }}
        >
          <span onClick={MenuClicked}>
            <BsArrowBarRight
              size="3em"
              className="header-mobile-menu-exit"
              color={info.colors[2]}
            />
          </span>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              color: info.colors[2],
              margin: "25px",
              marginTop: "-60px"
            }}
            className="about-div"
          >
            <h2
              style={{
                textDecoration: "underline",
                textDecorationColor: info.colors[5]
              }}
            >
              About The Site
            </h2>
            <h4
              style={{
                marginBottom: "10%",
                textAlign: "center",
                fontWeight: "500"
              }}
            >
              "Why is Coin?" is a real time sentiment analysis site that helps
              users find relevent news. This tool, created by a 17 year-old
              Canadian, can be used for finding information on{" "}
              <span style={{ textDecoration: "underline" }}>your</span>{" "}
              investments.
            </h4>
            <Button
              variant="contained"
              href="mailto:whyiscoin@gmail.com"
              className={classes.root}
              style={{ marginBottom: "15%" }}
            >
              Contact
            </Button>
            <h2
              style={{
                textDecoration: "underline",
                textDecorationColor: info.colors[5]
              }}
            >
              Support The Site
            </h2>
            <h4>
              Bitcoin Address
              <span
                onClick={() => {
                  try {
                    navigator.clipboard.writeText(
                      "13AcjHWeFJA6VucLXpsFfTLpYtDkksRhaY"
                    );
                  } catch (e) {}
                }}
              >
                <IconButton color="secondary" aria-label="Copy">
                  <BsClipboard />
                </IconButton>
              </span>
            </h4>
            <h6 style={{ fontWeight: "600" }}>
              13AcjHWeFJA6VucLXpsFfTLpYtDkksRhaY
            </h6>
            <h4>
              Ethereum Address
              <span
                onClick={() => {
                  try {
                    navigator.clipboard.writeText(
                      "0x7f92601df8649afe42eed70c887e52c82f9c179a"
                    );
                  } catch (e) {}
                }}
              >
                <IconButton color="secondary" aria-label="Copy">
                  <BsClipboard />
                </IconButton>
              </span>
            </h4>
            <h6 style={{ fontWeight: "600" }}>
              0x7f92601df8649afe42eed70c887e52c82f9c179a
            </h6>
            <h4>
              Binance Coin Address
              <span
                onClick={() => {
                  try {
                    navigator.clipboard.writeText(
                      "bnb136ns6lfw4zs5hg4n85vdthaad7hq5m4gtkgf23"
                    );
                  } catch (e) {}
                }}
              >
                <IconButton color="secondary" aria-label="Copy">
                  <BsClipboard />
                </IconButton>
              </span>
            </h4>
            <h6 style={{ fontWeight: "600" }}>
              bnb136ns6lfw4zs5hg4n85vdthaad7hq5m4gtkgf23
            </h6>
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default Component;
