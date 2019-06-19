
import { stringify } from "querystring";
import {
    getHashParams,
    generateRandomString
} from "./index";


const clientId = '';
const redirectURI = 'http://localhost:3000';
const authorizeEndpoint = 'https://accounts.spotify.com/authorize';
const SpotifyApiURL = 'https://api.spotify.com/v1';
const searchEndpoint = '/search';
const userEndpoint= '/me';
const stateKey = 'spotify_auth_state';
let userId = "";

//get queryparams (token and state)
const queryParams = getHashParams();

const {
    access_token: token,
    token_type,
    state
} = queryParams;

//Implement Implicit Grant
const Spotify = {

    async doSearchQuery(queryToSpotify) {


        //If there is token
        if (token) {
            //If there state is consistent with stored state
            if (localStorage.getItem(stateKey) === state){
                //Do query and return result
                    const searchQuery = stringify({
                        q: queryToSpotify,  
                        type: 'track',
                        limit: 10
                    });

                    const response = await fetch(`${SpotifyApiURL}${searchEndpoint}?${searchQuery}`, {
                        method: 'GET',
                        headers : {
                            'Authorization': `${token_type} ${token}`
                        }
                    });

                    const jsonResponse = await response.json();
                    
                    const processedTracks = jsonResponse.tracks.items.map((track)=> {
                        const processedTrack = {
                            trackId: track.id,
                            title: track.name,
                            album: track.album.name,
                            artist: track.artists.map(artist => artist.name).join(', '),
                            uri: track.uri
                        }
                        return processedTrack;
                    });
                    return processedTracks;
                }
            // TODO: else
                //return authentication error
        } else {
            // else if token is not set, authorize to get token
            const stateVal = generateRandomString(16);

            //remove old state and generate new state
            try {
                localStorage.removeItem(stateKey);
                //save state to localStorage
                localStorage.setItem(stateKey, stateVal);

            } catch (error) {
                console.log('could generate new state and save to local storage:', error)
            }
            //generate authorization query
            const queryString = stringify({
                client_id: clientId,
                response_type: 'token',
                redirect_uri: redirectURI,
                state: stateVal,
                scope: 'playlist-modify-private'
            });
            //do redirect
            window.location.replace(`${authorizeEndpoint}?${queryString}`);
        }
    },

    async addPlaylist(playlistName, playlistTracks) {
        //CHECK IF WE HAVE USER ID
        if (userId === '') {
            //Try to get user id
            await this.getUserId();
        }
        //Try to create new Playlist
        const createPlaylistResponse =  await fetch(`${SpotifyApiURL}/users/${userId}/playlists`,{
            method: 'POST',
            headers: {
                'Authorization': `${token_type} ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: playlistName,
                public: false
            })
        });
        const newPlaylistInfo = await createPlaylistResponse.json();
        if (newPlaylistInfo.error)
        {
            console.error(newPlaylistInfo.error.message);
        } else {
            const newPlaylistId = newPlaylistInfo.id;
            //Add tracks to new playlist
            const tracksToAdd = playlistTracks.map(track => track.uri);
            
            const addTracksResponse = await fetch(`${SpotifyApiURL}/playlists/${newPlaylistId}/tracks`, {
                method: 'POST',
                headers: {
                    'Authorization': `${token_type} ${token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    uris: tracksToAdd
                })
            });
            const addTracksJson = await addTracksResponse.json();
            if (addTracksJson.error) {
                console.error(addTracksJson.error.message);
                return addTracksJson.error.message;
            } else {
                return 'ok';
            }
        }
    },

    async getUserId() {

        if (token) {
            const userResponse = await fetch(`${SpotifyApiURL}${userEndpoint}`, {
                headers: {
                    'Authorization': `${token_type} ${token}`
                }
            });
            const userInfo = await userResponse.json();
            console.log(userInfo);
            userId = userInfo.id;
        } else {
            console.error('Missing authentication token')
        }
    }
}
export default Spotify;