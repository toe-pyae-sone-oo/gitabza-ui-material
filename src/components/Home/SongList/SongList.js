import React from 'react'
import Carousel from 'react-multi-carousel'
import SongItem from '../SongItem/SongItem'
import { responsive } from '../../../helpers/carousel'

const SongList = ({ songs = [] }) => 
  <Carousel
    ssr
    responsive={responsive}
    keyBoardControl={false}
  >
    {songs.map(song => 
      <SongItem 
        key={song.uuid} 
        {...song} 
      />
    )}
  </Carousel>

export default SongList