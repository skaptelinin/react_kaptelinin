import React from 'react';
import FormApp from './FormApp.js';
import { element } from 'prop-types';

class RestaurantList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           restaurants: []
        };
      }
    
    addRestaurant = async (item) => {
        await this.setState((state) => ({
            restaurants: [...this.state.restaurants, item]
        }));
        localStorage.setItem('restaurants_list', JSON.stringify(this.state.restaurants));
    }

    deleteRestaurant = async (itemID) => {
        await this.setState((state) => ({
            restaurant: this.state.restaurants.forEach((item, index) => {
               if (item.id === itemID) {
                this.state.restaurants.splice(index, 1);
               }
            })
        }));
        localStorage.setItem('restaurants_list', JSON.stringify(this.state.restaurants));
    }

    editRestaurantField = async (itemID, currentField) => {
        const newValue = document.getElementById('edit-form').nodeValue();
        await this.setState((state) => ({
            restaurant: this.state.restaurants.forEach((item, index) => {
                if (item.id === itemID) {
                  item.currentField = newValue;
                }
             })
        }))
    }

    handleDoubleClick = (event) => {
        event.preventDefault();
    }

    componentDidMount() {
        let temporaryRestaurantList = localStorage.getItem('restaurants_list');
        temporaryRestaurantList = (temporaryRestaurantList)
        ?JSON.parse(temporaryRestaurantList):[];
        this.setState({
            restaurants: temporaryRestaurantList
        });
    }

    render() {
        return(
            <div className="main-section">
                <FormApp addRestaurant={this.addRestaurant} />
                {this.state.restaurants.map(element => (
                  <div key={element.id} className="restaurant-item">
                      <button className="btn restaurant-item__delete-button"
                      onClick={() => this.deleteRestaurant(element.id)}>&#10006;</button>
                      <div className="restaurant-item__header">
                          <p>
                          Restaurant:&nbsp;
                  <span className="restaurant-item__name restaurant-text"
                  onDoubleClick={this.handleDoubleClick}>
                       {element.name}
                  </span>
                  </p>
                  <p>
                      Our address:&nbsp;
                  <span className="restaurant-item__address restaurant-text"
                  onDoubleClick={this.handleDoubleClick}>
                      {element.address}
                  </span>
                  </p>
                  </div>
                  <div className="restaurant-item__footer">
                      <h2>About us:</h2>
                  <span className="restaurant-item__description restaurant-text"
                  onDoubleClick={this.handleDoubleClick}>
                       {element.description}
                  </span>
                  <button className="btn">Learn More</button>
                  </div>
              </div>  
                ))}
            </div>
        );
    }
}

export default RestaurantList;