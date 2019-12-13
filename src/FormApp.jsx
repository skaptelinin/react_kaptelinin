import React from 'react';
import './App.css';
import { validateInput } from './helper';
import { name, address, description } from './constants';

const initialState = {
  name: { itemValue: '' },
  address: { itemValue: '' },
  description: { itemValue: '' },
};

class FormApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      id: Math.random(),
    };
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: { itemValue: value } });
  }

  handleSubmit = event => {
    let {
      state: {
        name: { itemValue: restaurantName },
        address: { itemValue: restaurantAddress },
        description: { itemValue: restaurantDescription },
      },
      props: { addRestaurant: addNewRestaurant },
    } = this;

    event.preventDefault();
    restaurantName = validateInput(restaurantName);
    restaurantAddress = validateInput(restaurantAddress);
    restaurantDescription = validateInput(restaurantDescription);
    this.setState(
      () => ({
        name: { itemValue: restaurantName },
        address: { itemValue: restaurantAddress },
        description: { itemValue: restaurantDescription },
        id: Math.random(),
        meanRating: null,
      }),
      () => {
        if (restaurantName && restaurantDescription && restaurantAddress) {
          addNewRestaurant(this.state);
          this.setState({ ...initialState });
        }
      }
    );
  }

  render() {
    const {
      state: {
        name: { itemValue: restaurantName },
        address: { itemValue: restaurantAddress },
        description: { itemValue: restaurantDescription },
      },
    } = this;

    return (
      <form className="main-form" onSubmit={this.handleSubmit}>
        <label htmlFor={name}>
          Enter restaurant name
          <input
            type="text"
            className="form-control main-form__name"
            onChange={this.handleChange}
            required
            name={name}
            autoComplete="off"
            value={restaurantName}
          />
        </label>
        <label htmlFor={address}>
          Enter restaurant address
          <input
            type="text"
            className="form-control main-form__address"
            onChange={this.handleChange}
            required
            name={address}
            autoComplete="off"
            value={restaurantAddress}
          />
        </label>
        <label htmlFor={description}>
          Enter restaurant description
          <input
            type="text"
            className="form-control main-form__description"
            onChange={this.handleChange}
            required
            name={description}
            autoComplete="off"
            value={restaurantDescription}
          />
        </label>
        <button type="submit" className="btn">
           Add
        </button>
      </form>
    );
  }
}

export default FormApp;

