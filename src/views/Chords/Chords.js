import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import InfiniteScroll from 'react-infinite-scroll-component'
import { LOAD_SONGS } from '../../constants/actionTypes'
import { find } from '../../api/songs'
import SongItem from '../../components/SongItem/SongItem'
import useStyles from './ChordsStyle'

const LIMIT_PER_PAGE = 20

const mapStateToProps = state => ({
  loading: state.loading,
  songs: state.songs.data,
  count: state.songs.count,
})

const mapDispatchToProps = dispatch => ({
  loadSongs: data => dispatch({ type: LOAD_SONGS, payload: data }),
})

const Chords = ({ loading, songs, count, loadSongs }) => {
  const classes = useStyles()

  const [page, setPage] = useState(0)

  useEffect(() => {
    find({ limit: LIMIT_PER_PAGE }).then(loadSongs)
  }, [loadSongs])

  const loadMoreSongs = () => {
    console.log('hello!')
    const nextPage = page + 1
    setPage(nextPage)
    find({ skip: nextPage * LIMIT_PER_PAGE, limit: LIMIT_PER_PAGE })
      .then(({ songs: newSongs, count }) => loadSongs({ songs: [...songs, ...newSongs], count }))
  }

  return (
    <>
      <InfiniteScroll
        className={classes.scroll}
        dataLength={songs.length}
        next={loadMoreSongs}
        hasMore={count !== songs.length}
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
      </InfiniteScroll>
      {loading ? <p>Loading...</p> : null}
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Chords)