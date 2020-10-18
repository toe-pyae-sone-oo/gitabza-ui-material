import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import useStyles from './YoutubeSongItemStyle'

const YoutubeSongItem = ({ title = '', image = undefined }) => {
  const classes = useStyles()
  return (
    <Grid
      item
      md={3}
      sm={4}
      xs={12}
    >
      <img className={classes.image} src={image} alt={title} /> 
      <Typography className={classes.title} variant="caption">
        {title}
      </Typography>
    </Grid>
  )
}

export default YoutubeSongItem