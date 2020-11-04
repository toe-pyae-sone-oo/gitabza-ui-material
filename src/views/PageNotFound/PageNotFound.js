import React from 'react'
import Typography from '@material-ui/core/Typography'
import useStyles from './PageNotFoundStyle'

const PageNotFound = () => {
  
  const classes = useStyles()

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