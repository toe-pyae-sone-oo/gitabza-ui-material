import React from 'react'
import { Switch, Route } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout/DefaultLayout'

const App = () =>
  <div className="App">
    <Switch>
      <Route path="/" component={DefaultLayout} />
    </Switch>
  </div>

export default App