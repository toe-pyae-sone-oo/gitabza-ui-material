import React from 'react'
import Card from '@material-ui/core/Card'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import PersonIcon from '@material-ui/icons/Person'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import useStyles from './ArtistItemStyle'

const ArtistItem = ({ picture, name, songs, onPreview = f => f }) => {
  const classes = useStyles()

  return (
    <Card 
      variant="outlined"
      className={classes.root}
      onClick={onPreview}
    >
      <div className={classes.avatarWrapper}>
        <Avatar
          className={classes.avatar}
          alt={name}
          src={picture}
        />
      </div>
      <div
        className={classes.info}
      >
        <Typography 
          className={classes.name}
          variant="subtitle1"
        >
          <Box
            display="flex"
            alignItems="center"
          >
            <PersonIcon
              className={classes.nameIcon} 
              fontSize="small" 
            />
            {name}
          </Box>
        </Typography>
        <Typography 
          variant="subtitle2"
        >
          <Box
            display="flex"
            alignItems="center"
          >
            <MusicNoteIcon
              className={classes.songsIcon} 
              fontSize="small" 
            />
            {songs}
          </Box>
        </Typography>
      </div>
    </Card>
  )
}

export default ArtistItem
