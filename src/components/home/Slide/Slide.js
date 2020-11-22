import React from 'react'
import useStyles from './SlideStyle'

const Slide = ({ name, action, image }) => {
  const classes = useStyles()
  return (
    <div 
      className={classes.root}
    >
      <img
        className={classes.image}
        alt={name}
        src={image}
        onClick={action}
      />
    </div>
  )
}

export default Slide