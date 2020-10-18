import React from 'react'
import Grid from '@material-ui/core/Grid'
import SongItem from '../SongItem/SongItem'

const SongList = ({ songs = [] }) =>
  <Grid container spacing={2}>
    {songs.map(song =>
      <SongItem key={song.uuid} {...song} />
    )}
  </Grid>

export default SongList