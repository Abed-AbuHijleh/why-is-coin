import React from 'react'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'

// pages
import Home from './home.jsx'
import Ticker from './ticker.jsx'
import PageNotFound from './page-not-found.jsx'

import TopNav from '../components/top-nav/top-nav.jsx'
import Footer from '../components/footer/footer.jsx'

const hist = createBrowserHistory()

const App = () => {
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

  React.useEffect(() => {
    window.removeEventListener('resize', resizeFunction)
  }, [])

  return (
    <React.Fragment>
      <TopNav mobileOpen={mobileOpen} />
      <Router history={hist}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/ticker/:id" component={Ticker} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
      <Footer />
    </React.Fragment>
  )
}

export default App
