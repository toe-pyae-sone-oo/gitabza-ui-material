import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import useStyles from './SongItemStyle'

const SongItem = ({ title = '', artists = [] }) => {
  const classes = useStyles()

  return (
    <Grid 
      className={classes.root}
      item 
      md={6} 
      sm={6}
      xs={12}
    >
      <Typography className={classes.title}>{title}</Typography>
      <Typography className={classes.subtitle} variant="caption">{artists.join(', ')}</Typography>
    </Grid>
  )
}
  

export default SongItem