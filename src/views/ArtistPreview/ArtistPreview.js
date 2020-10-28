import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import SongItem from '../../components/SongItem/SongItem'
import ArtistItem from '../../components/ArtistItem/ArtistItem'
import Loading from '../../components/Loading/Loading'
import NotFound from '../../components/NotFound/NotFound'
import { findById, getLatest } from '../../api/artists'
import { findByArtist } from '../../api/songs'
import useStyles from './ArtistPreviewStyle'

const mapStateToProps = state => ({
  loading: state.loading,
})

const ArtistPreview = ({ loading, match }) => {
  const classes = useStyles()

  const artistId = match.params.id
  const [artist, setArtist] = useState(undefined)
  const [songs, setSongs] = useState([])
  const [error, setError] = useState(undefined)
  const [others, setOthers] = useState([])

  const handleError = err => {
    if (err.response && err.response.status === 404) {
      setError('Artist Not Found')
    }
  }

  useEffect(() => {
    
    if (artistId) {
      findById(artistId)
        .then(data => setArtist(data))
        .catch(handleError)

      findByArtist(artistId)
        .then(data => setSongs(data))
        .catch(handleError)
    }

    getLatest().then(artists => setOthers([
      ...artists.filter(artist => artist.uuid !== artistId)
    ]))

  }, [artistId])

  return (
    <Grid 
      container 
      spacing={2}
    >
      <Grid
        container
        item
        md={9}
      >
        <Grid
          xs={12}
          item
        >
          {error && <NotFound message={error} />}
          {loading
            ? <Loading/>
            : artist &&
                <>
                  <div className={classes.artistInfoWrapper}>
                    <Avatar
                      className={classes.avatar}
                      alt={artist.name}
                      src={artist.picture}
                    />
                    <div
                      className={classes.artistInfo}
                    >
                      <Typography 
                        className={classes.name}
                        variant="h6"
                      >
                        {artist.name}
                      </Typography>
                      <Typography
                        className={classes.songCount}
                        variant="subtitle2"
                      >
                        သီချင်း - {artist.songs}
                      </Typography>
                    </div>
                  </div>
                  <Grid 
                    container 
                    spacing={2}
                  >
                    {songs.map(song =>
                      <Grid 
                        item 
                        key={song.uuid} 
                        lg={6} 
                        md={6}
                        sm={6}
                        xs={12}
                      >
                        <SongItem {...song} />
                      </Grid>
                    )}
                  </Grid>
                </>
          }
        </Grid>
      </Grid>
      <Grid
        container
        item
        md={3}
      >
        <Grid item xs={12}>
          <Typography
            variant="body1"
          >
            You may also like
          </Typography>
        </Grid>
        {loading
          ? <Loading />
          : <>
              {others.map(artist => 
                <Grid
                  key={artist.uuid}
                  item
                  xs={12}
                  className={classes.artists}
                >
                  <ArtistItem {...artist} />
                </Grid>
              )}
            </>
        }
      </Grid>
    </Grid>
  )
}

export default connect(mapStateToProps)(ArtistPreview)