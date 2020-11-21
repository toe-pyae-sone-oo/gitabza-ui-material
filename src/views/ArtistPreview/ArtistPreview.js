import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import MusicIcon from '@material-ui/icons/MusicNote'
import MicIcon from '@material-ui/icons/Mic'
import SongItem from '../../components/SongItem/SongItem'
import Loading from '../../components/Loading/Loading'
import NotFound from '../../components/NotFound/NotFound'
import Title from '../../components/Title/Title'
import { getLatest, findBySlug } from '../../api/artists'
import { findByArtist as findSongs } from '../../api/songs'
import { ARTIST_NOT_FOUND, NO_SONGS } from '../../constants/errors'
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
      setError(ARTIST_NOT_FOUND)
    }
  }

  useEffect(() => {
    setError(undefined)
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
        .then(data => {
          setSongs(data)
          if (data.length === 0) {
            setError(NO_SONGS)
          }
        })
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
        item
        xs={12}
      >
        {artist &&
          <div 
            className={classes.header}
            style={{
              background: `url(${artist.picture})`
            }}
          >
            <div
              className={classes.headerLayer}
            ></div>
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
          </div>
        }
      </Grid>
      <Grid
        item
        md={9}
        xs={12}
      >
        <Title
          icon={<MusicIcon color="primary" />}
          content="Songs"
        ></Title>
        {error === ARTIST_NOT_FOUND && <NotFound message={error} />}
        {loading
          ? <Loading/>
          : error === NO_SONGS
              ? <NotFound message={error} />
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
      <Grid
        item
        md={3}
        xs={12}
      >
        <Title
          icon={<MicIcon color="primary" />}
          content="Random Artists"
        ></Title>
        {loading
          ? <Loading />
          : <Card 
              className={classes.artists}
              variant="outlined"
            >
              {others.map(artist => 
                <Typography
                  key={artist.uuid}
                  className={classes.artist}
                  gutterBottom
                  onClick={() => history.push(`/artists/${artist.slug}`)}
                >
                  {artist.name}
                </Typography>
              )}
            </Card>
        }
      </Grid>
    </Grid>
  )
}

export default connect(mapStateToProps)(ArtistPreview)