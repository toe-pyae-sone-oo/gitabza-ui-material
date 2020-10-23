import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import DefaultLayout from './layout/DefaultLayout/DefaultLayout'
import AdminLayout from './layout/AdminLayout/AdminLayout'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffb400',
      light: '#ffe7ad'
    },
    dark: {
      main: '#333'
    },
    type: 'dark',
  },
});

const App = () =>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Switch>
      <Route exact path="/" component={DefaultLayout} />
      <Route path="/admin" component={AdminLayout} />
    </Switch>
  </ThemeProvider>

export default App