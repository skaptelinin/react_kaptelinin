import React from 'react';
import MenuForm from './MenuForm';

const maxMark = 5;
const nameOfRestaurantsStorage = 'restaurants_list';
const nameOfSortingRuleStorage = 'sorting_rule';

class RestaurantApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = { menu: [] };
  }

  componentDidMount() {
    const { props: { match: { params: { id: currentId } } } } = this;
    const temporaryRestaurantList = JSON.parse(localStorage.getItem(nameOfRestaurantsStorage));
    const currentRestaurant = temporaryRestaurantList.find(item => Number(item.id) === Number(currentId)) || {};
    const storedMenu = currentRestaurant.menu || [];

    this.setState({ menu: storedMenu });
  }

  computeRating = () => {
    const { state: { menu: currentMenu } } = this;

    let newRating = currentMenu.reduce((current, item) => item.rating + current, 0);

    newRating /= currentMenu.length;
    newRating = parseFloat(newRating.toFixed(1));

    return newRating;
  }

  sortByRating = restaurantList => {
    const sortingRule = JSON.parse(localStorage.getItem(nameOfSortingRuleStorage));

    if (sortingRule.byRatingToMax) {
      return restaurantList.sort((aItem, bItem) => aItem.meanRating - bItem.meanRating);
    }

    if (sortingRule.byRatingToMin) {
      return restaurantList.sort((aItem, bItem) => bItem.meanRating - aItem.meanRating);
    }

    return restaurantList;
  }

  updateLocalStorage = () => {
    let temporaryRestaurantList = JSON.parse(localStorage.getItem(nameOfRestaurantsStorage));

    const { props: { match: { params: { id: currentId } } } } = this;
    const { state: { menu: newMenu } } = this;
    const idOfRestaurant = temporaryRestaurantList.findIndex(element => Number(element.id) === Number(currentId));

    temporaryRestaurantList[idOfRestaurant].menu = newMenu;
    temporaryRestaurantList[idOfRestaurant].meanRating = this.computeRating();
    temporaryRestaurantList = this.sortByRating(temporaryRestaurantList);
    localStorage.setItem(nameOfRestaurantsStorage, JSON.stringify(temporaryRestaurantList));
  }

addFood = item => {
  const newFoodItem = {
    name: {
      val: item.name.val,
      edit: false,
    },
    rating: item.rating,
    id: item.id,
  };

  const { state: { menu: currentMenu } } = this;

  const newMenu = [...currentMenu, newFoodItem];

  this.setState(
    () => ({ menu: newMenu }),
    () => this.updateLocalStorage()
  );
}

deleteFood = itemID => {
  const { state: { menu: currentMenu } } = this;

  currentMenu.forEach((item, index) => {
    if (item.id === itemID) {
      currentMenu.splice(index, 1);
    }
  });
  this.setState(
    () => ({ menu: currentMenu }),
    () => this.updateLocalStorage()
  );
}

handleDoubleClick = itemID => {
  const { state: { menu: currentMenu } } = this;

  currentMenu.forEach(item => {
    if (item.id === itemID) {
      item.name.edit = true;
    }
  });
  this.setState({ menu: currentMenu });
}

handleBlur = itemID => {
  const { state: { menu: currentMenu } } = this;

  currentMenu.forEach(item => {
    if (item.id === itemID) {
      item.name.edit = false;
    }
  });
  this.setState({ menu: currentMenu });
}

editFood = (text, itemID) => {
  const { state: { menu: currentMenu } } = this;

  let newText = text;

  newText = newText.replace(/ {1,}/gu, ' ').trim();
  currentMenu.forEach(item => {
    if (item.id === itemID && newText) {
      item.name.val = newText;
      item.name.edit = false;
    }
  });
  this.setState(
    () => ({ menu: currentMenu }),
    () => this.updateLocalStorage()
  );
}

handleSubmit = (event, itemID) => {
  event.preventDefault();
  this.editFood(event.target[0].value, itemID);
}

rateFood = (mark, itemID) => {
  const { state: { menu: currentMenu } } = this;

  currentMenu.forEach(item => {
    if (item.id === itemID) {
      item.rating = mark;
    }
  });
  this.setState(
    () => ({ menu: currentMenu }),
    () => this.updateLocalStorage()
  );
}

RenderRatingButtons = props => {
  const buttons = [];

  for (let i = 1; i <= maxMark; i++) {
    buttons.push(i);
  }

  return buttons.map(item => (
    <button
      className="btn"
      key={Math.random()}
      type="button"
      onClick={() => this.rateFood(item, props.id)}
    >
      {item}
    </button>
  ));
}

RenderMealMark = props => (
  <div
    className="menu-item__meal-mark"
  >
    <h4>
        Your mark is
    </h4>
    {
      props.mark
        ? (
          <h4>
            {props.mark}
          </h4>
        )
        : (
          <h4>
    Not Choosing
          </h4>
        )
    }
  </div>
)

RenderInputOrSpan = props => (
  <div
    className="menu-item__text"
  >
    <h4>
        Meal name
    </h4>
    {
      props.edit
        ? (
          <form
            onSubmit={event => this.handleSubmit(event, props.itemID)}
            name="name"
          >
            <input
              type="text"
              className="food-form form-control"
              autoComplete="off"
              required
              autoFocus
              onBlur={() => this.handleBlur(props.itemID)}
              defaultValue={props.item}
            />
          </form>
        )

        : (
          <span
            className="restaurant-text"
            name="name"
            onDoubleClick={() => this.handleDoubleClick(props.itemID)}
          >
            {props.item}
          </span>
        )
    }
  </div>
)

RenderRestaurantName = () => {

  const { props: { match: { params: { id: currentId } } } } = this;
  const temporaryRestaurantList = JSON.parse(localStorage.getItem(nameOfRestaurantsStorage));
  const currentRestaurant = temporaryRestaurantList.find(item => Number(item.id) === Number(currentId));
  const { name: { val: currentName } } = currentRestaurant;

  return (
    <h1>
          The&nbsp;
      {currentName}
      {' '}
    restaurant
    </h1>
  );
}

render() {
  const { state: { menu: menuList } } = this;

  return (
    <div
      className="main-section"
    >
      <this.RenderRestaurantName />
      <MenuForm
        addFood={this.addFood}
      />
      {menuList.map(element => (
        <div
          key={element.id}
          className="menu-item"
        >
          <div
            className="menu-item__mark-buttons"
          >
            <span>
                Choose your mark
            </span>
            <this.RenderRatingButtons
              id={element.id}
            />
          </div>
          <div
            className="menu-item__central-column"
          >
            <this.RenderMealMark
              mark={element.rating}
            />
            <this.RenderInputOrSpan
              edit={element.name.edit}
              itemID={element.id}
              item={element.name.val}
            />
          </div>
          <button
            type="button"
            className="btn menu-item__delete-button"
            onClick={() => this.deleteFood(element.id)}
          >
                &#10006;
          </button>
        </div>
      ))}
      <a
        href="/"
        className="to-main-page-link"
      >
        Main Page
      </a>
    </div>
  );
}

}

export default RestaurantApp;
