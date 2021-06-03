import React from 'react'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import './App.css'

// pages
import Header from './Header/Header.jsx'
import Home from './Home/Home.jsx'
import Ticker from './Ticker/Ticker.jsx'
import About from './About/About.jsx'
import Plans from './Plans/Plans.jsx'
import Login from './Login/Login.jsx'
import Signup from './Signup/Signup.jsx'
import PageNotFound from './FileNotFound/FileNotFound.jsx'

// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

const hist = createBrowserHistory()

let ps

const App = () => {
  const mainPanel = React.createRef()
  const [mobileOpen, setMobileOpen] = React.useState(
    window.innerWidth < 960 ? true : false,
  )
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false)
    } else {
      setMobileOpen(true)
    }
  }

  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      })
      document.body.style.overflow = 'hidden'
    }
    window.addEventListener('resize', resizeFunction)
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy()
      }
      window.removeEventListener('resize', resizeFunction)
    }
  }, [mainPanel])

  return (
    <React.Fragment>
      <Header mobileOpen={mobileOpen} />
      <Router history={hist}>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/plans" component={Plans} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route path="/ticker/:id" component={Ticker} />
          <Redirect exact path="/" to="/home" />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </React.Fragment>
  )
}

export default App
