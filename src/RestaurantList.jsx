import React from 'react';
import FormApp from './FormApp';
import { Link } from 'react-router-dom';
import { async } from 'q';

class RestaurantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      currentId: 0,
      sortedByName: true,
      sortedByRating: false,
    };
  }

  componentDidMount() {
    let temporaryRestaurantList = localStorage.getItem('restaurants_list');

    let temporaryId = localStorage.getItem('current_id');

    temporaryRestaurantList = (temporaryRestaurantList)
      ? JSON.parse(temporaryRestaurantList)
      : [];
    temporaryId = (temporaryId)
      ? JSON.parse(temporaryId)
      : 0;
    this.setState({
      restaurants: temporaryRestaurantList,
      currentId: temporaryId,
    });
  }

    addRestaurant = async item => {
      await this.setState(state => ({
        restaurants: [...this.state.restaurants, item],
        currentId: 0,
      }));
      localStorage.setItem('restaurants_list', JSON.stringify(this.state.restaurants));
      localStorage.setItem('current_id', JSON.stringify(this.state.currentId));
    }

    deleteRestaurant = async itemID => {
      this.state.restaurants.forEach((item, index) => {
        if (item.id === itemID) {
          this.state.restaurants.splice(index, 1);
        }
      });
      await this.setState({ restaurants: this.state.restaurants });
      localStorage.setItem('restaurants_list', JSON.stringify(this.state.restaurants));
    }

    handleDoubleClick = async(itemID, key) => {
      console.log(itemID, key);
      this.state.restaurants.forEach(item => {
        if (item.id === itemID) {
          item[`${key}`].edit = true;
        }
      });
      await this.setState({ restaurants: this.state.restaurants });
      localStorage.setItem('restaurants_list', JSON.stringify(this.state.restaurants));
    }

    handleBlur = async(itemID, key) => {
      this.state.restaurants.forEach(item => {
        if (item.id === itemID) {
          item[`${key}`].edit = false;
        }
      });
      await this.setState({ restaurants: this.state.restaurants });
      localStorage.setItem('restaurants_list', JSON.stringify(this.state.restaurants));
    }

    editRestaurant = async(text, key, itemID) => {
      let newText = text;

      newText = newText.replace(/ {1,}/gu, ' ').trim();
      this.state.restaurants.forEach(item => {
        if (item.id === itemID && newText) {
          item[`${key}`].val = newText;
          item[`${key}`].edit = false;
        }
      });
      await this.setState({ restaurants: this.state.restaurants });
      localStorage.setItem('restaurants_list', JSON.stringify(this.state.restaurants));
    }

    handleSubmit = (event, itemID) => {
      event.preventDefault();
      this.editRestaurant(event.target[0].value, event.target.name, itemID);
    }

    handleTransition = async itemID => {
      this.state.currentId = itemID;
      await this.setState({ currentId: this.state.currentId });
      localStorage.setItem('current_id', JSON.stringify(this.state.currentId));
    }

    RenderInputOrSpan = props => (
      <div>
        {
          props.edit
            ? (
              <form
                onSubmit={event => this.handleSubmit(event, props.itemID)}
                name={props.itemName}
              >
                <input
                  type="text"
                  className="form-controls"
                  autoComplete="off"
                  required
                  autoFocus
                  onBlur={() => this.handleBlur(props.itemID, props.itemName)}
                  defaultValue={props.item}
                />
              </form>
            )
            : (
              <span
                className="restaurant-text"
                name={props.itemName}
                onDoubleClick={() => this.handleDoubleClick(props.itemID, props.itemName)}
              >
                {props.item}
              </span>
            )
        }
      </div>
    )

    RenderHeader = () => (
      <div
        className="main-header"
      >
        <h1>
          This is restaurant rating by React
        </h1>
        <h3>
          You can add new restaurant, or delete some one, or edit them description.
        </h3>
        <h3>
          For more details click on &quot;Learn More&quot; button
        </h3>
      </div>
    )

    RenderRating = props => (
      <div
        className="restaurant-item__rating"
      >
        <h4>
            Mean rating is
        </h4>
        {
          props.meanRating
            ? (
              <h4>
                {props.meanRating}
              </h4>
            )
            : (
              <h5>
            No one meal has been rated
              </h5>
            )
        }
      </div>
    )

    sortByName = async() => {
      let restaurantList = this.state.restaurants;

      restaurantList.sort((aItem, bItem) => {
        if (aItem.name.val > bItem.name.val) {
          return 1;
        }
        if (aItem.name.val < bItem.name.val) {
          return -1;
        }

        return 0;
      });

      await this.setState({ restaurants: restaurantList });
    }

    sortByRating = async() => {
      let restaurantList = this.state.restaurants;

      restaurantList.sort((aItem, bItem) => aItem.meanRating - bItem.meanRating);

      await this.setState({ restaurants: restaurantList });
    }

    render() {
      return (
        <div
          className="main-section"
        >
          <this.RenderHeader />
          <FormApp
            addRestaurant={this.addRestaurant}
          />
          {this.state.restaurants.map(element => (
            <div
              key={element.id}
              className="restaurant-item"
            >
              <button
                type="button"
                className="btn restaurant-item__delete-button"
                onClick={() => this.deleteRestaurant(element.id)}
              >
                  &#10006;
              </button>
              <div
                className="restaurant-item__header"
              >
                <div
                  className="restaurant-item__name"
                >
                  <h4>
                       Restaurant:&nbsp;
                  </h4>
                  <this.RenderInputOrSpan
                    edit={element.name.edit}
                    itemID={element.id}
                    itemName="name"
                    item={element.name.val}
                  />
                </div>
                <this.RenderRating
                  meanRating={element.meanRating}
                />
                <div
                  className="restaurant-item__address"
                >
                  <h4>
                       Our address:&nbsp;
                  </h4>
                  <this.RenderInputOrSpan
                    edit={element.address.edit}
                    itemID={element.id}
                    itemName="address"
                    item={element.address.val}
                  />
                </div>
              </div>
              <div
                className="restaurant-item__footer"
              >
                <h2>
                    About us:
                </h2>
                <this.RenderInputOrSpan
                  edit={element.description.edit}
                  itemID={element.id}
                  itemName="description"
                  item={element.description.val}
                />
                <Link
                  to={`/food/${element.id}`}
                  onClick={() => this.handleTransition(element.id)}
                >
                    Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      );
    }
}

export default RestaurantList;
