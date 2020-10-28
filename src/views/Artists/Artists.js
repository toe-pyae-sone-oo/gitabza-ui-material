import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import InfiniteScroll from 'react-infinite-scroll-component'
import ArtistItem from '../../components/ArtistItem/ArtistItem'
import Loading from '../../components/Loading/Loading'
import { find } from '../../api/artists'
import { LOAD_ARTISTS } from '../../constants/actionTypes'
import useStyles from './ArtistsStyle'

const mapStateToProps = state => ({
  artists: state.artists.data,
  count: state.artists.count,
  loading: state.loading,
})

const mapDispatchToProps = dispatch => ({
  loadArtists: ({ artists, count }) => 
    dispatch({ type: LOAD_ARTISTS, payload: { artists, count } })
})

const LIMIT_PER_PAGE = 20

const Artists = ({ artists, count, loading, loadArtists }) => {
  const classes = useStyles()

  const [page, setPage] = useState(0)
  
  useEffect(() => {
    find({ 
      limit: LIMIT_PER_PAGE, 
      sort: 'name', 
      order: 'asc' 
    })
      .then(loadArtists)
  }, [loadArtists])

  const loadMoreArtists = () => {
    const nextPage = page + 1
    setPage(nextPage)
    find({ 
      skip: nextPage * LIMIT_PER_PAGE, 
      limit: LIMIT_PER_PAGE,
      sort: 'name',
      order: 'asc',
    })
      .then(({ artists: newArtists, count }) => 
        loadArtists({ artists: [...artists, ...newArtists], count }))
  }

  return (
    <>
      <InfiniteScroll
        className={classes.scroll}
        dataLength={artists.length}
        next={loadMoreArtists}
        hasMore={count !== artists.length}
      >
        <Grid container spacing={2}>
          {artists.map(artist => 
            <Grid
              item
              key={artist.uuid}
              lg={3}
              md={3}
              sm={6}
              xs={12}
            >
              <ArtistItem {...artist} />
            </Grid>
          )}
        </Grid>
      </InfiniteScroll>
      {loading ? <Loading/> : null}
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Artists)