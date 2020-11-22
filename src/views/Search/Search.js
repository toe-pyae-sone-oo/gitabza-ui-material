import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import InfiniteScroll from 'react-infinite-scroll-component'
import SongItem from '../../components/SongItem/SongItem'
import ArtistItem from '../../components/ArtistItem/ArtistItem'
import Loading from '../../components/Loading/Loading'
import NotFound from '../../components/NotFound/NotFound'
import { LOAD_SEARCH_SONGS, LOAD_SEARCH_ARTISTS } from '../../constants/actionTypes'
import { find as findSongs } from '../../api/songs'
import { find as findArtists } from '../../api/artists'
import useStyles from './SearchStyle'

const LIMIT_PER_PAGE = 20

const mapStateToProps = state => ({
  loading: state.loading,
  search: state.search.search,
  tab: state.search.tab,
  songs: state.search.songs,
  artists: state.search.artists,
})

const mapDispatchToProps = dispatch => ({
  loadSongs: ({ page, count, songs }) => dispatch({ 
    type: LOAD_SEARCH_SONGS, 
    payload: { page, count, songs },
  }),
  loadArtists: ({ page, count, artists }) => dispatch({
    type: LOAD_SEARCH_ARTISTS,
    payload: { page, count, artists },
  }),
})

const searchSongs = (search, page = 0) => {
  return findSongs({ 
    title: search, 
    limit: LIMIT_PER_PAGE,  
    skip: page * LIMIT_PER_PAGE,
    sort: 'title',
    order: 'asc',
  })
}

const searchArtists = (search, page = 0) => {
  return findArtists({
    name: search,
    limit: LIMIT_PER_PAGE,
    skip: page * LIMIT_PER_PAGE,
    sort: 'name',
    order: 'asc',
  })
}

const TabPanel = ({ children, value, index, ...other }) => 
  <div
    hidden={value !== index}
    {...other}
  >
    {value === index && {...children}}
  </div>

const Search = ({  
  search, 
  tab, 
  loading, 
  songs,
  loadSongs,
  artists,
  loadArtists,
  history,
}) => {
  const classes = useStyles()

  const [songError, setSongError] = useState(undefined)
  const [artistError, setArtistError] = useState(undefined)

  useEffect(() => {
    document.title = `${process.env.REACT_APP_SITE_TITLE_PREFIX} | Search`
  }, [])

  useEffect(() => {
    loadSongs({
      page: 0,
      count: 0,
      songs: [],
    })

    setSongError(undefined)

    searchSongs(search)
      .then(({ songs, count }) => {
        loadSongs({
          page: 0,
          count,
          songs,
        })
        setSongError(count === 0 
          ? 'No Songs Found' 
          : undefined
        )
      })
  }, [search, loadSongs])

  useEffect(() => {
    loadArtists({
      page: 0,
      count: 0,
      artists: [],
    })

    setArtistError(undefined)

    searchArtists(search)
      .then(({ artists, count }) => {
        loadArtists({
          page: 0,
          count,
          artists,
        })
        setArtistError(count === 0
          ? 'No Artists Found'
          : undefined
        )
      })
  }, [search, loadArtists])

  const loadMoreSongs = () => {
    const nextPage = songs.page + 1
    searchSongs(search, nextPage)
      .then(({ songs: newSongs, count }) => loadSongs({
        page: nextPage,
        count,
        songs: [...songs.data, ...newSongs],
      }))
  }

  const loadMoreArtists = () => {
    const nextPage = artists.page + 1
    searchArtists(search, nextPage)
      .then(({ artists: newArtists, count }) => loadArtists({
        page: nextPage,
        count,
        artists: [...artists.data, ...newArtists],
      }))
  }

  return (
    <div className={classes.root}>
      <TabPanel
        value={tab}
        index={0}
      >
        <InfiniteScroll
          className={classes.scroll}
          dataLength={songs.data.length}
          next={loadMoreSongs}
          hasMore={songs.count !== songs.data.length}
        >
          <Grid
            container
            spacing={2}
          >
            {songError
              ? <NotFound message={songError} />
              : songs.data.map(song =>
                  <Grid 
                    item 
                    key={song.uuid}
                    lg={4} 
                    md={6}
                    sm={6}
                    xs={12}
                  >
                    <SongItem 
                      {...song} 
                      onPreview={() => history.push(`/chords/${song.artists[0].slug}/${song.slug}`)}
                    />
                  </Grid>
                )
            }
          </Grid>
        </InfiniteScroll>
      </TabPanel>
      <TabPanel
        value={tab}
        index={1}
      >
        <InfiniteScroll
          className={classes.scroll}
          dataLength={artists.data.length}
          next={loadMoreArtists}
          hasMore={artists.count !== artists.data.length}
        >
          <Grid
            container
            spacing={2}
          >
            {artistError
              ? <NotFound message={artistError} />
              : artists.data.map(artist =>
                  <Grid 
                    item 
                    key={artist.uuid}
                    lg={2} 
                    md={3}
                    sm={4}
                    xs={6}
                  >
                    <ArtistItem 
                      {...artist} 
                      onPreview={() => history.push(`/artists/${artist.slug}`)}
                    />
                  </Grid>
                )
          }
          </Grid>
        </InfiniteScroll>
      </TabPanel>
      {loading && <Loading />}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)