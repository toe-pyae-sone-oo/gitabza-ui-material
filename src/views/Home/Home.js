import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import 'react-multi-carousel/lib/styles.css'
import { getLatest as getLatestSongs, getTop as getTopSongs } from '../../api/songs'
import { getLatest as getLatestArtists } from '../../api/artists'
import { LOAD_LATEST_SONGS, LOAD_LATEST_ARTISTS, LOAD_TOP_SONGS } from '../../constants/actionTypes'
import { GENRES } from '../../constants/songs'
import Loading from '../../components/Loading/Loading'
import SongList from '../../components/home/SongList/SongList'
import ArtistList from '../../components/home/ArtistList/ArtistList'
import GenresList from '../../components/home/GenresList/GenresList'
import SectionHeader from '../../components/home/SectionHeader/SectionHeader'

const mapStateToProps = state => ({
  loading: state.loading,
  songs: state.home.songs,
  artists: state.home.artists,
  topSongs: state.home.topSongs,
})

const mapDispatchToProps = dispatch => ({
  loadSongs: songs => dispatch({ type: LOAD_LATEST_SONGS, payload: songs }),
  loadArtists: artists => dispatch({ type: LOAD_LATEST_ARTISTS, payload: artists }),
  loadTopSongs: songs => dispatch({ type: LOAD_TOP_SONGS, payload: songs }),
})

const Home = ({ 
  loading, 
  songs, 
  artists, 
  topSongs,
  loadSongs, 
  loadArtists, 
  loadTopSongs,
  history, 
}) => {
  useEffect(() => {
    let mounted = true

    songs.length === 0 && getLatestSongs()
      .then(songs => mounted && loadSongs(songs))

    return () => mounted = false

  }, [songs, loadSongs])

  useEffect(() => {
    let mounted = true

    artists.length === 0 && getLatestArtists()
      .then(artists => mounted && loadArtists(artists))

    return () => mounted = false

  }, [artists, loadArtists])

  useEffect(() => {

    let mounted = true

    topSongs.length === 0 && getTopSongs()
      .then(songs => mounted && loadTopSongs(songs))

    return () => mounted = false

  }, [topSongs, loadTopSongs])

  const gotoChordPreview = song => 
    history.push(`/chords/${song.artists[0].slug}/${song.slug}`)

  const gotoArtistPreview = artist =>
    history.push(`/artists/${artist.slug}`)

  const gotoChordList = genre => 
    history.push(`/chords?genre=${genre}`)

  return (
    <Grid 
      container
      spacing={2}
    >
      <Grid item xs={12}>
        <SectionHeader
          title="Latest Update"
          onShowAll={() => history.push('/chords')}
        />
        {loading && <Loading />}
        <SongList 
          songs={songs} 
          onPreview={gotoChordPreview}
        />
      </Grid>
      <Grid item xs={12}>
        <SectionHeader 
          title="Artists" 
          onShowAll={() => history.push('/artists')}
        />
        {loading && <Loading />}
        <ArtistList 
          artists={artists} 
          onPreview={gotoArtistPreview}
        />
      </Grid>
      <Grid item xs={12}>
        <SectionHeader
          title="Top Songs"
          onShowAll={() => history.push('/chords')}
        />
        {loading && <Loading />}
        <SongList 
          songs={topSongs} 
          onPreview={gotoChordPreview}
        />
      </Grid>
      <Grid item xs={12}>
        <SectionHeader
          title="Genres"
          onShowAll={() => history.push('/chords')}
        />
        {loading && <Loading />}
        <GenresList 
          genres={GENRES} 
          onPreview={gotoChordList}
        />
      </Grid>
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)