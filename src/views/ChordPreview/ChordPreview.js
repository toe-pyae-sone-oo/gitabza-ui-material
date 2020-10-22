import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Avatar from '@material-ui/core/Avatar'
import Fab from '@material-ui/core/Fab'
import MicIcon from '@material-ui/icons/Mic'
import YoutubeIcon from '@material-ui/icons/YouTube'
import InfoIcon from '@material-ui/icons/Info'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import PlayIcon from '@material-ui/icons/PlayArrow'
import FormatSizeIcon from '@material-ui/icons/FormatSize'
import Youtube from 'react-youtube'
import Title from '../../components/Title/Title'
import { findById } from '../../api/songs'
import { wrapChords, tranpsoseSong } from '../../helpers/chords'
import { getVideoId } from '../../helpers/songs'
import useStyles from './ChordPreviewStyle'

const mapStateToProps = state => ({
  loading: state.loading,
})

let scroll = false

const ChordPreview = ({ loading, match }) => {
  const classes = useStyles()

  const songId = match.params.id

  const [song, setSong] = useState(undefined)
  const [fontSize, setFontSize] = useState(14)
  const [scrolling, setScrolling] = useState(false)

  useEffect(() => {
    findById(songId).then(data => setSong(data))
  }, [setSong, songId])

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

  return (
    <Grid 
      container 
      spacing={2}
    >
      {loading 
        ? <p>Loading...</p>
        : song
          ? <>
              <Grid 
                item 
                md={9} 
                xs={12}
              >
                <Typography 
                  variant="h5"
                  className={classes.songTitle}
                >
                  {song.title}
                </Typography>
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
                <Card
                  variant="outlined"
                  className={classes.youtubeCard}
                >
                  <CardContent>
                    <Title 
                      icon={<YoutubeIcon/>}
                      content="Youtube"
                    />
                    <Youtube
                      videoId={getVideoId(song.youtube)}
                      className={classes.youtube}
                    />
                  </CardContent>
                </Card>
                <Card
                  variant="outlined"
                  className={classes.infoCard}
                >
                  <CardContent>
                    <Title 
                      icon={<InfoIcon/>}
                      content="Info"
                    />
                    <Grid
                      container
                      spacing={2}
                    >
                      <Grid 
                        item 
                        xs={6}
                      >
                        <Typography 
                          variant="caption"
                          display="block"
                          className={classes.textCenter}
                          color="textSecondary"
                        >
                          Version
                        </Typography>
                        <Typography 
                          variant="body2"
                          className={classes.textCenter}
                        >
                          {song.version}
                        </Typography>
                      </Grid>
                      <Grid 
                        item 
                        xs={6}
                      >
                        <Typography 
                          variant="caption"
                          display="block"
                          className={classes.textCenter}
                          color="textSecondary"
                        >
                          Difficulty
                        </Typography>
                        <Typography 
                          variant="body2"
                          className={classes.textCenter}
                        >
                          {song.difficulty === 'none' ? '-' : song.difficulty}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                <Card
                  variant="outlined"
                  className={classes.artistsCard}
                >
                  <CardContent>
                    <Title 
                      icon={<MicIcon/>}
                      content="Artists"
                    />
                    {song.artists.map(artist =>
                      <Grid
                        item
                        key={artist.uuid}
                        xs={12}
                      >
                        <div className={classes.artistWrapper}>
                          <div className={classes.avatarWrapper}>
                            <Avatar
                              className={classes.avatar} 
                              alt={artist.name}
                              src={artist.picture}
                            />
                          </div>
                          <Typography 
                            className={classes.artists}
                            variant="subtitle1"
                          >
                            {artist.name}
                          </Typography>
                        </div>
                      </Grid>
                    )}
                  </CardContent>
                </Card>
                <Fab 
                  aria-label="scroll" 
                  className={classes.mobileAutoScroll} 
                  color={scrolling ? 'primary' : 'default'}
                  size="small"
                  onClick={handleScroll}
                >
                  <PlayIcon />
                </Fab>
              </Grid>
            </>
          : <p>Not found</p>
      }
    </Grid>
  )
}

export default connect(mapStateToProps)(ChordPreview)