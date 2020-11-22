import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import MicIcon from '@material-ui/icons/Mic'
import InfiniteScroll from 'react-infinite-scroll-component'
import ArtistItem from '../../components/ArtistItem/ArtistItem'
import Loading from '../../components/Loading/Loading'
import Title from '../../components/Title/Title'
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

const LIMIT_PER_PAGE = 30

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

    if (count === -1) {
      find({ 
        limit: LIMIT_PER_PAGE, 
        sort: 'name', 
        order: 'asc' 
      }).then(data => {
        if (mounted) {
          loadArtists(data)
          setPage(0)
        }
      })
    }

    return () => mounted = false

  }, [artists, loadArtists, count, setPage])

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
      <div className={classes.root}>
        <Title
          icon={<MicIcon color="primary" />}
          content="Artists"
        ></Title>
        <InfiniteScroll
          className={classes.scroll}
          dataLength={artists.length}
          next={loadMoreArtists}
          hasMore={count !== artists.length && count !== -1}
        >
          <Grid container spacing={2}>
            {artists.map(artist => 
              <Grid
                item
                key={artist.uuid}
                lg={2}
                md={3}
                sm={4}
                xs={6}
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
      </div>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Artists)