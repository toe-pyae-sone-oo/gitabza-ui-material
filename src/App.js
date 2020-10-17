import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';
import DefaultLayout from './layout/DefaultLayout/DefaultLayout'

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
    <Switch>
      <Route path="/" component={DefaultLayout} />
    </Switch>
  </ThemeProvider>

export default App