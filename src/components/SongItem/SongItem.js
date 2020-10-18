import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import MicIcon from '@material-ui/icons/Mic'
import InfoIcon from '@material-ui/icons/Info'
import useStyles from './SongItemStyle'

const SongItem = ({ 
  image, 
  title, 
  artists = [], 
  version 
}) => {
  const classes = useStyles()

  return (
    <Card className={classes.root} variant="outlined">
      <CardMedia
        className={classes.image}
        image={image}
        title={title}
      ></CardMedia>
      <CardContent className={classes.content}>
        <Typography 
          className={classes.title} 
          variant="subtitle1"
          noWrap
        >
          <Box 
            display="flex" 
            alignItems="center"
          >
            <MusicNoteIcon 
              className={classes.titleIcon}
              fontSize="small" 
            />
            {title}
          </Box>
        </Typography>
        <Typography 
          className={classes.artists}
          variant="subtitle1"
          noWrap
        >
          <Box 
            display="flex" 
            alignItems="center"
          >
            <MicIcon 
              className={classes.artistsIcon}
              fontSize="small" 
            />
            {artists.join(', ')}
          </Box>
        </Typography>
        <Typography 
          className={classes.version}
          variant="subtitle1"
          noWrap
        >
          <Box 
            display="flex" 
            alignItems="center"
          >
            <InfoIcon 
              className={classes.versionIcon}
              fontSize="small" 
            />   
            {version}
          </Box>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default SongItem