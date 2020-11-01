import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import SongItem from '../../components/SongItem/SongItem'
import ArtistItem from '../../components/ArtistItem/ArtistItem'
import Loading from '../../components/Loading/Loading'
import NotFound from '../../components/NotFound/NotFound'
import { getLatest, findBySlug } from '../../api/artists'
import { findByArtist as findSongs } from '../../api/songs'
import useStyles from './ArtistPreviewStyle'

const mapStateToProps = state => ({
  loading: state.loading,
})

const ArtistPreview = ({ loading, match, history }) => {
  const classes = useStyles()

  const artistSlug = match.params.slug
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
    if (artistSlug) {
      setArtist(undefined)
      setSongs([])
      setOthers([])

      findBySlug(artistSlug)
        .then(setArtist)
        .catch(handleError)
    }
  }, [artistSlug])

  useEffect(() => {
    if (artist) {
      findSongs(artist.uuid)
        .then(setSongs)
        .catch(handleError)
    
      getLatest().then(artists => setOthers([
        ...artists.filter(it => it.uuid !== artist.uuid)
      ]))
    }
  }, [artist])

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
          {artist &&
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
          }
          {loading
            ? <Loading/>
            : <Grid 
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
                    <SongItem 
                      {...song} 
                      onPreview={() => 
                        history.push(`/chords/${song.artists[0].slug}/${song.slug}`)}
                    />
                  </Grid>
                )}
              </Grid>
          }
        </Grid>
      </Grid>
      <Grid
        container
        item
        md={3}
      >
        <Typography
          variant="h6"
        >
          You may also like
        </Typography>
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
                  <ArtistItem 
                    {...artist} 
                    onPreview={() =>
                      history.push(`/artists/${artist.slug}`)}
                  />
                </Grid>
              )}
            </>
        }
      </Grid>
    </Grid>
  )
}

export default connect(mapStateToProps)(ArtistPreview)