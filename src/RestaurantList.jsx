import React from 'react';
import FormApp from './FormApp';
import { Link } from 'react-router-dom';

const negativeNumberForSorting = -1;
const nameOfRestaurantsStorage = 'restaurants_list';
const nameOfSortingRuleStorage = 'sorting_rule';

class RestaurantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      sorted: {
        byNameToMax: true,
        byNameToMin: false,
        byRatingToMax: false,
        byRatingToMin: false,
      },
    };
  }

  componentDidMount() {
    let temporaryRestaurantList = localStorage.getItem(nameOfRestaurantsStorage);

    let temporarySorting = localStorage.getItem(nameOfSortingRuleStorage);

    temporaryRestaurantList = (temporaryRestaurantList)
      ? JSON.parse(temporaryRestaurantList)
      : [];
    temporarySorting = (temporarySorting)
      ? JSON.parse(temporarySorting)
      : {
        byNameToMax: true,
        byNameToMin: false,
        byRatingToMax: false,
        byRatingToMin: false,
      };
    this.setState({
      restaurants: temporaryRestaurantList,
      sorted: temporarySorting,
    });
  }

    addRestaurant = item => {
      const { state: { restaurants: currentRestaurants } } = this;
      const { state: { sorted: sorting } } = this;
      const { byNameToMax: nameSortToMax } = sorting;
      const { byRatingToMax: rateSortToMax } = sorting;
      const { byNameToMin: nameSortToMin } = sorting;
      const { byRatingToMin: rateSortToMin } = sorting;
      const sortingRule = {
        byNameToMax: nameSortToMax,
        byNameToMin: nameSortToMin,
        byRatingToMax: rateSortToMax,
        byRatingToMin: rateSortToMin,
      };

      let newRestaurants = [...currentRestaurants, item];

      newRestaurants = this.conditionalSort(newRestaurants);

      this.updateLocalStorage(newRestaurants, sortingRule);
    }

    deleteRestaurant = async itemID => {

      let { state: { restaurants: newRestaurants } } = this;

      newRestaurants.forEach((item, index) => {
        if (item.id === itemID) {
          newRestaurants.splice(index, 1);
        }
      });

      newRestaurants = this.conditionalSort(newRestaurants);

      await this.setState({ restaurants: newRestaurants });

      localStorage.setItem(nameOfRestaurantsStorage, JSON.stringify(newRestaurants));
    }

    handleDoubleClick = async(itemID, key) => {
      const { state: { restaurants: currentRestaurants } } = this;

      currentRestaurants.forEach(item => {
        if (item.id === itemID) {
          item[`${key}`].edit = true;
        }
      });
      await this.setState({ restaurants: currentRestaurants });
    }

    handleBlur = async(itemID, key) => {
      const { state: { restaurants: currentRestaurants } } = this;

      currentRestaurants.forEach(item => {
        if (item.id === itemID) {
          item[`${key}`].edit = false;
        }
      });
      await this.setState({ restaurants: currentRestaurants });
    }

    editRestaurant = async(text, key, itemID) => {

      let { state: { restaurants: newRestaurants } } = this;

      let newText = text;

      newText = newText.replace(/ {1,}/gu, ' ').trim();
      newRestaurants.forEach(item => {
        if (item.id === itemID && newText) {
          item[`${key}`].val = newText;
          item[`${key}`].edit = false;
        }
      });

      newRestaurants = this.conditionalSort(newRestaurants);

      await this.setState({ restaurants: newRestaurants });
      localStorage.setItem(nameOfRestaurantsStorage, JSON.stringify(newRestaurants));
    }

    handleSubmit = (event, itemID) => {
      event.preventDefault();
      this.editRestaurant(event.target[0].value, event.target.name, itemID);
    }

    sortByName = restaurantList => {
      restaurantList.sort((aItem, bItem) => {
        if (aItem.name.val > bItem.name.val) {
          return 1;
        }
        if (aItem.name.val < bItem.name.val) {
          return negativeNumberForSorting;
        }

        return 0;
      });

      return restaurantList;
    }

    sortByRating = restaurantList => {
      restaurantList.sort((aItem, bItem) => aItem.meanRating - bItem.meanRating);

      return restaurantList;
    }

    conditionalSort = restaurantList => {
      const { state: { sorted: sorting } } = this;
      const { byNameToMax: nameSortToMax } = sorting;
      const { byRatingToMax: rateSortToMax } = sorting;
      const { byNameToMin: nameSortToMin } = sorting;

      if (nameSortToMax) {
        const NewRestaurantList = this.sortByName(restaurantList);

        return NewRestaurantList;
      }

      if (nameSortToMin) {
        const NewRestaurantList = this.sortByName(restaurantList).reverse();

        return NewRestaurantList;
      }

      if (rateSortToMax) {
        const NewRestaurantList = this.sortByRating(restaurantList);

        return NewRestaurantList;
      }

      const NewRestaurantList = this.sortByRating(restaurantList).reverse();

      return NewRestaurantList;
    }

    updateLocalStorage = async(restaurantList, sortingRule) => {
      await this.setState({
        sorted: sortingRule,
        restaurants: restaurantList,
      });
      localStorage.setItem(nameOfRestaurantsStorage, JSON.stringify(restaurantList));
      localStorage.setItem(nameOfSortingRuleStorage, JSON.stringify(sortingRule));
    }

    handleSortByNameToMax = () => {
      const sortingRule = {
        byNameToMax: true,
        byNameToMin: false,
        byRatingToMax: false,
        byRatingToMin: false,
      };

      let { state: { restaurants: newRestaurants } } = this;

      newRestaurants = this.sortByName(newRestaurants);
      this.updateLocalStorage(newRestaurants, sortingRule);
    }

    handleSortByNameToMin = () => {
      const sortingRule = {
        byNameToMax: false,
        byNameToMin: true,
        byRatingToMax: false,
        byRatingToMin: false,
      };

      let { state: { restaurants: newRestaurants } } = this;

      newRestaurants = this.sortByName(newRestaurants).reverse();
      this.updateLocalStorage(newRestaurants, sortingRule);
    }

    handleSortByRatingToMax = () => {
      const sortingRule = {
        byNameToMax: false,
        byNameToMin: false,
        byRatingToMax: true,
        byRatingToMin: false,
      };

      let { state: { restaurants: newRestaurants } } = this;

      newRestaurants = this.sortByRating(newRestaurants);
      this.updateLocalStorage(newRestaurants, sortingRule);
    }

    handleSortByRatingToMin = () => {
      const sortingRule = {
        byNameToMax: false,
        byNameToMin: false,
        byRatingToMax: false,
        byRatingToMin: true,
      };

      let { state: { restaurants: newRestaurants } } = this;

      newRestaurants = this.sortByRating(newRestaurants).reverse();
      this.updateLocalStorage(newRestaurants, sortingRule);
    }

    RenderSortingButtons = props => (
      <div
        className="sorting-buttons"
      >
        <div
          className="sorting-buttons__by-name"
        >
          <span
            className={`${(props.nameSortingToMax || props.nameSortingToMin) && 'hint'}`}
          >
          Sort by Name
          </span>
          <button
            type="button"
            className={`btn ${props.nameSortingToMax && 'hint'}`}
            onClick={this.handleSortByNameToMax}
          >
          &#11015;
          </button>
          <button
            type="button"
            className={`btn ${props.nameSortingToMin && 'hint'}`}
            onClick={this.handleSortByNameToMin}
          >
          &#11014;
          </button>
        </div>
        <div
          className="sorting-buttons__by-rating"
        >
          <span
            className={`${(props.ratingSortingToMax || props.ratingSortingToMin) && 'hint'}`}
          >
          Sort by Rating
          </span>
          <button
            type="button"
            className={`btn ${props.ratingSortingToMax && 'hint'}`}
            onClick={this.handleSortByRatingToMax}
          >
          &#11015;
          </button>
          <button
            type="button"
            className={`btn ${props.ratingSortingToMin && 'hint'}`}
            onClick={this.handleSortByRatingToMin}
          >
          &#11014;
          </button>
        </div>
      </div>
    )

    RenderInputOrSpan = props => (
      <div
        className="restaurant-item__container"
      >
        {
          props.edit
            ? (
              <form
                onSubmit={event => this.handleSubmit(event, props.itemID)}
                className="restaurant-item__edit-form"
                name={props.itemName}
              >
                <input
                  type="text"
                  className="form-control"
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

    render() {
      const { state: { sorted: sorting } } = this;
      const { byNameToMax: nameSortToMax } = sorting;
      const { byNameToMin: nameSortToMin } = sorting;
      const { byRatingToMax: rateSortToMax } = sorting;
      const { byRatingToMin: rateSortToMin } = sorting;
      const { state: { restaurants: restaurantList } } = this;

      return (
        <div
          className="main-section"
        >
          <this.RenderHeader />
          <FormApp
            addRestaurant={this.addRestaurant}
          />
          <this.RenderSortingButtons
            nameSortingToMax={nameSortToMax}
            nameSortingToMin={nameSortToMin}
            ratingSortingToMax={rateSortToMax}
            ratingSortingToMin={rateSortToMin}
          />
          {restaurantList.map(element => (
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
