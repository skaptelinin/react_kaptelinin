import React from 'react';
import FormApp from './FormApp.js';

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
        this.state.restaurants.forEach((item, index) => {
            if (item.id === itemID) {
             this.state.restaurants.splice(index, 1);
            }
         });
        await this.setState({
            restaurants: this.state.restaurants
        });
        localStorage.setItem('restaurants_list', JSON.stringify(this.state.restaurants));
    }

    handleDoubleClick = async (itemID, key) => {
        this.state.restaurants.forEach((item, index) => {
            if (item.id === itemID) {
               item[`${key}`].edit = true
               }
        });
        await this.setState({
            restaurants: this.state.restaurants
        });
        localStorage.setItem('restaurants_list', JSON.stringify(this.state.restaurants));     
    }

    handleBlur = async (itemID, key) => {
        this.state.restaurants.forEach((item, index) => {
            if (item.id === itemID) {
               item[`${key}`].edit = false
               }
        });
        await this.setState({
            restaurants: this.state.restaurants
        });
        localStorage.setItem('restaurants_list', JSON.stringify(this.state.restaurants));  
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: {
              edit: false,
              val: event.target.value
            }
          })
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
                          <p> Restaurant:&nbsp;</p>
                        {element.name.edit ? <form>
            <input type="text" className="form-controls"
            autoComplete="off" required autoFocus onChange={handleChange}
            onBlur={() => this.handleBlur(element.id, 'name')} value={element.name.val}/>
            </form>:  <span className="restaurant-text" name="name"
                onDoubleClick={() => this.handleDoubleClick(element.id, 'name')}>
                {element.name.val}</span>}
                  <p>  Our address:&nbsp;
                  <span className="restaurant-item__address restaurant-text"
                  onDoubleClick={this.handleDoubleClick}>
                      {element.address.val}
                  </span>
                  </p>
                  </div>
                  <div className="restaurant-item__footer">
                      <h2>About us:</h2>
                  <span className="restaurant-item__description restaurant-text"
                  onDoubleClick={this.handleDoubleClick}>
                       {element.description.val}
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