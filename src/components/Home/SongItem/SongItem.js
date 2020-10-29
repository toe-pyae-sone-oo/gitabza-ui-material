import React from 'react'
import Typography from '@material-ui/core/Typography'
import useStyles from './SongItemStyle'

const SongItem = ({ 
  title = '', 
  image = undefined, 
  onPreview = f => f 
}) => {
  const classes = useStyles()
  return (
    <div 
      className={classes.root}
      onClick={() => onPreview()}
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