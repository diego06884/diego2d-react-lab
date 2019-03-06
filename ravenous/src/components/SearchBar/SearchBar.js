import React from 'react';
import './SearchBar.css';

const sortByOptions = {
    "Best Match": "best_match",
    "Highest Rated": "rating",
    "Most Reviewed": "review_count"
};

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: "",
            location: "",
            sortBy: "best_match"
        };
    }

    getSortByClass(sortByOption) {
        if (this.state.sortBy === sortByOption){
            return 'active';
        }
        return '';
    }
    
    handleSortByChange(sortByOption) {
        this.setState({sortBy: sortByOption});
    }

    handleTermChange(event){
        this.setState({});        
    }
    handleLocationChange(event){
        this.setState({});            
    }
    renderSortByOptions() {
        return Object.keys(sortByOptions).map(sortByOption => {
            const sortByOptionValue = sortByOptions[sortByOption];
            return <li onClick={this.handleSortByChange.bind(this, sortByOptionValue)} className={this.getSortByClass(sortByOptionValue)} key={sortByOptionValue}> {sortByOption} </li>;
        });
    }


    render() {
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                        { this.renderSortByOptions() }
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input placeholder="Search Businesses" />
                    <input placeholder="Where?" />
                </div>
                <div className="SearchBar-submit">
                    <button>Let's Go</button>
                </div>
            </div>
        );
    }
}
export default SearchBar; 
