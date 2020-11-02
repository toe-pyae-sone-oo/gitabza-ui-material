import React from 'react'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import useStyles from './ArtistItemStyle'

const ArtistItem = ({ name = '', picture, onPreview = f => f }) => {
  const classes = useStyles()
  return (
    <div 
      className={classes.root}
      onClick={onPreview}
    >
      <Avatar
        alt={name}
        src={picture}
        className={classes.avatar}
      />
      <Typography
        className={classes.name}
      >
        {name}
      </Typography>
    </div>
  )
}

export default ArtistItem