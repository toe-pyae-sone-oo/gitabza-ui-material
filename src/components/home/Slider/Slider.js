import React from 'react'
import Carousel from 'react-multi-carousel'
import { isBrowser, isTablet } from 'react-device-detect'
import useStyles from './SliderStyle'

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

const Slider = () => {
  const classes = useStyles()

  return (
    <Carousel
      ssr
      responsive={responsive}
      keyBoardControl={false}
      infinite
      autoPlay
      centerMode={isBrowser || isTablet}
    >
      <div className={classes.slide}>
        <img
          className={classes.slideImage}
          alt="slide1"
          src={`${process.env.PUBLIC_URL}/home_slider/W01_S1.jpg`}
        />
      </div>
      <div className={classes.slide}>
        <img
          className={classes.slideImage}
          alt="slide2"
          src={`${process.env.PUBLIC_URL}/home_slider/W01_S2.jpg`}
        />
      </div>
      <div className={classes.slide}>
        <img
          className={classes.slideImage}
          alt="slide3"
          src={`${process.env.PUBLIC_URL}/home_slider/W01_S3.jpg`}
        />
      </div>
    </Carousel>
  )
}

export default Slider