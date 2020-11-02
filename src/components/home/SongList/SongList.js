import React from 'react'
import Carousel from 'react-multi-carousel'
import SongItem from '../SongItem/SongItem'
import { responsive } from '../../../helpers/carousel'
import useStyles from './SongListStyle'

const SongList = ({ songs = [], onPreview = f => f }) => {
  const classes = useStyles()
  return (
    <Carousel
      ssr
      responsive={responsive}
      keyBoardControl={false}
    >
      {songs.map(song => 
        <div
          key={song.uuid} 
          className={classes.songItemWrapper}
        >
          <SongItem 
            onPreview={() => onPreview(song)}
            {...song} 
          />
        </div>
      )}
    </Carousel>
  )
} 

export default SongList