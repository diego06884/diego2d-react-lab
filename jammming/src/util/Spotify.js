
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
const stateKey = 'spotify_auth_state';

//Implement Implicit Grant
const Spotify = {
    async doSearchQuery(queryToSpotify) {

        //get queryparams (token and state)
        const queryParams = getHashParams();
        
        const {
            access_token: token,
            token_type,
            state
        } = queryParams;

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
                            id: track.id,
                            title: track.name,
                            album: track.album.name,
                            artist: track.artists.map(artist => artist.name).join(', ')
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
                state: stateVal
            });
            //do redirect
            window.location.replace(`${authorizeEndpoint}?${queryString}`);
        }
    }
}
export default Spotify;