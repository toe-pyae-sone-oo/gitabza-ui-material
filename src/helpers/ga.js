import ReactGA from 'react-ga'

ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID)

export const trackPageview = page => {
  ReactGA.pageview(page)
}

export const trackButtonClick = (label, action) => {
  ReactGA.event({
    category: 'button-click',
    label,
    action
  })
}

export const trackSearch = (label, action) => {
  ReactGA.event({
    category: 'search',
    label,
    action
  })
}