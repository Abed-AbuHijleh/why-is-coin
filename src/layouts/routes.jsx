import React, { useState, useEffect } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

// pages
import Home from "./home.jsx";
import Ticker from "./ticker.jsx";
import PageNotFound from "./page-not-found.jsx";

import TopNav from "../components/top-nav/top-nav.jsx";
import Footer from "../components/footer/footer.jsx";

const hist = createBrowserHistory();

const App = () => {
  const [mobileOpen, setMobileOpen] = useState(
    window.innerWidth < 960 ? true : false
  );
  const [darkmode, setTheme] = useState(false);

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
  let colors = [
    "#f3f3f3",
    "#192529",
    "#021217",
    "RGB(248, 248, 255)",
    "#29099c",
    "#0090ff"
  ];
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
          <Route path="/ticker/:id">
            <Ticker colors={colors} />
          </Route>
          <Route component={PageNotFound} />
        </Switch>
      </Router>
      <Footer darkmode={darkmode} setTheme={setTheme} />
    </React.Fragment>
  );
};

export default App;
