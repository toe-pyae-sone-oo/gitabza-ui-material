import ReactGA from 'react-ga'

ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID)

export const trackPageview = page => {
  ReactGA.pageview(page)
}