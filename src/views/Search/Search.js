import React, { useState } from 'react'
import SearchTab from '../../components/SearchTab/SearchTab'

const Search = () => {
  const [tab, setTab] = useState(0)
  return (
    <>
      <SearchTab 
        tab={tab} 
        changeTab={setTab} 
      />
    </>
  )
}

export default Search