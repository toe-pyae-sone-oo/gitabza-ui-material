import React from 'react'
import Grid from '@material-ui/core/Grid'
import YoutubeSongItem from '../YoutubeSongItem/YoutubeSongItem'

const YoutubeSongList = ({ songs }) => 
  <Grid container spacing={2}>
    {songs.map(song =>
      <YoutubeSongItem key={song.uuid} {...song} />
    )}
  </Grid>

export default YoutubeSongList