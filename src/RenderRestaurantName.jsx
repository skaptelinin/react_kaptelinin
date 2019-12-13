import React from 'react';
import * as constantsModule from './constants';

const RenderRestaurantName = props => {

  const temporaryRestaurantList = JSON.parse(localStorage.getItem(constantsModule.nameOfRestaurantsStorage));
  const currentRestaurant = temporaryRestaurantList.find(item => Number(item.id) === Number(props.id));
  const { name: { itemValue: currentName } } = currentRestaurant;

  return (
    <h1>
            The&nbsp;
      {currentName}
      {' '}
      restaurant
    </h1>
  );
};

export default RenderRestaurantName;
