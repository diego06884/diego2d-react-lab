/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
const SearchResultsList = [
  {
    title: 'Tiny Dancer',
    artist: 'Elton John',
    album: 'Madman Across The Water'
  },
  {
    title: 'Tiny Dancer',
    artist: 'Elton John',
    album: 'Madman Across The Water'
  },
  {
    title: 'Tiny Dancer',
    artist: 'Elton John',
    album: 'Madman Across The Water'
  },
  {
    title: 'Tiny Dancer',
    artist: 'Elton John',
    album: 'Madman Across The Water'
  }
]

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const changeInput = (e) => {
    const inputValue = e.currentTarget.value;
    setSearchQuery(inputValue);
  }

  return (
    <div className="SearchBar">
          <input value={searchQuery} onChange={changeInput} placeholder="Enter A Song Title" />
          <a>SEARCH</a>
    </div>
    )
};

const Track = (props) => {
  const {title, artist, album} = props;
  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{title}</h3>
        <p>{artist} | {album}</p>
      </div>
      <a className="Track-action">+</a>
    </div>
  )
}
const TrackList = (props) => {
  const {tracks} = props;
  return (
    <div className="TrackList">  
      {tracks.map((track, index) => <Track key={index} title={track.title} artist={track.artist} album={track.title}/>)}
    </div>
  )
    
}
function App() {
  return (
    <div className="App">
        <SearchBar/>
        <div className="App-playlist">
          <div className="SearchResults">
            <h2>Results</h2>
            <TrackList tracks={SearchResultsList}/>
          </div>
          <div className="Playlist">
          <input value='New Playlist' />
              <TrackList tracks={SearchResultsList}/>
            <a className="Playlist-save">SAVE TO SPOTIFY</a>
          </div>
        </div>
      </div>
  );
}

export default App;
