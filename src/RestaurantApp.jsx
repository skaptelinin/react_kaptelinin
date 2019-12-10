import React from 'react';
import MenuForm from './MenuForm';
import { Link } from 'react-router-dom';

class RestaurantApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],
      id: localStorage.getItem('current_id'),
    };
  }

  componentDidMount() {
    const temporaryRestaurantList = JSON.parse(localStorage.getItem('restaurants_list'));
    const currentRestaurant = temporaryRestaurantList.find(item => Number(item.id) === Number(this.state.id)) || {};
    const storedMenu = currentRestaurant.menu || [];

    this.setState({ menu: storedMenu });
  }

  computeRating = () => {
    // const temporaryRestaurantList = JSON.parse(localStorage.getItem('restaurants_list'));
    // const currentRestaurant = temporaryRestaurantList.find(item => Number(item.id) === Number(itemID));
    const currentMenu = this.state.menu;

    let newRating = currentMenu.reduce((current, item) => item.rating + current, 0);

    newRating = newRating/currentMenu.length;
    newRating = parseFloat(newRating.toFixed(1));
    console.log(newRating);
    return newRating;
  }

addFood = async item => {
  await this.setState(state => ({ menu: [...this.state.menu, item] }));
  const temporaryRestaurantList = JSON.parse(localStorage.getItem('restaurants_list'));
  const idOfRestaurant = temporaryRestaurantList.findIndex(element => Number(element.id) === Number(this.state.id));

  temporaryRestaurantList[idOfRestaurant].menu = this.state.menu;
  temporaryRestaurantList[idOfRestaurant].meanRating = this.computeRating();
  localStorage.setItem('restaurants_list', JSON.stringify(temporaryRestaurantList));
}

deleteFood = async itemID => {
  this.state.menu.forEach((item, index) => {
    if (item.id === itemID) {
      this.state.menu.splice(index, 1);
    }
  });
  await this.setState({ menu: this.state.menu });
  const temporaryRestaurantList = JSON.parse(localStorage.getItem('restaurants_list'));
  const idOfRestaurant = temporaryRestaurantList.findIndex(item => Number(item.id) === Number(this.state.id));

  temporaryRestaurantList[idOfRestaurant].menu = this.state.menu;
  temporaryRestaurantList[idOfRestaurant].meanRating = this.computeRating(idOfRestaurant);
  localStorage.setItem('restaurants_list', JSON.stringify(temporaryRestaurantList));
}

handleDoubleClick = async itemID => {
  this.state.menu.forEach(item => {
    if (item.id === itemID) {
      item.name.edit = true;
    }
  });
  await this.setState({ menu: this.state.menu });
  const temporaryRestaurantList = JSON.parse(localStorage.getItem('restaurants_list'));
  const idOfRestaurant = temporaryRestaurantList.findIndex(element => Number(element.id) === Number(this.state.id));

  temporaryRestaurantList[idOfRestaurant].menu = this.state.menu;
  localStorage.setItem('restaurants_list', JSON.stringify(temporaryRestaurantList));
}

handleBlur = async itemID => {
  this.state.menu.forEach(item => {
    if (item.id === itemID) {
      item.name.edit = false;
    }
  });
  await this.setState({ menu: this.state.menu });
  const temporaryRestaurantList = JSON.parse(localStorage.getItem('restaurants_list'));
  const idOfRestaurant = temporaryRestaurantList.findIndex(element => Number(element.id) === Number(this.state.id));

  temporaryRestaurantList[idOfRestaurant].menu = this.state.menu;
  localStorage.setItem('restaurants_list', JSON.stringify(temporaryRestaurantList));
}

editFood = async(text, itemID) => {
  let newText = text;

  newText = newText.replace(/ {1,}/gu, ' ').trim();
  this.state.menu.forEach(item => {
    if (item.id === itemID && newText) {
      item.name.val = newText;
      item.name.edit = false;
    }
  });
  await this.setState({ menu: this.state.menu });
  const temporaryRestaurantList = JSON.parse(localStorage.getItem('restaurants_list'));
  const idOfRestaurant = temporaryRestaurantList.findIndex(item => Number(item.id) === Number(this.state.id));

  temporaryRestaurantList[idOfRestaurant].menu = this.state.menu;
  localStorage.setItem('restaurants_list', JSON.stringify(temporaryRestaurantList));
}

handleSubmit = (event, itemID) => {
  event.preventDefault();
  this.editFood(event.target[0].value, itemID);
}

rateFood = async(mark, itemID) => {
  this.state.menu.forEach(item => {
    if (item.id === itemID) {
      item.rating = mark;
    }
  });
  await this.setState({ menu: this.state.menu });
  const temporaryRestaurantList = JSON.parse(localStorage.getItem('restaurants_list'));
  const idOfRestaurant = temporaryRestaurantList.findIndex(item => Number(item.id) === Number(this.state.id));

  temporaryRestaurantList[idOfRestaurant].menu = this.state.menu;
  temporaryRestaurantList[idOfRestaurant].meanRating = this.computeRating(idOfRestaurant);
  localStorage.setItem('restaurants_list', JSON.stringify(temporaryRestaurantList));
}

RenderRatingButtons = props => {
  const buttons = [];

  for (let i = 1; i <= 5; i++) {
    buttons.push(i);
  }

  return buttons.map((item, index) => (
    <button
      className="btn"
      key={index}
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
              className="form-controls"
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
  const temporaryRestaurantList = JSON.parse(localStorage.getItem('restaurants_list'));
  const idOfRestaurant = temporaryRestaurantList.findIndex(item => Number(item.id) === Number(this.state.id));
  const currentName = temporaryRestaurantList[idOfRestaurant].name.val;

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
  return (
    <div
      className="main-section"
    >
      <this.RenderRestaurantName />
      <MenuForm
        addFood={this.addFood}
      />
      {this.state.menu.map(element => (
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
      <Link
        to="/"
      >
        Main Page
      </Link>
    </div>
  );
}

}

export default RestaurantApp;
