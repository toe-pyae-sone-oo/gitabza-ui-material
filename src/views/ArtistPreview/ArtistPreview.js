import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import SongItem from '../../components/SongItem/SongItem'
import { findById } from '../../api/artists'
import { findByArtist } from '../../api/songs'
import useStyles from './ArtistPreviewStyle'

const ArtistPreview = ({ match }) => {
  const classes = useStyles()

  const artistId = match.params.id
  const [artist, setArtist] = useState(undefined)
  const [songs, setSongs] = useState([])

  useEffect(() => {
    if (artistId) {
      findById(artistId)
        .then(data => setArtist(data))
      findByArtist(artistId)
        .then(data => setSongs(data))
    }
  }, [artistId])

  useEffect(() => {
    
  })

  return (
    <Grid 
      container 
      item
      spacing={2}
    >
      {artist 
        ? <>
            <Grid 
              item 
              container
              direction="column"
              alignItems="center"
            >
              <Avatar
                className={classes.avatar}
                alt={artist.name}
                src={artist.picture}
              />
              <Typography 
                className={classes.name}
                variant="h6"
              >
                {artist.name}
              </Typography>
              <Typography
                variant="subtitle2"
              >
                Chords - {artist.songs}
              </Typography>
            </Grid>
            <Grid
              item
              container
            >
              <Grid container spacing={2}>
                {songs.map(song =>
                  <Grid 
                    item 
                    key={song.uuid} 
                    lg={4} 
                    md={6}
                    sm={6}
                    xs={12}
                  >
                    <SongItem {...song} />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </>
        : <p>Not Found</p>
      }
    </Grid>
  )
}

export default ArtistPreview