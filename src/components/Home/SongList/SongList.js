import React from 'react'
import Carousel from 'react-multi-carousel'
import SongItem from '../SongItem/SongItem'
import { responsive } from '../../../helpers/carousel'

const SongList = ({ songs = [], onPreview = f => f }) => 
  <Carousel
    ssr
    responsive={responsive}
    keyBoardControl={false}
  >
    {songs.map(song => 
      <SongItem 
        key={song.uuid} 
        onPreview={() => onPreview(song)}
        {...song} 
      />
    )}
  </Carousel>

export default SongList