import React from 'react'
import Typography from '@material-ui/core/Typography'
import useStyles from './GenresItemStyle'

const GenresItem = ({ 
  name = '', 
  image = '', 
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
        alt={name} 
      /> 
      <Typography 
        variant="caption"
      >
        {name}
      </Typography>
    </div>
  )
}

export default GenresItem