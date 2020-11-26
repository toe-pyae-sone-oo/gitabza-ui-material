import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './store'
import './index.css'
import GA from './helpers/googleAnalytics'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {GA.init() && <GA.RouteTracker />}
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
