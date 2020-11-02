import React from 'react'
import Carousel from 'react-multi-carousel'
import GenresItem from '../GenresItem/GenresItem'
import { responsive } from '../../../helpers/carousel'
import useStyles from './GenresListStyle'

const GenresList = ({ 
  genres = [], 
  onPreview = f => f,
}) => {
  const classes = useStyles()
  return (
    <Carousel
      ssr
      responsive={responsive}
      keyBoardControl={false}
    >
      {genres.map(genre => 
        <div
          key={genre.value} 
          className={classes.genresItemWrapper}
        >
          <GenresItem 
            onPreview={() => onPreview(genre.value)}
            {...genre} 
          />
        </div>
      )}
    </Carousel>
  )
}

export default GenresList