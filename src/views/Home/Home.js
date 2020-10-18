import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import MicIcon from '@material-ui/icons/Mic'
import { getLatest as getLatestSongs } from '../../api/songs'
import { getLatest as getLatestArtists } from '../../api/artists'
import { LOAD_LATEST_SONGS, LOAD_LATEST_ARTISTS } from '../../constants/actionTypes'
import SongList from '../../components/Home/SongList/SongList'
import YoutubeSongList from '../../components/Home/YoutubeSongList/YoutubeSongList'
import ArtistList from '../../components/Home/ArtistList/ArtistList'
import useStyles from './HomeStyle'

const mapStateToProps = state => ({
  loading: state.loading,
  songs: state.home.songs,
  artists: state.home.artists,
})

const mapDispatchToProps = dispatch => ({
  loadSongs: songs => dispatch({ type: LOAD_LATEST_SONGS, payload: songs }),
  loadArtists: artists => dispatch({ type: LOAD_LATEST_ARTISTS, payload: artists }),
})

const Home = ({ loading, songs, artists, loadSongs, loadArtists }) => {
  const classes = useStyles()

  useEffect(() => {
    getLatestSongs().then(loadSongs)
  }, [loadSongs])

  useEffect(() => {
    getLatestArtists().then(loadArtists)
  }, [loadArtists])

  return (
    <Grid container>
      <Grid container item md={8}>
        <Card variant="outlined" className={classes.songsCard}>
          <CardContent>
            <Typography 
              variant="h6"
              gutterBottom
            >
              <Box 
                display="flex"
                alignItems="center"
              >
                <MusicNoteIcon/>
                Latest Update
              </Box>
            </Typography>
            {loading
              ? 'Loading...'
              : <>
                  <SongList songs={songs} />
                  <YoutubeSongList songs={songs} />
                </>
            }
          </CardContent>
        </Card>
      </Grid>
      <Grid container item md={4}>
        <Card variant="outlined" className={classes.artistsCard}>
          <CardContent>
            <Typography 
              variant="h6"
              gutterBottom
            >
              <Box
                display="flex"
                alignItems="center"
              >
                <MicIcon/>
                Latest Songs
              </Box>
            </Typography>
            {loading
              ? 'Loading...'
              : <ArtistList artists={artists} />
            }
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)