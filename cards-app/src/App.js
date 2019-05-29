/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import {Cards} from './components/Cards';
import Form from './components/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [
        {
          "login": "diegoatverndale",
          "id": 6344192,
          "node_id": "MDQ6VXNlcjYzNDQxOTI=",
          "avatar_url": "https://avatars1.githubusercontent.com/u/6344192?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/diegoatverndale",
          "html_url": "https://github.com/diegoatverndale",
          "followers_url": "https://api.github.com/users/diegoatverndale/followers",
          "following_url": "https://api.github.com/users/diegoatverndale/following{/other_user}",
          "gists_url": "https://api.github.com/users/diegoatverndale/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/diegoatverndale/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/diegoatverndale/subscriptions",
          "organizations_url": "https://api.github.com/users/diegoatverndale/orgs",
          "repos_url": "https://api.github.com/users/diegoatverndale/repos",
          "events_url": "https://api.github.com/users/diegoatverndale/events{/privacy}",
          "received_events_url": "https://api.github.com/users/diegoatverndale/received_events",
          "type": "User",
          "site_admin": false,
          "name": "Diego Vergara",
          "company": "Verndale",
          "blog": "www.verndale.com",
          "location": null,
          "email": null,
          "hireable": null,
          "bio": "Front End Developer",
          "public_repos": 1,
          "public_gists": 0,
          "followers": 0,
          "following": 0,
          "created_at": "2014-01-07T23:23:27Z",
          "updated_at": "2018-11-27T14:59:31Z"
        },

        {
          "login": "diego06884",
          "id": 472724,
          "node_id": "MDQ6VXNlcjQ3MjcyNA==",
          "avatar_url": "https://avatars0.githubusercontent.com/u/472724?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/diego06884",
          "html_url": "https://github.com/diego06884",
          "followers_url": "https://api.github.com/users/diego06884/followers",
          "following_url": "https://api.github.com/users/diego06884/following{/other_user}",
          "gists_url": "https://api.github.com/users/diego06884/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/diego06884/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/diego06884/subscriptions",
          "organizations_url": "https://api.github.com/users/diego06884/orgs",
          "repos_url": "https://api.github.com/users/diego06884/repos",
          "events_url": "https://api.github.com/users/diego06884/events{/privacy}",
          "received_events_url": "https://api.github.com/users/diego06884/received_events",
          "type": "User",
          "site_admin": false,
          "name": "Diego",
          "company": null,
          "blog": "",
          "location": null,
          "email": null,
          "hireable": true,
          "bio": null,
          "public_repos": 15,
          "public_gists": 0,
          "followers": 0,
          "following": 2,
          "created_at": "2010-11-08T16:49:01Z",
          "updated_at": "2019-05-14T04:17:24Z"
        }
      ]
    }
  }
  
  updateProfiles = async (profileName) => {
    const resp = await fetch(`http://api.github.com/users/${profileName}`);
    const newUserProfile = await resp.json();
    this.setState((prevState)=> {
      return {
        profiles: [...prevState.profiles, newUserProfile]
        
      }
    })
  }

  render () {
    return (
      <div className="container">
        <div className="App">
          <div className="row">
            <header className="App-header col">
              <h1 className="app-title">Github user cards</h1>
            </header>
          </div>
          <div className="row mb-3">
            <Form doUpdateProfiles={this.updateProfiles}/>
          </div>
          <div className="row">
            <Cards profiles={this.state.profiles} />
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;
