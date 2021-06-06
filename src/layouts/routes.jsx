import React, { useState, useEffect } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ReactGA from "react-ga";
import Cookies from "universal-cookie";

// pages
import Home from "./home.jsx";
import Ticker from "./ticker.jsx";
import Privacy from "./privacy.jsx";
import PageNotFound from "./page-not-found.jsx";

import TopNav from "../components/top-nav/top-nav.jsx";
import Footer from "../components/footer/footer.jsx";

const hist = createBrowserHistory();

// // Analytics
// const trackingId = "G-0FC6ES0VBH";
// ReactGA.initialize(trackingId);

// hist.listen(location => {
//   ReactGA.set({ page: location.pathname });
//   ReactGA.pageview(location.pathname);
// });

const App = () => {
  const cookies = new Cookies();
  const [mobileOpen, setMobileOpen] = useState(
    window.innerWidth < 960 ? true : false
  );
  const [darkmode, setTheme] = useState(
    cookies.get("darkmode") === "true" ? true : false
  );
  const [openCookie, setOpenCookie] = useState(
    cookies.get("accepted") === "true" ? false : true
  );

  const handleClose = () => {
    cookies.set("accepted", "true", { path: "/" });
    cookies.set("darkmode", false, { path: "/" });
    setOpenCookie(false);
  };

  const changeTheme = () => {
    cookies.set("darkmode", !darkmode, { path: "/" });
    setTheme(!darkmode);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    } else {
      setMobileOpen(true);
    }
  };

  // 0 background
  // 1 opposite accent
  // 2 text
  // 3 contrasting background
  // 4 accent 1
  // 5 accent 2
  let colors;
  if (darkmode) {
    colors = [
      "RGB(34, 34, 34)",
      "RGB(153, 153, 153)",
      "#f2f3f7",
      "RGB(24, 24, 34)",
      "#7779e6",
      "#0090ff"
    ];
  } else {
    colors = [
      "#f3f3f3",
      "#192529",
      "#021217",
      "RGB(248, 248, 255)",
      "#29099c",
      "#0090ff"
    ];
  }

  document.body.style.backgroundColor = colors[0];

  useEffect(() => {
    window.addEventListener("resize", resizeFunction);
    return function cleanup() {
      window.removeEventListener("resize", resizeFunction);
    };
  }, []);

  return (
    <React.Fragment>
      <TopNav mobileOpen={mobileOpen} colors={colors} />
      <Router history={hist}>
        <Switch>
          <Route exact path="/">
            <Home colors={colors} />
          </Route>
          <Route exact path="/ticker/:id">
            <Ticker colors={colors} />
          </Route>
          <Route exact path="/privacy-policy">
            <Privacy colors={colors} />
          </Route>
          <Route component={PageNotFound} />
        </Switch>
      </Router>
      <Footer darkmode={darkmode} changeTheme={changeTheme} />

      <Dialog
        open={openCookie}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Allow the use of cookies?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let "Why Is Coin?" use cookies to enhance your user experience? By
            continuing to the site, you accept the use of cookies.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default App;
