import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { 
  Container, 
  Row, 
  Col, 
  InputGroup, 
  FormControl, 
  DropdownButton, 
  Dropdown, 
  Button,
  Card, 
  Image,
} from 'react-bootstrap'
import * as _ from 'lodash'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { LOAD_LATEST_SONGS, LOAD_LATEST_ARTISTS } from '../../constants/actionTypes'
import { getLatest as getLatestSongs } from '../../api/songs'
import { getLatest as getLatestArtists } from '../../api/artists'
import './Home.css'

const mapStateToProps = state => ({
  songs: state.home.songs,
  artists: state.home.artists,
  loading: state.loading,
})

const mapDispatchToProps = dispatch => ({
  loadSongs: songs => dispatch({ type: LOAD_LATEST_SONGS, payload: songs }),
  loadArtists: artists => dispatch({ type: LOAD_LATEST_ARTISTS, payload: artists }),
})

const SongItem = ({ title = '', artists = [] }) => 
  <div className="Home__song-item py-0">
    <h6 className="m-0">{title}</h6>
    <small className="text-secondary">{_.join(artists, ', ')}</small>
  </div>

const SongList = ({ songs = [] }) => 
  <Row>
    {songs.length > 0 
      ? songs.map(song =>
          <Col key={song.uuid} md={6}>
            <SongItem key={song.uuid} {...song} />
          </Col>
        )
      : 'No songs'
    }
  </Row>

const YoutubeSongItem = ({ title = '', image = '' }) =>
  <div className="Home__youtube-song-item">
    <Image rounded src={image} className="Home__youtube-song-item__image" />
    <br/>
    <small className="text-secondary">{title}</small>
  </div>

const YoutubeSongList = ({ songs = [] }) =>
  <Row>
    {songs.length > 0
      ? _.chunk(songs.filter(song => !!song.image), 4)
          .map(songChunk => songChunk.map(song =>
            <Col key={song.uuid} md={3}>
              <YoutubeSongItem key={song.uuid} {...song} />
            </Col>
          ))
      : <Col></Col>
    }
  </Row>

const ArtistItem = ({ name = '' }) => 
  <div className="Home__artist-item">
    <h6 className="m-0">{name}</h6>
  </div>

const ArtistList = ({ artists = [] }) =>
  <Row>
    {artists.length > 0
      ? artists.map(artist =>
          <Col key={artist.uuid} xs={12}>
            <ArtistItem {...artist} />
          </Col>
        )
      : 'No artists'
    }
  </Row>

const Home = ({ songs, artists, loadSongs, loadArtists, loading }) => {

  useEffect(() => {
    getLatestSongs().then(loadSongs)
  }, [loadSongs])

  useEffect(() => {
    getLatestArtists().then(loadArtists)
  }, [loadArtists])

  return (
    <Container className="p-3">
      <Row>
        <Col>
          <InputGroup>
            <InputGroup.Prepend>
              <DropdownButton
                as={InputGroup.Prepend}
                variant="dark"
                title="Chords"
              >
                <Dropdown.Item>Chords</Dropdown.Item>
                <Dropdown.Item>Artists</Dropdown.Item>
              </DropdownButton>
            </InputGroup.Prepend>
            <FormControl 
              placeholder="What are you looking for?" 
              className="Home__search"
            />
            <InputGroup.Append>
              <Button variant="dark">Search</Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col md="8" className="p-3">
          <h3>Welcome to Gita B Za | Guitar Chords Library For Myanmar Songs</h3>
          <p className="Home__description">ဂီတဗီဇ ဝက်ဘ်ဆိုက်သည် မြန်မာသီချင်း လက်ကွက်များကို တနေရာထဲတွင် လွယ်ကူစွာ ရှာဖွေလို့ရရန် လုပ်ဆောင်ပေးထားသော နေရာတစ်ခုဖြစ်ပါသည်။ မြန်မာသီချင်း လက်ကွက်များကို ယခုပဲရှာဖွေလိုက်ပါ။</p>
          <Card>
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon icon={faMusic} />{' '}
                Latest Update
              </Card.Title>
              {loading 
                ? 'Loading...' 
                : <>
                    <SongList songs={songs} />
                    <br/>
                    <YoutubeSongList songs={songs} />
                  </>
              }
            </Card.Body>
          </Card>
        </Col>
        <Col md="4" className="p-3">
          <Card>
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon icon={faMicrophone} />{' '}
                Latest Artists
              </Card.Title>
              {loading
                ? 'Loading...'
                : <ArtistList artists={artists} />
              }
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)