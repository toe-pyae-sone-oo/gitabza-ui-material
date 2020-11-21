import React from 'react'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import useStyles from './ArtistItemStyle'

const ArtistItem = ({ picture, name, songs, onPreview = f => f }) => {
  const classes = useStyles()

  return (
    <Card 
      variant="outlined"
      className={classes.root}
      onClick={onPreview}
    >
      <CardMedia
        image={picture ?? '"http://localhost:3001/uploads/2020-10-29-7472b173-58fb-4ecd-8d2c-9c8b49a1ab7e.png"'}
        title={name}
        className={classes.avatar}
      ></CardMedia>
      <CardContent>
        <Typography
          className={classes.name}
        >
          {name}
        </Typography>
        <Typography
          className={classes.songs}
        >
          သီချင်း: {songs}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ArtistItem
