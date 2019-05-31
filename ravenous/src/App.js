import React, { Component } from 'react';
import './App.css';
import Yelp from './util/Yelp';
import BusinessList from './components/BusinessList/BusinessList';
import Searchbar from './components/SearchBar/SearchBar';

// const business = {
//   imageSrc: 'https://s3.amazonaws.com/codecademy-content/programs/react/ravenous/pizza.jpg',
//   name: 'MarginOtto Pizzeria',
//   address: '1010 Paddington Way',
//   city: 'Flavortown',
//   state: 'NY',
//   zipCode: '10101',
//   categories: [{
//       "alias": "italian",
//       "title": "Italian"
//     },
//     {
//       "alias": "pizza",
//       "title": "Pizza"
//     }
//   ],
//   rating: 4.5,
//   reviewCount: 90

// }
// const businesses = [business, business, business, business, business, business ]
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: []
    }
  }

  searchYelp =  (term, location, sortBy) => {
    Yelp.search(term, location, sortBy)
    .then(businesses => this.setState({businesses}));
  }
  
  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <Searchbar searchYelp={this.searchYelp} />
        <BusinessList businesses={this.state.businesses} />
      </div>
    );
  }
}

export default App;
