import React from 'react';
import FormApp from './FormApp.js';

class Restaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            address: '',
            foodList: [],
            id: Math.random(),
            rating: null
        }
        this.addRestaurant = this.addRestaurant.bind(this);
        this.editRestaurant = this.addRestaurant.bind(this);
        this.deleteRestaurant = this.addRestaurant.bind(this);
    }

    addRestaurant() {
        console.log('This will add new restaurant');
        this.setState({
            name: '',
            description: '',
            address: ''
        });
    }

    editRestaurant() {
        console.log('This will edit new restaurant'); 
    }

    deleteRestaurant() {
        console.log('This will delete new restaurant'); 
    }
}

export default Restaurant;