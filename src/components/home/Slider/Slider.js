import React from 'react'
import Carousel from 'react-multi-carousel'
import { isBrowser, isTablet } from 'react-device-detect'
import Slide from '../Slide/Slide'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    paritialVisibilityGutter: 60
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    paritialVisibilityGutter: 50
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30
  }
}

const Slider = ({ slides = [] }) => {
  return (
    <Carousel
      ssr
      responsive={responsive}
      keyBoardControl={false}
      infinite
      autoPlay
      centerMode={isBrowser || isTablet}
    >
      {slides.map(({ name, image, action }) => 
        <Slide
          key={name}
          name={name}
          image={image}
          action={action}
        ></Slide>
      )}
    </Carousel>
  )
}

export default Slider