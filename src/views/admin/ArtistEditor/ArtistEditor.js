import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { validateArtistForm } from '../../../validators'
import { upload, create, findById, update } from '../../../api/artists'
import { SET_ADMIN_ARTISTS_CHANGED } from '../../../constants/actionTypes'
import useStyles from './ArtistEditorStyle'

const mapStateToProps = state => ({
  loading: state.loading,
})

const mapDispatchToProps = dispatch => ({
  setChanged: changed => dispatch({ type: SET_ADMIN_ARTISTS_CHANGED, payload: changed })
})

const ArtistEditor = ({ loading, setChanged, history, match }) => {
  const classes = useStyles()

  const artistId = match.params.id

  const [file, setFile] = useState(undefined)
  const [pictureUrl, setPictureUrl] = useState(undefined)
  const [form, setForm] = useState({
    name: '',
    slug: '',
    picture: undefined,
  })
  const [errors, setErrors] = useState({
    name: '',
    slug: '',
  })

  useEffect(() => {
    let mounted = true
    if (artistId) {
      findById(artistId).then(({ name, slug, picture }) => {
          if (mounted) {
            setForm({ name, slug })
            setPictureUrl(picture)
          }
        })
    }
    return () => mounted = false
  }, [artistId])

  const handleInputChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handlePicUpload = e => {
    const upload = e.target.files[0]
    setFile(upload)
    setPictureUrl(upload 
      ? URL.createObjectURL(upload) 
      : undefined
    )
  } 

  const handleError = _errors => ({ response }) => {
    if (response && response.status === 422) {
      if (response.data && response.data.message === 'slug already exists') {
        setErrors({ ..._errors, slug: response.data.message })
      }
    }
  }

  const handleSubmit = async () => {
    const _errors = validateArtistForm(form)
    setErrors(_errors)

    const isValid = Object.values(_errors).every(err => !err)
    if (isValid) {
      let uploaded
      if (file) {
        try {
          const res = await upload(file)
          uploaded = res.file ?? undefined
        } catch (err) {
          // handle error later
          console.log(err)
          return
        }
      }
      
      if (artistId) {
        update(artistId, { ...form, picture: uploaded })
          .then(() => {
            setChanged(true)
            history.push('/admin/artists')
          })
          .catch(handleError(_errors))
      } else {
        create({ ...form, picture: uploaded })
          .then(() => {
            setChanged(true)
            history.push('/admin/artists')
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
        Create New Artist
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
            name="name"
            variant="outlined"
            label="Name"
            size="small"
            fullWidth
            value={form.name}
            onChange={handleInputChange}
            helperText={errors.name}
            error={!!errors.name}
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
          <input
            id="upload-pic"
            accept="image/*"
            className={classes.upload}
            type="file"
            onChange={handlePicUpload}
            disabled={loading}
          />
          <label htmlFor="upload-pic">
            <Button
              variant="outlined"
              color="primary"
              component="span"
              disabled={loading}
              size="small"
            >
              Upload Picture
            </Button>
          </label>
          <br/>
          <img
            alt={pictureUrl ?? 'artist picture'}
            src={pictureUrl ?? `${window.location.origin}/placeholder.png`}
            className={classes.picture}
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
            onClick={() => history.push('/admin/artists')}
            disabled={loading}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Card>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistEditor)