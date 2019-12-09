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
        console.log(itemID, key);
        this.state.restaurants.forEach((item) => {
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
        this.state.restaurants.forEach((item) => {
            if (item.id === itemID) {
               item[`${key}`].edit = false
               }
        });
        await this.setState({
            restaurants: this.state.restaurants
        });
        localStorage.setItem('restaurants_list', JSON.stringify(this.state.restaurants));  
    }

    editRestaurant = async (text, key, itemID) => {
        text = text.replace(/ {1,}/gu, ' ').trim();
        this.state.restaurants.forEach((item) => {
            if (item.id === itemID && text) {
                item[`${key}`].val = text;
                item[`${key}`].edit = false;
            }
        });
        await this.setState({
            restaurants: this.state.restaurants
        });
        localStorage.setItem('restaurants_list', JSON.stringify(this.state.restaurants));
    }

    handleSubmit = (event, itemID) => {
        event.preventDefault();
        this.editRestaurant(event.target[0].value, event.target.name, itemID);
    }

    RenderInputOrSpan = (props) => {
            return(<div>{
                props.edit ? <form onSubmit={(event) => this.handleSubmit(event, props.itemID)} name={props.itemName} >
            <input type="text" className="form-controls"
            autoComplete="off" required autoFocus 
            onBlur={() => this.handleBlur(props.itemID, props.itemName)} defaultValue={props.item}/>
            </form>:  <span className="restaurant-text" name={props.itemName}
                onDoubleClick={() => this.handleDoubleClick(props.itemID, props.itemName)}>
                {props.item}</span>
            }</div>)
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
                          <div className="restaurant-item__name">
                          <h4> Restaurant:&nbsp;</h4>
                          <this.RenderInputOrSpan edit = {element.name.edit} itemID = {element.id}
                           itemName = "name" item = {element.name.val}/>
                           </div>
                           <div className="restaurant-item__address">
                  <h4>  Our address:&nbsp;</h4>
                  <this.RenderInputOrSpan edit = {element.address.edit} itemID = {element.id}
                   itemName = "address" item = {element.address.val}/>
                   </div>
                  </div>
                  <div className="restaurant-item__footer">
                      <h2>About us:</h2>
                      <this.RenderInputOrSpan edit = {element.description.edit} itemID = {element.id}
                       itemName = "description" item = {element.description.val}/>
                  <button className="btn">Learn More</button>
                  </div>
              </div>  
                ))}
            </div>
        );
    }
}

export default RestaurantList;