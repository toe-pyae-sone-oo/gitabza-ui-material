import React, { useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import ReactGA from 'react-ga'
import DefaultLayout from './layout/DefaultLayout/DefaultLayout'
import AdminLayout from './layout/AdminLayout/AdminLayout'
import EmptyLayout from './layout/EmptyLayout/EmptyLayout'
import { ADMIN_ROUTE } from './constants/routes'
import { trackPageview } from './helpers/ga'

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

const App = () => {

  useEffect(() => {
    trackPageview(
      window.location.pathname + window.location.search
    )
  }, [])

  const { listen }  = useHistory()
  listen(location => 
    trackPageview(location.pathname + location.search))

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        <Route path={`/${ADMIN_ROUTE}/login`} component={EmptyLayout} />
        <Route path={`/${ADMIN_ROUTE}`} component={AdminLayout} />
        <Route path="/" component={DefaultLayout} />
      </Switch>
    </ThemeProvider>
  )
}

export default App