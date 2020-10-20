export const getCapo = i => {
  switch (i) {
    case 1: return '1st fret'
    case 2: return '2nd fret'
    case 3: return '3rd fret'
    default: return `${i}th fret`
  }
}

export const getVideoId = link => {
  const url = new URL(link)
  const q = url.searchParams
  return q.get('v')
}