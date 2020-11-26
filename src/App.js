import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import DefaultLayout from './layout/DefaultLayout/DefaultLayout'
import AdminLayout from './layout/AdminLayout/AdminLayout'
import EmptyLayout from './layout/EmptyLayout/EmptyLayout'
import { ADMIN_ROUTE } from './constants/routes'
import { useTracking }  from './helpers/useTracking'

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
  useTracking( process.env.REACT_APP_GA_MEASUREMENT_ID )
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