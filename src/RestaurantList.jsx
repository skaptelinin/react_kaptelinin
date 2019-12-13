import React from 'react';
import FormApp from './FormApp';
import RenderHeader from './RenderHeader';
import RenderInputOrSpan from './RenderInputOrSpan.jsx';
import RenderMeanRating from './RenderMeanRating';
import RenderSortingButtons from './RenderSortingButtons';
import { Link } from 'react-router-dom';
import * as constantsModule from './constants';
import * as helperModule from './helper';

class RestaurantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      sorted: constantsModule.byNameToMax,
    };
  }

  componentDidMount() {
    let temporaryRestaurantList = localStorage.getItem(constantsModule.nameOfRestaurantsStorage);

    let temporarySorting = localStorage.getItem(constantsModule.nameOfSortingRuleStorage);

    temporaryRestaurantList = (temporaryRestaurantList)
      ? JSON.parse(temporaryRestaurantList)
      : [];
    temporarySorting = (temporarySorting)
      ? JSON.parse(temporarySorting)
      : constantsModule.byNameToMax;
    this.setState({
      restaurants: temporaryRestaurantList,
      sorted: temporarySorting,
    });
  }

    addRestaurant = item => {
      const { state: { restaurants: currentRestaurants } } = this;

      let newRestaurants = [...currentRestaurants, item];

      newRestaurants = helperModule.conditionalSort(newRestaurants);

      this.setState(
        () => ({ restaurants: newRestaurants }),
        () => localStorage.setItem(constantsModule.nameOfRestaurantsStorage, JSON.stringify(newRestaurants))
      );
    }

    deleteRestaurant = itemID => {
      let { state: { restaurants: newRestaurants } } = this;

      newRestaurants.forEach((item, index) => {
        if (item.id === itemID) {
          newRestaurants.splice(index, 1);
        }
      });

      newRestaurants = helperModule.conditionalSort(newRestaurants);

      this.setState(
        () => ({ restaurants: newRestaurants }),
        () => localStorage.setItem(constantsModule.nameOfRestaurantsStorage, JSON.stringify(newRestaurants))
      );
    }

    handleDoubleClick = (itemID, key) => {
      const { state: { restaurants: currentRestaurants } } = this;

      currentRestaurants.forEach(item => {
        if (item.id === itemID) {
          item[`${key}`].itemCorrection = true;
        }
      });
      this.setState({ restaurants: currentRestaurants });
    }

    handleBlur = (itemID, key) => {
      const { state: { restaurants: currentRestaurants } } = this;

      currentRestaurants.forEach(item => {
        if (item.id === itemID) {
          item[`${key}`].itemCorrection = false;
        }
      });
      this.setState({ restaurants: currentRestaurants });
    }

    editRestaurant = (text, key, itemID) => {
      const newText = helperModule.validateInput(text);

      let { state: { restaurants: newRestaurants } } = this;

      newRestaurants.forEach(item => {
        if (item.id === itemID && newText) {
          item[`${key}`].itemValue = newText;
          item[`${key}`].itemCorrection = false;
        }
      });

      newRestaurants = helperModule.conditionalSort(newRestaurants);

      this.setState(
        () => ({ restaurants: newRestaurants }),
        () => localStorage.setItem(constantsModule.nameOfRestaurantsStorage, JSON.stringify(newRestaurants))
      );
    }

    handleSubmit = (event, itemID) => {
      event.preventDefault();
      this.editRestaurant(event.target[0].value, event.target.name, itemID);
    }

    handleSortByNameToMax = () => {
      let { state: { restaurants: newRestaurants } } = this;

      newRestaurants = helperModule.sortByName(newRestaurants);
      this.setState(
        () => ({
          sorted: constantsModule.byNameToMax,
          restaurants: newRestaurants,
        }),
        () => helperModule.globalUpdate(newRestaurants, constantsModule.byNameToMax)
      );
    }

    handleSortByNameToMin = () => {
      let { state: { restaurants: newRestaurants } } = this;

      newRestaurants = helperModule.sortByName(newRestaurants).reverse();
      this.setState(
        () => ({
          sorted: constantsModule.byNameToMin,
          restaurants: newRestaurants,
        }),
        () => helperModule.globalUpdate(newRestaurants, constantsModule.byNameToMin)
      );
    }

    handleSortByRatingToMax = () => {
      let { state: { restaurants: newRestaurants } } = this;

      newRestaurants = helperModule.sortByRating(newRestaurants);
      this.setState(
        () => ({
          sorted: constantsModule.byRatingToMax,
          restaurants: newRestaurants,
        }),
        () => helperModule.globalUpdate(newRestaurants, constantsModule.byRatingToMax)
      );
    }

    handleSortByRatingToMin = () => {
      let { state: { restaurants: newRestaurants } } = this;

      newRestaurants = helperModule.sortByRating(newRestaurants).reverse();
      this.setState(
        () => ({
          sorted: constantsModule.byRatingToMin,
          restaurants: newRestaurants,
        }),
        () => helperModule.globalUpdate(newRestaurants, constantsModule.byRatingToMin)
      );
    }

    render() {
      const {
        state: {
          restaurants: restaurantList,
          sorted: sortingRule,
        },
      } = this;

      return (
        <div className="main-section">
          <RenderHeader />
          <FormApp
            addRestaurant={this.addRestaurant}
          />
          <RenderSortingButtons
            sortingRule={sortingRule}
            handleSortByNameToMax={this.handleSortByNameToMax}
            handleSortByNameToMin={this.handleSortByNameToMin}
            handleSortByRatingToMax={this.handleSortByRatingToMax}
            handleSortByRatingToMin={this.handleSortByRatingToMin}
          />
          {restaurantList.map(element => (
            <div key={element.id} className="restaurant-item">
              <button
                type="button"
                className="btn restaurant-item__delete-button"
                onClick={() => this.deleteRestaurant(element.id)}
              >
                  &#10006;
              </button>
              <div className="restaurant-item__header">
                <div className="restaurant-item__name">
                  <h4>
                       Restaurant:&nbsp;
                  </h4>
                  <div className="restaurant-item__container">
                    <RenderInputOrSpan
                      itemCorrection={element.name.itemCorrection}
                      itemName={constantsModule.name}
                      formClass={constantsModule.restaurantEditFormClass}
                      inputAdditionalClass=""
                      itemID={element.id}
                      item={element.name.itemValue}
                      handleBlur={this.handleBlur}
                      handleDoubleClick={this.handleDoubleClick}
                      handleSubmit={this.handleSubmit}
                    />
                  </div>
                </div>
                <RenderMeanRating meanRating={element.meanRating} />
                <div className="restaurant-item__address">
                  <h4>
                       Our address:&nbsp;
                  </h4>
                  <div className="restaurant-item__container">
                    <RenderInputOrSpan
                      itemCorrection={element.address.itemCorrection}
                      itemID={element.id}
                      formClass={constantsModule.restaurantEditFormClass}
                      inputAdditionalClass=""
                      itemName={constantsModule.address}
                      item={element.address.itemValue}
                      handleBlur={this.handleBlur}
                      handleDoubleClick={this.handleDoubleClick}
                      handleSubmit={this.handleSubmit}
                    />
                  </div>
                </div>
              </div>
              <div className="restaurant-item__footer">
                <h2>
                    About us:
                </h2>
                <div className="restaurant-item__container">
                  <RenderInputOrSpan
                    itemCorrection={element.description.itemCorrection}
                    itemID={element.id}
                    formClass={constantsModule.restaurantEditFormClass}
                    inputAdditionalClass=""
                    itemName={constantsModule.description}
                    item={element.description.itemValue}
                    handleBlur={this.handleBlur}
                    handleDoubleClick={this.handleDoubleClick}
                    handleSubmit={this.handleSubmit}
                  />
                </div>
                <Link to={`/food/${element.id}`}>
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
