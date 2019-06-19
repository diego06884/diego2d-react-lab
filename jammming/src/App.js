/* eslint-disable jsx-a11y/anchor-is-valid */
import Spotify from './util/Spotify';
import React, {useState} from 'react';

const SearchResultsList = [
  {
    trackId: 'id1',
    title: 'Tiny Dancer',
    artist: 'Elton John',
    album: 'Madman Across The Water'
  },
  {
    trackId: 'id2',
    title: 'Tiny Dancer',
    artist: 'Elton John',
    album: 'Madman Across The Water'
  },
  {
    trackId: 'id3',
    title: 'Tiny Dancer',
    artist: 'Elton John',
    album: 'Madman Across The Water'
  },
  {
    trackId: 'id4',
    title: 'Tiny Dancer',
    artist: 'Elton John',
    album: 'Madman Across The Water'
  }
]

const SearchBar = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const changeInput = (e) => {
    const inputValue = e.currentTarget.value;
    setSearchQuery(inputValue);
  }

  const onSearchClick = (e) => {
    props.doSearchClick(searchQuery);
    setSearchQuery(''); 
  }

  return (
    <div className="SearchBar">
          <input value={searchQuery} onChange={changeInput} placeholder="Enter A Song Title" />
          <button className='btn btn-primary' type='button' onClick={onSearchClick}>SEARCH</button>
    </div>
    )
};

const Track = (props) => {
  
  const {trackId, title, artist, album, uri,  doAddToPlaylist} = props;
  const onTrackActionClick = (e) => {
    e.preventDefault();
    
    const newTrack = {
      trackId,
      title,
      album,
      artist,
      uri
    }

    doAddToPlaylist(newTrack);
  }
  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{title}</h3>
        <p>{artist} | {album}</p>
      </div>
      <a className="Track-action" onClick={onTrackActionClick}>+</a>
    </div>
  )
}
const TrackList = (props) => {
  const {tracks, addToPlaylist} = props;
  return (
    <div className="TrackList">  
      {tracks.map((track, index) => <Track doAddToPlaylist={addToPlaylist} key={track.trackId} trackId={track.trackId} title={track.title} artist={track.artist} album={track.title} uri={track.uri}/>)}
    </div>
  )
}

const Playlist = (props) => {
  const defaultName = 'New Playlist'
  const [playlistName, setPlaylistName] = useState(defaultName);
  const {tracks} =  props;

  const onNameChange = (e) => {
    setPlaylistName(e.currentTarget.value);
  }
  
  const onNameFocus = (e) =>{
    if (playlistName === defaultName) {
      setPlaylistName('');
    }
  }

  const onSavePlaylistClick = () => {
    props.doSavePlaylist(playlistName);
  }
  
  return (
    <div className="Playlist">
      <input onFocus={ onNameFocus} onChange={onNameChange} value={playlistName} />
      <TrackList tracks={tracks} />
      <a className="Playlist-save" onClick={onSavePlaylistClick}>SAVE TO SPOTIFY</a>
    </div>
  )
}

function App() {

  const [searchResults, setSearchResults] = useState([]);
  const [newPlaylist, setNewPlaylist] = useState([]);
  
  
  const doSearchClick = async (searchQuery) => {
    const newSearchResults = await Spotify.doSearchQuery(searchQuery);
    setSearchResults(newSearchResults);
  }
  

  //Add to playlist once
  const addToPlaylist = (newTrack) => {
    if (!newPlaylist.some((track) => {
      return track.trackId === newTrack.trackId;
    })) {
      setNewPlaylist([...newPlaylist, newTrack]);
    } else {
      alert('The playlist already has this song');
    }
  }

  //Add Playlist
  const savePlaylist = async (newPlaylistName) => {
    const confirmation = await Spotify.addPlaylist(newPlaylistName, newPlaylist);
    if (confirmation === 'ok') {
      alert('playlist saved!');
      setNewPlaylist([]);
    } else {
      alert('Something went wrong. Try again.');
    }
  }
  
  return (
    <div className="App">
        <SearchBar doSearchClick={doSearchClick}/>
        <div className="App-playlist">
          <div className="SearchResults">
            <h2>Results</h2>
            <TrackList tracks={searchResults} addToPlaylist={addToPlaylist}/>
          </div>
          <Playlist tracks={newPlaylist} doSavePlaylist={savePlaylist} />
        </div>
      </div>
  );
}

export default App;
