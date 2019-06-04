/* eslint-disable jsx-a11y/anchor-is-valid */
import Spotify from './util/Spotify';
import React, {useState} from 'react';

const SearchResultsList = [
  {
    id: 'id1',
    title: 'Tiny Dancer',
    artist: 'Elton John',
    album: 'Madman Across The Water'
  },
  {
    id: 'id2',
    title: 'Tiny Dancer',
    artist: 'Elton John',
    album: 'Madman Across The Water'
  },
  {
    id: 'id3',
    title: 'Tiny Dancer',
    artist: 'Elton John',
    album: 'Madman Across The Water'
  },
  {
    id: 'id4',
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
  const {title, artist, album} = props;
  const onTrackActionClick = (e) => {
    e.preventDefault();
    
  }
  return (
    <div  className="Track">
      <div className="Track-information">
        <h3>{title}</h3>
        <p>{artist} | {album}</p>
      </div>
      <a className="Track-action" onClick="onTrackActionClick">+</a>
    </div>
  )
}
const TrackList = (props) => {
  const {tracks} = props;
  return (
    <div className="TrackList">  
      {tracks.map((track, index) => <Track key={track.id} title={track.title} artist={track.artist} album={track.title}/>)}
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
  
  
  return (
    <div className="App">
        <SearchBar doSearchClick={doSearchClick}/>
        <div className="App-playlist">
          <div className="SearchResults">
            <h2>Results</h2>
            <TrackList tracks={searchResults}/>
          </div>
          <div className="Playlist">
          <input value='New Playlist' />
              <TrackList tracks={newPlaylist}/>
            <a className="Playlist-save">SAVE TO SPOTIFY</a>
          </div>
        </div>
      </div>
  );
}

export default App;
