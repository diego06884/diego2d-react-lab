const apiKey = "w83LEC6z4V0YlRw7TvWQowTojumJcPxBp_Lb0fPZU7LFwrK9j7UDTc9GklJikRC002sTk8ze61gtAal_qFYoz28pjeadsNwL7iZ3b5P2ujnpvARpGvj5RXhOccvuXHYx";

const Yelp = {
    
    search: (term, location, sortBy) => {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        })
        .then(response => {
            return response.json();
        })
        .then(jsonResponse => {
            if (jsonResponse.businesses) {
                return jsonResponse.businesses.map(business => {
                        return {
                            id: business.id,
                            imageSrc: business.image_url,
                            name: business.name,
                            address: business.location.address1,
                            city: business.location.city,
                            state: business.location.state,
                            zipcode: business.location.zip_code,
                            categories: business.categories,
                            rating: business.rating,
                            reviewCount: business.review_count
                        }
                    }
                );
            }
            throw new Error ('There are no businesses');
        });
    }
};

export default Yelp;

