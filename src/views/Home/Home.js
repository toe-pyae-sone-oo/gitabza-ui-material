import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import 'react-multi-carousel/lib/styles.css'
import { getLatest as getLatestSongs, getTop as getTopSongs } from '../../api/songs'
import { getLatest as getLatestArtists } from '../../api/artists'
import { 
  LOAD_LATEST_SONGS, 
  LOAD_LATEST_ARTISTS, 
  LOAD_TOP_SONGS, 
  SET_SONGS_GENRE, 
  LOAD_SONGS 
} from '../../constants/actionTypes'
import { GENRES } from '../../constants/songs'
import Loading from '../../components/Loading/Loading'
import SongList from '../../components/home/SongList/SongList'
import ArtistList from '../../components/home/ArtistList/ArtistList'
import GenresList from '../../components/home/GenresList/GenresList'
import SectionHeader from '../../components/home/SectionHeader/SectionHeader'
import Slider from '../../components/home/Slider/Slider'
import useStyles from './HomeStyle'

const mapStateToProps = state => ({
  loading: state.loading,
  songs: state.home.songs,
  artists: state.home.artists,
  topSongs: state.home.topSongs,
})

const mapDispatchToProps = dispatch => ({
  loadLatestSongs: songs => dispatch({ type: LOAD_LATEST_SONGS, payload: songs }),
  loadArtists: artists => dispatch({ type: LOAD_LATEST_ARTISTS, payload: artists }),
  loadTopSongs: songs => dispatch({ type: LOAD_TOP_SONGS, payload: songs }),
  setGenre: genre => dispatch({ type: SET_SONGS_GENRE, payload: genre }),
  loadSongs: data => dispatch({ type: LOAD_SONGS, payload: data }),
})

const Home = ({ 
  loading, 
  songs, 
  artists, 
  topSongs,
  loadLatestSongs, 
  loadArtists, 
  loadTopSongs,
  setGenre,
  loadSongs,
  history, 
}) => {
  const classes = useStyles()

  useEffect(() => {
    document.title = process.env.REACT_APP_SITE_TITLE
  }, [])

  useEffect(() => {

    let mounted = true

    songs.length === 0 && getLatestSongs()
      .then(songs => mounted && loadLatestSongs(songs))

    return () => mounted = false

  }, [songs, loadLatestSongs])

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

  const searchChordsByGenre = genre => {
    setGenre(genre)
    loadSongs({ songs: [], count: -1 })
    history.push(`/chords`)
  }

  return (
    <Grid 
      container
      spacing={2}
    >
      <Grid
        item
        xs={12}
      >
        <div className={classes.mainSlider}>
          <Slider></Slider>
        </div>
      </Grid>
      <Grid item xs={12}>
        <SectionHeader
          title="Latest Update"
          onShowAll={() => history.push('/chords')}
        />
        {!loading && songs.length > 0
          ? <SongList 
              songs={songs} 
              onPreview={gotoChordPreview}
            />
          : <Loading/>
        }
      </Grid>
      <Grid item xs={12}>
        <SectionHeader 
          title="Artists" 
          onShowAll={() => history.push('/artists')}
        />
        {!loading && artists.length > 0
          ? <ArtistList 
              artists={artists} 
              onPreview={gotoArtistPreview}
            />
          : <Loading/>
        }
      </Grid>
      <Grid item xs={12}>
        <SectionHeader
          title="Top Songs"
          onShowAll={() => history.push('/chords')}
        />
        {!loading && topSongs.length > 0
          ? <SongList 
              songs={topSongs} 
              onPreview={gotoChordPreview}
            />
          : <Loading />
        }
      </Grid>
      <Grid item xs={12}>
        <SectionHeader
          title="Genres"
          onShowAll={null}
        />
        {!loading && songs.length > 0
          ? <GenresList 
              genres={GENRES} 
              onPreview={searchChordsByGenre}
            />
          : <Loading />
        }
      </Grid>
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)