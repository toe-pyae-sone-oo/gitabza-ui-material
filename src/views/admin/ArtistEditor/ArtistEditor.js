import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { validateArtistForm } from '../../../validators'
import { upload, create } from '../../../api/artists'
import useStyles from './ArtistEditorStyle'

const ArtistEditor = ({ history }) => {
  const classes = useStyles()

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
      
      create({ ...form, picture: uploaded })
        .then(() => history.push('/admin/artists'))
        .catch(handleError(_errors))
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
          />
          <label htmlFor="upload-pic">
            <Button
              variant="outlined"
              color="primary"
              component="span"
            >
              Upload Picture
            </Button>
          </label>
          <br/>
          <img
            src={pictureUrl ?? `${window.location.origin}/logo192.png`}
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
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="default"
            className={classes.cancel}
            onClick={() => history.push('/admin/artists')}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Card>
  )
}

export default ArtistEditor