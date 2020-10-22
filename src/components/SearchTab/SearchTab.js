import React, { useState, useEffect } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const WIDTH_LIMIT = 768

const SearchTab = ({ tab, changeTab }) => {
  const [prevWidth, setPrevWidth] = useState(-1)
  const [isMobile, setMobile] = useState(false)

  useEffect(() => {
    const updateWidth = () => {
      const width = window.innerWidth  
      setPrevWidth(width)
      setMobile(width < WIDTH_LIMIT)
    }

    updateWidth()

    window.addEventListener('resize', updateWidth)

    return () => window.removeEventListener('resize', updateWidth)
    
  }, [prevWidth])

  return (
    <Tabs
      value={tab}
      onChange={(_, newTab) => changeTab(newTab)}
      indicatorColor="primary"
      textColor="primary"
      centered
      variant={isMobile ? 'fullWidth' : 'standard'}
    >
      <Tab label="Chords" />
      <Tab label="Artists" />
    </Tabs>
  )
}

export default SearchTab