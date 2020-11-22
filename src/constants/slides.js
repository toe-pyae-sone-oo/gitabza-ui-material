export const SLIDES = history => {
  return [
    {
      name: 'Slide 1',
      image: `${process.env.PUBLIC_URL}/home_slider/W01_S1.jpg`,
      action: () => history.push('/artists/kyar-pauk')
    },
    {
      name: 'Slide 2',
      image: `${process.env.PUBLIC_URL}/home_slider/W01_S2.jpg`,
      action: () => history.push('/artists/eternal-gosh')
    },
    {
      name: 'Slide 3',
      image: `${process.env.PUBLIC_URL}/home_slider/W01_S3.jpg`,
      action: () => history.push('/artists/ah-nge')
    }
  ]
}