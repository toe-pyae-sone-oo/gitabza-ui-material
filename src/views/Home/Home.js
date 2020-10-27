import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import 'react-multi-carousel/lib/styles.css'
import { getLatest as getLatestSongs } from '../../api/songs'
import { getLatest as getLatestArtists } from '../../api/artists'
import { LOAD_LATEST_SONGS, LOAD_LATEST_ARTISTS } from '../../constants/actionTypes'
import Loading from '../../components/Loading/Loading'
import SongList from '../../components/home/SongList/SongList'
import ArtistList from '../../components/home/ArtistList/ArtistList'
import SectionHeader from '../../components/home/SectionHeader/SectionHeader'

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
  useEffect(() => {
    getLatestSongs().then(loadSongs)
  }, [loadSongs])

  useEffect(() => {
    getLatestArtists().then(loadArtists)
  }, [loadArtists])

  return (
    <Grid 
      container
      spacing={2}
    >
      <Grid item xs={12}>
        <SectionHeader
          title="Latest Update"
        />
        {loading && <Loading />}
        <SongList songs={songs} />
      </Grid>
      <Grid item xs={12}>
        <SectionHeader 
          title="Artists" 
        />
        {loading && <Loading />}
        <ArtistList artists={artists} />
      </Grid>
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)