import * as constantsModule from './constants';

const validateInput = text => text.replace(/ {1,}/gu, ' ')
  .replace(/[^a-zA-Zа-яА-Я ]+/gu, '')
  .trim();

const computeRating = currentMenu => {
  let newRating = currentMenu.reduce((current, item) => item.rating + current, 0);

  newRating /= currentMenu.length;
  newRating = parseFloat(newRating.toFixed(1));

  return newRating;
};

const sortByName = restaurantList => {
  restaurantList.sort((aItem, bItem) => {
    if (aItem.name.itemValue > bItem.name.itemValue) {
      return 1;
    }
    if (aItem.name.itemValue < bItem.name.itemValue) {
      return constantsModule.negativeNumberForSorting;
    }

    return 0;
  });

  return restaurantList;
};

const sortByRating = restaurantList => {
  restaurantList.sort((aItem, bItem) => aItem.meanRating - bItem.meanRating);

  return restaurantList;
};

const conditionalSort = restaurantList => {
  const sortingRule = JSON.parse(localStorage.getItem(constantsModule.nameOfSortingRuleStorage));

  if (sortingRule === constantsModule.byNameToMax) {
    const NewRestaurantList = sortByName(restaurantList);

    return NewRestaurantList;
  }

  if (sortingRule === constantsModule.byNameToMin) {
    const NewRestaurantList = sortByName(restaurantList).reverse();

    return NewRestaurantList;
  }

  if (sortingRule === constantsModule.byRatingToMax) {
    const NewRestaurantList = sortByRating(restaurantList);

    return NewRestaurantList;
  }

  const NewRestaurantList = sortByRating(restaurantList).reverse();

  return NewRestaurantList;
};

const updateLocalStorage = (currentId, newMenu) => {
  let temporaryRestaurantList = JSON.parse(localStorage.getItem(constantsModule.nameOfRestaurantsStorage));

  const idOfRestaurant = temporaryRestaurantList.findIndex(element => Number(element.id) === Number(currentId));

  temporaryRestaurantList[idOfRestaurant].menu = newMenu;
  temporaryRestaurantList[idOfRestaurant].meanRating = computeRating(newMenu);
  temporaryRestaurantList = conditionalSort(temporaryRestaurantList);
  localStorage.setItem(constantsModule.nameOfRestaurantsStorage, JSON.stringify(temporaryRestaurantList));
};

const globalUpdate = (restaurantList, sortingRule) => {
  localStorage.setItem(constantsModule.nameOfRestaurantsStorage, JSON.stringify(restaurantList));
  localStorage.setItem(constantsModule.nameOfSortingRuleStorage, JSON.stringify(sortingRule));
};

export { validateInput, computeRating, conditionalSort, sortByName, sortByRating, updateLocalStorage, globalUpdate };
