import React from "react";
import "./footer.css";

import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles({
  root: {
    "& > *": {},
    "& .Mui-checked": {
      color: "black"
    }
  }
});

const Component = info => {
  const classes = useStyles();
  return (
    <div className="footer-outer-div">
      <div
        className="footer-div"
        style={
          window.innerWidth < 960
            ? { flexDirection: "column" }
            : { flexDirection: "row" }
        }
      >
        <ul>
          <li>
            <h2>Support the Site</h2>
          </li>
          <li>
            <a id="copy" href="#copy">
              <h4
                onClick={() => {
                  try {
                    navigator.clipboard.writeText(
                      "13AcjHWeFJA6VucLXpsFfTLpYtDkksRhaY"
                    );
                  } catch (e) {}
                }}
              >
                Bitcoin Wallet
              </h4>
            </a>
          </li>
          <li>
            <a id="copy" href="#copy">
              <h4
                onClick={() => {
                  try {
                    navigator.clipboard.writeText(
                      "0x7f92601df8649afe42eed70c887e52c82f9c179a"
                    );
                  } catch (e) {}
                }}
              >
                Ethereum Wallet
              </h4>
            </a>
          </li>
          <li>
            <a id="copy" href="#copy">
              <h4
                onClick={() => {
                  try {
                    navigator.clipboard.writeText(
                      "bnb136ns6lfw4zs5hg4n85vdthaad7hq5m4gtkgf23"
                    );
                  } catch (e) {}
                }}
              >
                Binance Coin Wallet
              </h4>
            </a>
          </li>
        </ul>
        {window.innerWidth < 1450 ? (
          <ul>
            <li>
              <h2>Contact</h2>
            </li>
            <li>
              <a id="copy" href="mailto:whyiscoin@gmail.com">
                <h4>whyiscoin@gmail.com</h4>
              </a>
            </li>
            <li>
              <h2>Theme</h2>
              <FormControlLabel
                control={
                  <Switch
                    className={classes.root}
                    color="default"
                    checked={info.darkmode}
                    onChange={info.changeTheme}
                    name="darkmode"
                  />
                }
                label={info.darkmode ? "Darkmode" : "Lightmode"}
              />
            </li>
          </ul>
        ) : (
          <React.Fragment>
            <ul>
              <li>
                <h2>Contact</h2>
              </li>
              <li>
                <a id="copy" href="mailto:whyiscoin@gmail.com">
                  <h4>whyiscoin@gmail.com</h4>
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <h2>Theme</h2>
                <FormControlLabel
                  control={
                    <Switch
                      className={classes.root}
                      color="default"
                      checked={info.darkmode}
                      onChange={info.changeTheme}
                      name="darkmode"
                    />
                  }
                  label={info.darkmode ? "Darkmode" : "Lightmode"}
                />
              </li>
            </ul>
          </React.Fragment>
        )}
        <h2 style={{ maxWidth: "70vw", textAlign: "center" }}>
          Reimagine the future of researching investments.
        </h2>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginRight: "10vw"
        }}
      >
        <h4>© 2021 by Why is Coin?.</h4>
        <h4>
          <a
            style={{
              color: "RGB(220,220,255)",
              textDecoration: "underline",
              textDecorationColor: "RGB(147, 0, 255)"
            }}
            href="/privacy-policy"
          >
            Privacy Policy
          </a>
        </h4>
      </div>
    </div>
  );
};

export default Component;
