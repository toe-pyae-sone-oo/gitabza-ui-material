import React from 'react'
import InfoIcon from '@material-ui/icons/Info'
import Typography from '@material-ui/core/Typography'
import useStyles from './NotFoundStyle'

const NotFound = ({ message = 'Not Found' }) => {
  const classes = useStyles()
  return (
    <div
      className={classes.root}
    >
      <InfoIcon className={classes.icon} />
      <Typography>
        {message}
      </Typography>
    </div>
  )
}

export default NotFound