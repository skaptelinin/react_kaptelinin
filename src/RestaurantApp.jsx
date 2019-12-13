import React from 'react';
import MenuForm from './MenuForm';
import RenderRatingButtons from './RenderRatingButtons';
import RenderMealMark from './RenderMealMark';
import RenderInputOrSpan from './RenderInputOrSpan.jsx';
import RenderRestaurantName from './RenderRestaurantName.jsx';
import * as constantsModule from './constants';
import * as helperModule from './helper';

class RestaurantApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = { menu: [] };
  }

  componentDidMount() {
    const currentId = this.props.match.params.id;
    const temporaryRestaurantList = JSON.parse(localStorage.getItem(constantsModule.nameOfRestaurantsStorage));
    const currentRestaurant = temporaryRestaurantList.find(item => Number(item.id) === Number(currentId)) || {};
    const storedMenu = currentRestaurant.menu || [];

    this.setState({ menu: storedMenu });
  }

addFood = item => {
  const newFoodItem = {
    name: {
      itemValue: item.name.itemValue,
      itemCorrection: false,
    },
    rating: item.rating,
    id: item.id,
  };

  const currentId = this.props.match.params.id;
  const { state: { menu: currentMenu } } = this;

  const newMenu = [...currentMenu, newFoodItem];

  this.setState(
    () => ({ menu: newMenu }),
    () => helperModule.updateLocalStorage(currentId, newMenu)
  );
}

deleteFood = itemID => {
  const currentId = this.props.match.params.id;

  this.setState(
    prevState => ({ menu: prevState.filter(item => item.id !== itemID) }),
    () => helperModule.updateLocalStorage(currentId, this.state.menu)
  );
}

handleDoubleClick = itemID => {
  const { state: { menu: currentMenu } } = this;

  currentMenu.forEach(item => {
    if (item.id === itemID) {
      item.name.itemCorrection = true;
    }
  });
  this.setState({ menu: currentMenu });
}

handleBlur = itemID => {
  const { state: { menu: currentMenu } } = this;

  currentMenu.forEach(item => {
    if (item.id === itemID) {
      item.name.itemCorrection = false;
    }
  });
  this.setState({ menu: currentMenu });
}

editFood = (text, itemID) => {
  const { state: { menu: currentMenu } } = this;
  const newText = helperModule.validateInput(text);
  const currentId = this.props.match.params.id;

  currentMenu.forEach(item => {
    if (item.id === itemID && newText) {
      item.name.itemValue = newText;
      item.name.itemCorrection = false;
    }
  });
  this.setState(
    () => ({ menu: currentMenu }),
    () => helperModule.updateLocalStorage(currentId, currentMenu)
  );
}

handleSubmit = (event, itemID) => {
  event.preventDefault();
  this.editFood(event.target[0].value, itemID);
}

rateFood = (mark, itemID) => {
  const { state: { menu: currentMenu } } = this;
  const currentId = this.props.match.params.id;

  currentMenu.forEach(item => {
    if (item.id === itemID) {
      item.rating = mark;
    }
  });
  this.setState(
    () => ({ menu: currentMenu }),
    () => helperModule.updateLocalStorage(currentId, currentMenu)
  );
}

render() {

  return (
    <div className="main-section">
      <RenderRestaurantName id={this.props.match.params.id} />
      <MenuForm addFood={this.addFood} />
      {this.state.menu.map(element => (
        <div key={element.id} className="menu-item">
          <div className="menu-item__mark-buttons">
            <span>
                Choose your mark
            </span>
            <RenderRatingButtons rateFood={this.rateFood} id={element.id} />
          </div>
          <div className="menu-item__central-column">
            <RenderMealMark mark={element.rating} />
            <div className="menu-item__text">
              <h4>
          Meal name
              </h4>
              <RenderInputOrSpan
                itemCorrection={element.name.itemCorrection}
                itemName={constantsModule.name}
                formClass={constantsModule.mealEditFormClass}
                inputAdditionalClass={constantsModule.foodEditTypeClass}
                itemID={element.id}
                item={element.name.itemValue}
                handleBlur={this.handleBlur}
                handleDoubleClick={this.handleDoubleClick}
                handleSubmit={this.handleSubmit}
              />
            </div>
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
      <a href="/" className="to-main-page-link">
        Main Page
      </a>
    </div>
  );
}

}

export default RestaurantApp;
