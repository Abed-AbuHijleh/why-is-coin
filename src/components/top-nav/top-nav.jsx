import React, { useState, useEffect } from "react";
import "./top-nav.css";

import Logo from "../../resources/images/logo.png";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { BsArrowBarRight, BsClipboard } from "react-icons/bs";

import TextTransition, { presets } from "react-text-transition";

import Coins from "./coins.json";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(3)
    },
    multilineColor: {
      color: "red"
    },
    "& .MuiTextField-root": {
      color: "white"
    },
    // Labels
    "& label": {
      color: "RGB(241, 241, 241)"
    },
    "& label.Mui-focused": {
      color: "RGB(241, 241, 241)"
    },
    // Outline
    "& .MuiInput-underline:after": {
      borderBottomColor: "RGB(78, 134, 169)"
    },
    // Label Focused
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "RGB(241, 241, 241)"
      },
      // Hover Outline
      "&:hover fieldset": {
        borderColor: "RGB(153, 153, 153)"
      },
      // Focused Label
      "&.Mui-focused fieldset": {
        borderColor: "RGB(78, 134, 169)"
      },
      // Responsive Width
      width: "min(max(200px, 80vw), 600px)"
    }
  },
  button: {
    backgroundColor: "RGB(83, 184, 143)",
    borderColor: "#0063cc"
  }
}));

const Component = mobileOpen => {
  const [DrawerToggled, ToggleDrawer] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (info.home) {
      const intervalId = setInterval(
        () => setIndex(index => index + 1),
        3000 // every 3 seconds
      );
      return () => clearTimeout(intervalId);
    }
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();

  function MenuClicked() {
    ToggleDrawer(!DrawerToggled);
  }

  return (
    <React.Fragment>
      <div
        style={
          mobileOpen.mobileOpen
            ? {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                borderBottom: "2px solid RGB(153, 153, 153)"
              }
            : {
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center"
              }
        }
        className="top-nav"
      >
        <a href="/">
          <img
            alt="Why is Coin"
            src={Logo}
            style={{
              height: "34px",
              width: "90px",
              marginTop: "0px",
              marginRight: "20px"
            }}
          />
        </a>
        <span onClick={MenuClicked} style={{ color: "white" }}>
          <h3 style={{ color: "RGB(90, 134, 166)" }}>About</h3>
        </span>
      </div>
      <Drawer anchor="right" open={DrawerToggled}>
        <div
          style={{
            width: "Min(400px,80vw)",
            height: "100%",
            backgroundColor: "RGB(24, 24, 34)",
            overflow: "hidden",
            paddingTop: "5px"
          }}
        >
          <span onClick={MenuClicked}>
            <BsArrowBarRight
              size="3em"
              className="header-mobile-menu-exit"
              color="white"
            />
          </span>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              color: "white",
              margin: "25px",
              marginTop: "-60px"
            }}
            className="about-div"
          >
            <h2
              style={{
                textDecoration: "underline",
                textDecorationColor: "blue"
              }}
            >
              About The Site
            </h2>
            <h4 style={{ marginBottom: "10%", textAlign: "center" }}>
              "Why is Coin?" was made by a 17 year-old from Canada. This was a
              project done throughout his extra time, having finished highschool
              early and preparing for University. This project is entirely paid
              for out of pocket, so any support helps, feel free to contact me
              too :)
            </h4>
            <Button
              variant="contained"
              href="mailto:whyiscoin@gmail.com"
              className={classes.button}
              style={{ marginBottom: "15%" }}
            >
              Contact
            </Button>
            <h2
              style={{
                textDecoration: "underline",
                textDecorationColor: "blue"
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
            <h6>13AcjHWeFJA6VucLXpsFfTLpYtDkksRhaY</h6>
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
            <h6>0x7f92601df8649afe42eed70c887e52c82f9c179a</h6>
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
            <h6>bnb136ns6lfw4zs5hg4n85vdthaad7hq5m4gtkgf23</h6>
          </div>
        </div>
      </Drawer>
      <div
        className="top-search"
        style={
          window.innerWidth < 960
            ? { borderBottom: "none" }
            : { borderBottom: "2px solid white" }
        }
      >
        {info.loading ? (
          <h4>Why is Crypto Changing?</h4>
        ) : (
          <React.Fragment>
            {info.home ? (
              <h4>
                Why is{" "}
                <span className="top-search-name">
                  <TextTransition
                    text={
                      info.data[1].data[index % info.data[1].data.length].name +
                      "'s"
                    }
                    springConfig={presets.stiff}
                    inline={true}
                  />
                </span>{" "}
                price going{" "}
                <span
                  className={
                    info.data[1].data[index % info.data[1].data.length].pc_day <
                    0
                      ? "top-search-down"
                      : "top-search-up"
                  }
                >
                  <TextTransition
                    text={
                      info.data[1].data[index % info.data[1].data.length]
                        .pc_day < 0
                        ? "down"
                        : "up"
                    }
                    springConfig={presets.stiff}
                    inline={true}
                  />
                </span>
                ?
              </h4>
            ) : (
              <h4>
                Why is{" "}
                <span className="top-search-name">{info.data.name}'s</span>{" "}
                price going{" "}
                <span
                  className={
                    info.data.pc_day < 0 ? "top-search-down" : "top-search-up"
                  }
                >
                  {info.data.pc_day < 0 ? "down" : "up"}
                </span>
                ?
              </h4>
            )}
          </React.Fragment>
        )}
        <Autocomplete
          id="combo-box-demo"
          options={Coins}
          Autocomplete
          onChange={(event, value) => {
            console.log(value);
            window.location.href = "/ticker/" + value.symbol;
          }}
          getOptionLabel={option => {
            return option.symbol + " " + option.name;
          }}
          renderInput={params => (
            <TextField
              {...params}
              className={classes.root}
              variant="outlined"
              type="search"
              id="standard-basic"
              label="Search Ticker"
              size="small"
              onKeyPress={event => {
                if (event.key === "Enter") {
                  if (document.querySelector("#combo-box-demo").value !== "") {
                    window.location.href =
                      "/ticker/" +
                      document.querySelector("#combo-box-demo").value;
                  } else {
                  }
                }
              }}
            />
          )}
        />
      </div>
    </React.Fragment>
  );
};

export default Component;
