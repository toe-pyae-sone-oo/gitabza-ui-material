import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import MusicIcon from '@material-ui/icons/MusicNote'
import InfiniteScroll from 'react-infinite-scroll-component'
import { LOAD_SONGS, SET_SONGS_GENRE, SET_SONGS_PAGE } from '../../constants/actionTypes'
import { GENRES } from '../../constants/songs'
import { find } from '../../api/songs'
import SongItem from '../../components/SongItem/SongItem'
import Loading from '../../components/Loading/Loading'
import NotFound from '../../components/NotFound/NotFound'
import Title from '../../components/Title/Title'
import useStyles from './ChordsStyle'

const LIMIT_PER_PAGE = 20

const mapStateToProps = state => ({
  loading: state.loading,
  songs: state.songs.data,
  count: state.songs.count,
  page: state.songs.page,
  genre: state.songs.genre,
})

const mapDispatchToProps = dispatch => ({
  loadSongs: data => dispatch({ type: LOAD_SONGS, payload: data }),
  setGenre: genre => dispatch({ type: SET_SONGS_GENRE, payload: genre }),
  setPage: page => dispatch({ type: SET_SONGS_PAGE, payload: page }),
})

const Chords = ({ 
  loading, 
  songs, 
  count, 
  genre,
  page,
  loadSongs, 
  setGenre,
  setPage,
  history,
}) => {
  const classes = useStyles()

  useEffect(() => {
    let mounted = true

    if (count === -1) {
      find({ 
        genre: genre === 'all' ? undefined : genre,
        limit: LIMIT_PER_PAGE,
        sort: 'title',
        order: 'asc',
      }).then(data => {
        if (mounted) {
          loadSongs({ ...data })
          setPage(0)
        }
      })
    } 

    return () => mounted = false

  }, [genre, count, loadSongs, setPage])

  const loadMoreSongs = () => {
    const nextPage = page + 1
    setPage(nextPage)
    find({ 
      genre: genre === 'all' ? undefined : genre,
      skip: nextPage * LIMIT_PER_PAGE, 
      limit: LIMIT_PER_PAGE,
      sort: 'title',
      order: 'asc',
    })
      .then(({ songs: newSongs, count }) => 
        loadSongs({ songs: [...songs, ...newSongs], count })
      )
  }

  const onGenreChange = e => {
    loadSongs({ songs: [], count: -1 })
    setGenre(e.target.value)
  }

  return (
    <>
      <div 
        className={classes.filter}
      >
        <Title
          icon={<MusicIcon color="primary" />}
          content="Chords & Tabs"
          gutterBottom={false}
          className={classes.title}
        ></Title>
        <TextField
          label="Genres"
          select
          variant="outlined"
          size="small"
          fullWidth
          className={classes.genreFilter}
          value={genre}
          onChange={onGenreChange}
        >
          <MenuItem value={'all'}>All</MenuItem>
          {GENRES.map(genre =>
            <MenuItem
              key={genre.value}
              value={genre.value}
            >
              {genre.name}
            </MenuItem>
          )}
        </TextField>
      </div>
      {count === 0 && <NotFound message="No Songs Found" />}
      <InfiniteScroll
        className={classes.scroll}
        dataLength={songs.length}
        next={loadMoreSongs}
        hasMore={count !== songs.length && count !== -1}
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
              <SongItem 
                onPreview={() => 
                  history.push(`/chords/${song.artists[0].slug}/${song.slug}`)}
                {...song} 
              />
            </Grid>
          )}
        </Grid>
      </InfiniteScroll>
      {loading ? <Loading /> : null}
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Chords)