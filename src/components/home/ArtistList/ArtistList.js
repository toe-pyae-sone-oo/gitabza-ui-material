import React from 'react'
import Carousel from 'react-multi-carousel'
import ArtistItem from '../ArtistItem/ArtistItem'
import { responsive } from '../../../helpers/carousel'

const ArtistList = ({ artists = [], onPreview = f => f }) => 
  <Carousel
    ssr
    responsive={responsive}
    keyBoardControl={false}
  >
    {artists.map(artist => 
      <ArtistItem 
        key={artist.uuid} 
        onPreview={() => onPreview(artist)}
        {...artist} 
      />
    )}
  </Carousel>
  

export default ArtistList