import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
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

const App = ({ history }) => {

  useEffect(() => {
    trackPageview(
      window.location.pathname + window.location.search
    )

    history.listen(location => 
      trackPageview(location.pathname + location.search)
    )
  }, [history])


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