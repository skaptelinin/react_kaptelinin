import React from 'react';
import FormApp from './FormApp.js';

class RestaurantList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           restaurants: []
        };
        this.addRestaurant=this.addRestaurant.bind(this);
      }
    
    addRestaurant = (item) => {
        this.setState({
            restaurants: [item, ...this.state.restaurants]
        });
    }

    render() {
        return(
            <div>
                <FormApp onSubmit={this.addRestaurant} />
                {JSON.stringify(this.state.restaurants)}
            </div>
        );
    }
}

export default RestaurantList;