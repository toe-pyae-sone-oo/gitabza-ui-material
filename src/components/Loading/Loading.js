import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import useStyles from './LoadingStyle'

const Loading = () => {
  const classes = useStyles()

  return (
    <div 
      className={classes.root}
    >
      <CircularProgress size={30} />
    </div>
  )
}

export default Loading