import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Avatar from '@material-ui/core/Avatar'
import MicIcon from '@material-ui/icons/Mic'
import YoutubeIcon from '@material-ui/icons/YouTube'
import InfoIcon from '@material-ui/icons/Info'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import Youtube from 'react-youtube'
import Title from '../../components/Title/Title'
import { findById } from '../../api/songs'
import { wrapChords } from '../../helpers/chords'
import { getVideoId } from '../../helpers/songs'
import useStyles from './ChordPreviewStyle'

const mapStateToProps = state => ({
  loading: state.loading,
})

const ChordPreview = ({ loading, match }) => {
  const classes = useStyles()

  const songId = match.params.id

  const [song, setSong] = useState(undefined)

  useEffect(() => {
    findById(songId).then(data => setSong(data))
  }, [setSong, songId])

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
                lg={9} 
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
                          className={classes.transponseAction}
                          size="small" 
                        >
                          Transpose
                        </Button>
                        <Button size="small">
                          <ArrowDownwardIcon 
                            className={classes.action} 
                            fontSize="small" 
                          />
                        </Button>
                        <Button size="small">
                          <ArrowUpwardIcon 
                            className={classes.action} 
                            fontSize="small" 
                          />
                        </Button>
                      </ButtonGroup>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Button 
                        variant="outlined" 
                        color="default"
                        fullWidth
                        size="small" 
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
                          className={classes.fontAction}
                        >
                          Font
                        </Button>
                        <Button size="small">
                          <RemoveIcon 
                            className={classes.action} 
                            fontSize="small" 
                          />
                        </Button>
                        <Button size="small">
                          12
                        </Button>
                        <Button size="small">
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
                  variant="outlined"
                  className={classes.lyricsCard}
                >
                  <CardContent 
                    className={classes.lyricsWrapper}
                  >
                    <pre className={classes.lyrics}>
                      {wrapChords(song.lyrics, (match, i) =>
                        <span key={match + i} className={classes.code}>{match}</span>
                      )}
                    </pre>
                  </CardContent>
                </Card>
              </Grid>
              <Grid
                item
                lg={3}
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
              </Grid>
            </>
          : <p>Not found</p>
      }
    </Grid>
  )
}

export default connect(mapStateToProps)(ChordPreview)