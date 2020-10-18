import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { LOAD_SONGS } from '../../constants/actionTypes'
import { find } from '../../api/songs'
import SongItem from '../../components/SongItem/SongItem'

const mapStateToProps = state => ({
  loading: state.loading,
  songs: state.songs.data,
  count: state.songs.count,
})

const mapDispatchToProps = dispatch => ({
  loadSongs: data => dispatch({ type: LOAD_SONGS, payload: data }),
})

const Chords = ({ loading, songs, count, loadSongs }) => {

  useEffect(() => {
    find({}).then(loadSongs)
  }, [loadSongs])

  return (
    <Grid container spacing={2}>
      {loading ? 'Loading...' : songs.length === 0
        ? 'Empty'
        : songs.map(song =>
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
          )
      }
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Chords)