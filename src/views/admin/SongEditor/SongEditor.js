import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import AutoComplete from '@material-ui/lab/Autocomplete'
import Button from '@material-ui/core/Button'
import { LOAD_ADMIN_ARTIST_NAMES, SET_ADMIN_SONGS_CHANGED } from '../../../constants/actionTypes'
import { GENRES } from '../../../constants/songs'
import { ADMIN_ROUTE } from '../../../constants/routes'
import { getNames as getArtistNames } from '../../../api/artists'
import { create, findById, update } from '../../../api/songs'
import { getCapo } from '../../../helpers/songs'
import { validateSongForm } from '../../../validators'
import useStyles from './SongEditorStyle'

const mapStateToProps = state => ({
  loading: state.loading,
  artists: state.adminArtists.names,
})

const mapDispatchToProps = dispatch => ({
  loadArtistNames: payload => dispatch({ 
    type: LOAD_ADMIN_ARTIST_NAMES,
    payload,
  }),
  setChanged: changed => dispatch({ 
    type: SET_ADMIN_SONGS_CHANGED, 
    payload: changed 
  }),
})

const SongEditor = ({ 
  loading, 
  artists, 
  history, 
  match,
  loadArtistNames,
  setChanged,
}) => {
  const classes = useStyles()

  const songId = match.params.id

  const [form, setForm] = useState({
    title: '',
    slug: '',
    artists: [],
    genre: '',
    types: '',
    difficulty: '',
    capo: '',
    version: '',
    lyrics: '',
    youtube: '',
  })
  
  const [errors, setErrors] = useState({
    title: '',
    slug: '',
    artists: '',
    types: '',
    difficulty: '',
    version: '',
    lyrics: '',
    youtube: '',
  })

  useEffect(() => {
    getArtistNames().then(loadArtistNames)
  }, [loadArtistNames])

  useEffect(() => {
    let mounted = true
    songId && findById(songId).then(song => {
      mounted && setForm({ 
        ...song,
        artists: song.artists.map(artist => artist.uuid),
      })
    })
    return () => mounted = false
  }, [songId])

  const handleInputChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }
  
  const handleArtistsInputChange = (e, value) => {
    setForm({
      ...form,
      artists: value.map(artist => artist.uuid),
    }) 
  }

  const handleError = _errors => ({ response }) => {
    if (response && response.status === 422) {
      if (response.data && response.data.message === 'slug already exists') {
        setErrors({ ..._errors, slug: response.data.message })
      }
    }
  }

  const handleSubmit = () => {
    const _errors = validateSongForm(form)
    setErrors(_errors)

    const isValid = Object.values(_errors).every(err => !err)
    if (isValid) {
      if (songId) {
        update(songId, form)
          .then(() => {
            setChanged(true)
            history.push(`/${ADMIN_ROUTE}/songs`)
          })
          .catch(handleError(_errors))
      } else {
        create({ ...form })
          .then(() => {
            setChanged(true)
            history.push(`/${ADMIN_ROUTE}/songs`)
          })
          .catch(handleError(_errors))
      }
    }
  }

  return (
    <Card
      className={classes.root}
      variant="outlined"
    >
      <Typography 
        variant="h5"
        gutterBottom
      >
        Create New Song
      </Typography>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
        >
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            size="small"
            fullWidth
            value={form.title}
            onChange={handleInputChange}
            helperText={errors.title}
            error={!!errors.title}
            disabled={loading}
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <TextField
            name="slug"
            variant="outlined"
            label="Slug"
            size="small"
            fullWidth
            value={form.slug}
            onChange={handleInputChange}
            helperText={errors.slug}
            error={!!errors.slug}
            disabled={loading}
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <AutoComplete
            name="artists"
            options={artists}
            getOptionLabel={option => option.name}
            disabled={loading}
            renderInput={params =>
              <TextField 
                {...params}  
                label="Choose Artists"
                variant="outlined"
                helperText={errors.artists}
                error={!!errors.artists}
              />
            }
            size="small"
            multiple
            value={artists.filter(artist => form.artists.includes(artist.uuid))}
            onChange={handleArtistsInputChange}
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <TextField
            name="genre"
            label="Choose Genres"
            select
            variant="outlined"
            size="small"
            fullWidth
            value={form.genre}
            onChange={handleInputChange}
            disabled={loading}
          >
            {GENRES.map(genre =>
              <MenuItem
                key={genre.value}
                value={genre.value}
              >
                {genre.name}
              </MenuItem>
            )}
          </TextField>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <TextField
            name="types"
            label="Choose Type"
            select
            variant="outlined"
            size="small"
            fullWidth
            value={form.types}
            onChange={handleInputChange}
            helperText={errors.types}
            error={!!errors.types}
            disabled={loading}
          >
            <MenuItem value="bass">Bass</MenuItem>
            <MenuItem value="chords">Chords</MenuItem>
            <MenuItem value="drum">Drum</MenuItem>
            <MenuItem value="tabs">Tabs</MenuItem>
            <MenuItem value="ukelele">Ukelele</MenuItem>
          </TextField>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <TextField
            name="difficulty"
            label="Choose Difficulty"
            select
            variant="outlined"
            size="small"
            fullWidth
            value={form.difficulty}
            onChange={handleInputChange}
            helperText={errors.difficulty}
            error={!!errors.difficulty}
            disabled={loading}
          >
            <MenuItem value="novice">Novice</MenuItem>
            <MenuItem value="intermediate">Intermediate</MenuItem>
            <MenuItem value="advanced">Advanced</MenuItem>
          </TextField>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <TextField
            name="capo"
            label="Choose Capo"
            select
            variant="outlined"
            size="small"
            fullWidth
            value={form.capo}
            onChange={handleInputChange}
            disabled={loading}
          >
            {[...Array(12).keys()].map(i =>
              <MenuItem 
                key={i} 
                value={getCapo(i + 1)}
              >
                {getCapo(i + 1)}
              </MenuItem>
            )}
          </TextField>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <TextField
            name="version"
            variant="outlined"
            label="Version"
            size="small"
            fullWidth
            value={form.version}
            onChange={handleInputChange}
            helperText={errors.version}
            error={!!errors.version}
            disabled={loading}
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <TextField
            name="lyrics"
            variant="outlined"
            label="Lyrics & Chords"
            size="small"
            fullWidth
            value={form.lyrics}
            onChange={handleInputChange}
            multiline
            rows={15}
            helperText={errors.lyrics}
            error={!!errors.lyrics}
            InputProps={{
              classes: {
                input: classes.lyrics,
              }
            }}
            disabled={loading}
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <TextField
            name="youtube"
            variant="outlined"
            label="Youtube"
            size="small"
            fullWidth
            value={form.youtube}
            onChange={handleInputChange}
            helperText={errors.youtube}
            error={!!errors.youtube}
            disabled={loading}
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="default"
            className={classes.cancel}
            onClick={() => history.push(`/${ADMIN_ROUTE}/songs`)}
            disabled={loading}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Card>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SongEditor)