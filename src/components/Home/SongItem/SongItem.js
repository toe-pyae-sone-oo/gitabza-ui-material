import React from 'react'
import Typography from '@material-ui/core/Typography'
import useStyles from './SongList'

const SongItem = ({ title = '', image = undefined }) => {
  const classes = useStyles()
  return (
    <div 
      className={classes.root}
    >
      <img 
        className={classes.image} 
        src={image} 
        alt={title} 
      /> 
      <Typography 
        className={classes.title} 
        variant="caption"
      >
        {title}
      </Typography>
    </div>
  )
}

export default SongItem