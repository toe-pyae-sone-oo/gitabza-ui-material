import React from 'react'
import Grid from '@material-ui/core/Grid'
import ArtistItem from '../ArtistItem/ArtistItem'

const ArtistList = ({ artists = [] }) => 
  <Grid container spacing={1}>
    {artists.map(artist =>
      <ArtistItem key={artist.uuid} {...artist} />
    )}
  </Grid>

export default ArtistList