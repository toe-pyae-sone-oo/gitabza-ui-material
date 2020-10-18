import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import useStyles from './ArtistItemStyle'

const ArtistItem = ({ name = '' }) => {
  const classes = useStyles()
  return (
    <Grid item xs={12}>
      <Typography 
        className={classes.name} 
      >
        {name}
      </Typography>
    </Grid>
  )
}

export default ArtistItem