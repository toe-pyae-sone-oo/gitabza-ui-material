import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import InfiniteScroll from 'react-infinite-scroll-component'
import ArtistItem from '../../components/ArtistItem/ArtistItem'
import Loading from '../../components/Loading/Loading'
import { find } from '../../api/artists'
import { LOAD_ARTISTS, SET_ARTISTS_PAGE } from '../../constants/actionTypes'
import useStyles from './ArtistsStyle'

const mapStateToProps = state => ({
  artists: state.artists.data,
  count: state.artists.count,
  page: state.artists.page,
  loading: state.loading,
})

const mapDispatchToProps = dispatch => ({
  loadArtists: ({ artists, count }) => 
    dispatch({ type: LOAD_ARTISTS, payload: { artists, count } }),
  setPage: page => dispatch({ type: SET_ARTISTS_PAGE, payload: page }),
})

const LIMIT_PER_PAGE = 20

const Artists = ({ 
  artists, 
  count, 
  loading, 
  page, 
  loadArtists, 
  setPage, 
  history 
}) => {
  const classes = useStyles()
  
  useEffect(() => {

    let mounted = true

    artists.length === 0 && find({ 
      limit: LIMIT_PER_PAGE, 
      sort: 'name', 
      order: 'asc' 
    })
      .then(data => mounted && loadArtists(data))

    return () => mounted = false

  }, [artists, loadArtists])

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
              <ArtistItem 
                onPreview={() => history.push(`/artists/${artist.slug}`)}
                {...artist} 
              />
            </Grid>
          )}
        </Grid>
      </InfiniteScroll>
      {loading ? <Loading/> : null}
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Artists)