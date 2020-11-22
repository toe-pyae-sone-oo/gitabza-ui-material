import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import useStyles from './PageNotFoundStyle'

const PageNotFound = () => {
  
  const classes = useStyles()

  useEffect(() => {
    document.title = `${process.env.REACT_APP_SITE_TITLE_PREFIX} | 404`
  }, [])

  return (
    <div className={classes.root}>
      <Typography
        variant="h1"
        className={classes.status}
      >
        404
      </Typography>
      <Typography
        variant="h6"
      >
        PAGE NOT FOUND
      </Typography>
    </div>
  )
}

export default PageNotFound