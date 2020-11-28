import ReactGA from 'react-ga'

export const trackPageview = page => {
  ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID)
  ReactGA.pageview(page)
}