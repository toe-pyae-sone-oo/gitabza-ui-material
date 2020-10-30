import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Fab from '@material-ui/core/Fab'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import PlayIcon from '@material-ui/icons/PlayArrow'
import FormatSizeIcon from '@material-ui/icons/FormatSize'
import Youtube from 'react-youtube'
import Loading from '../../components/Loading/Loading'
import NotFound from '../../components/NotFound/NotFound'
import SongItem from '../../components/home/SongItem/SongItem'
import Chord from '../../components/Chord/Chord'
import { getLatest, findBySlug } from '../../api/songs'
import { wrapChords, tranpsoseSong, extractChords, getChordPositions } from '../../helpers/chords'
import { getVideoId } from '../../helpers/songs'
import useStyles from './ChordPreviewStyle'

const mapStateToProps = state => ({
  loading: state.loading,
})

const instruments = ['guitar', 'ukulele']

let scroll = false

const ChordPreview = ({ loading, match, history }) => {
  const classes = useStyles()

  const { 
    artist: artistSlug,
    song: songSlug,
  } = match.params

  const [song, setSong] = useState(undefined)
  const [fontSize, setFontSize] = useState(14)
  const [scrolling, setScrolling] = useState(false)
  const [error, setError] = useState(undefined)
  const [others, setOthers] = useState([])
  const [chordPositions, setChordPositions] = useState({})
  const [currentChordPos, setCurrentChordPos] = useState({})
  const [currentTab, setCurrentTab] = useState(0) // 0 => guitar, 1 => ukulele

  const handleError = err => {
    if (err.response && err.response.status === 404) {
      setError('Song Not Found')
    }
  }

  useEffect(() => {
    if (artistSlug && songSlug) {
      findBySlug(artistSlug, songSlug)
        .then(setSong)
        .catch(handleError)
    }
  }, [artistSlug, songSlug]) 

  useEffect(() => {
    getLatest()
      .then(data => setOthers(
        [...data.filter(s => s.slug !== songSlug).slice(0, 8)]
      )) 
  }, [songSlug])

  useEffect(() => {
    if (song) {
      const chords = extractChords(song.lyrics, instruments[currentTab])
      const positions = getChordPositions(chords, instruments[currentTab])
      setChordPositions(positions)

      const currentPos = {}
      Object.keys(positions).forEach(key => {
        currentPos[key] = 0
      })
      setCurrentChordPos(currentPos)
    }
  }, [song, currentTab])

  const handleTranspose = step => {
    const lyrics = tranpsoseSong(song.lyrics, step)
    setSong({
      ...song,
      lyrics,
    })
  }

  const handleFontSize = size => {
    const newSize = fontSize + size
    if (newSize >= 8 && newSize <= 32) {
      setFontSize(newSize)
    }
  }

  const pageScroll = () => {
    if (!scroll) return false
    window.scrollBy(0, 1)
    setTimeout(pageScroll, 100)
  }

  const handleScroll = () => {
    scroll = !scroll
    if (scroll) {
      pageScroll()
    }
    setScrolling(scroll)
  }

  const changeCurrentChordPos = (key, step) => {
    const total = chordPositions[key].length
    let current = currentChordPos[key] + step
    if (current < 0) {
      current = total - 1
    } else if (current >= total) {
      current = 0
    }
    setCurrentChordPos({
      ...currentChordPos,
      [key]: current,
    })
  }

  return (
    <Grid 
      container 
      spacing={2}
    >
      {error && <NotFound message={error} />}
      {loading 
        ? <Loading />
        : song &&
            <>
              <Grid 
                item 
                md={9} 
                xs={12}
              >
                <div className={classes.songInfo}>
                  <Typography 
                    variant="h5"
                    className={classes.title}
                  >
                    {song.title}
                  </Typography>
                  <Typography
                    variant="caption"
                  >
                    by{' '}
                    <span 
                      className={classes.artists}
                    >
                      {song.artists.map(({ name }) => name).join(', ')}
                    </span>
                  </Typography>
                  <Typography
                    variant="caption"
                  >
                    Difficulty:{' '}
                    <span className={classes.difficulty}>
                      {song.difficulty}
                    </span>
                    {' '}
                    Version:{' '}
                    <span className={classes.version}>
                      {song.version}
                    </span>
                  </Typography>
                </div>
                <Card 
                  className={classes.actionCard}
                  variant="outlined"
                >
                  <Grid 
                    container
                    spacing={2}
                  >
                    <Grid item xs={12} md={4}>
                      <ButtonGroup 
                        color="default" 
                        aria-label="outlined primary button group"
                        fullWidth
                      >
                        <Button 
                          className={
                            `${classes.transponseAction} ${classes.actionTitle}`
                          }
                          size="small" 
                        >
                          Transpose
                        </Button>
                        <Button 
                          size="small"
                          onClick={() => handleTranspose(-1)}
                        >
                          <ArrowDownwardIcon 
                            className={classes.action} 
                            fontSize="small" 
                          />
                        </Button>
                        <Button 
                          size="small"
                          onClick={() => handleTranspose(1)}
                        >
                          <ArrowUpwardIcon 
                            className={classes.action} 
                            fontSize="small" 
                          />
                        </Button>
                      </ButtonGroup>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Button 
                        variant={scrolling ? 'contained' : 'outlined'} 
                        color={scrolling ? 'primary' : 'default'}
                        fullWidth
                        size="small" 
                        onClick={handleScroll}
                        disableElevation
                      >
                        Auto Scroll
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <ButtonGroup 
                        color="default" 
                        aria-label="outlined primary button group"
                        fullWidth
                      >
                        <Button 
                          size="small" 
                          className={
                            `${classes.fontAction} ${classes.actionTitle}`
                          }
                        >
                          Font
                        </Button>
                        <Button 
                          size="small"
                          onClick={() => handleFontSize(-1)}
                        >
                          <RemoveIcon 
                            className={classes.action} 
                            fontSize="small" 
                          />
                        </Button>
                        <Button 
                          size="small"
                          className={classes.actionTitle}
                        >
                          {fontSize}
                        </Button>
                        <Button 
                          size="small"
                          onClick={() => handleFontSize(1)}
                        >
                          <AddIcon 
                            className={classes.action}
                            fontSize="small" 
                          />
                        </Button>
                      </ButtonGroup>
                    </Grid>
                  </Grid>
                </Card>
                <Card
                  className={classes.mobileActionCard}
                  variant="outlined"
                >
                  <ButtonGroup
                    color="default"
                    aria-label="outlined primary button group"
                    fullWidth
                  >
                    <Button
                      size="small"
                      className={classes.actionTitle}
                    >
                      <MusicNoteIcon fontSize="small" />
                    </Button>
                    <Button
                      size="small"
                      className={classes.action}
                      onClick={() => handleTranspose(-1)}
                    >
                      <ArrowDownwardIcon fontSize="small" />
                    </Button>
                    <Button
                      size="small"
                      className={classes.action}
                      onClick={() => handleTranspose(1)}
                    >
                      <ArrowUpwardIcon fontSize="small" />
                    </Button>
                    <Button
                      size="small"
                      className={classes.actionTitle}
                    >
                      <FormatSizeIcon fontSize="small" />
                    </Button>
                    <Button
                      size="small"
                      className={classes.action}
                      onClick={() => handleFontSize(-1)}
                    >
                      <RemoveIcon fontSize="small" />
                    </Button>
                    <Button
                      size="small"
                      className={classes.actionTitle}
                    >
                      {fontSize}
                    </Button>
                    <Button
                      size="small"
                      className={classes.action}
                      onClick={() => handleFontSize(1)}
                    >
                      <AddIcon fontSize="small" />
                    </Button>
                  </ButtonGroup>
                </Card>
                <Card 
                  variant="outlined"
                  className={classes.lyricsCard}
                >
                  <CardContent 
                    className={classes.lyricsWrapper}
                  >
                    <Tabs
                      value={currentTab}
                      onChange={(e, value) => setCurrentTab(value)}
                      indicatorColor="primary"
                      className={classes.instrumentTab}
                    >
                      <Tab label="Guitar" />
                      <Tab label="Ukulele" />
                    </Tabs>
                    <Grid
                      container
                      spacing={1}
                    >
                      {Object.keys(chordPositions).map(key => 
                        <Grid
                          key={key} 
                          item
                        >
                          <Chord 
                            chordKey={key}
                            chord={chordPositions[key][currentChordPos[key]]} 
                            total={chordPositions[key].length}
                            position={currentChordPos[key] + 1}
                            instrument={instruments[currentTab]}
                            onLeft={() => changeCurrentChordPos(key, -1)}
                            onRight={() => changeCurrentChordPos(key, 1)}
                          />
                        </Grid>
                      )}
                    </Grid>
                    <pre style={{ fontSize }}>
                      {wrapChords(song.lyrics, (match, i) =>
                        <span key={match + i} className={classes.code}>{match}</span>
                      )}
                    </pre>
                  </CardContent>
                </Card>
              </Grid>
              <Grid
                item
                md={3}
                xs={12}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                >
                  Youtube
                </Typography>
                <Youtube
                  videoId={getVideoId(song.youtube)}
                  className={classes.youtube}
                /> 
                <Typography
                  variant="h6"
                  gutterBottom
                  className={classes.otherSongsTitle}
                >
                  You may also like
                </Typography>
                <Grid
                  container
                  spacing={1}
                >
                  {others.map(song => 
                    <Grid
                      key={song.uuid}
                      item
                      xs={6}
                    >
                      <SongItem 
                        onPreview={() => 
                          history.push(`/chords/${song.artists[0].slug}/${song.slug}`)}
                        {...song} 
                      />
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Fab 
                aria-label="scroll" 
                className={classes.mobileAutoScroll} 
                color={scrolling ? 'primary' : 'default'}
                size="small"
                onClick={handleScroll}
              >
                <PlayIcon 
                  className={
                    scrolling 
                      ? classes.mobileAutoScrollIcon 
                      : null
                  } 
                />
              </Fab>
            </>
      }
    </Grid>
  )
}

export default connect(mapStateToProps)(ChordPreview)