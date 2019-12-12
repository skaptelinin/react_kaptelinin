import React from 'react';
import './App.css';
import validateInput from './helper';

const initialState = {
  name: {
    val: '',
    edit: false,
  },
  address: {
    val: '',
    edit: false,
  },
  description: {
    val: '',
    edit: false,
  },
};

class FormApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actualState: initialState,
      id: Math.random(),
      meanRating: null,
      menu: [],
    };
  }

  handleChange = event => {
    this.setState({
      actualState: {
        [event.target.name]: {
          edit: false,
          val: event.target.value,
        },
      },
    });
  }

  handleSubmit = async event => {
    let {
      state: {
        actualState: {
          name: { val: restaurantName },
          address: { val: restaurantAddress },
          description: { val: restaurantDescription },
        },
      },
      props: { addRestaurant: addNewRestaurant },
    } = this;

    event.preventDefault();
    restaurantName = validateInput(restaurantName);
    restaurantAddress = validateInput(restaurantAddress);
    restaurantDescription = validateInput(restaurantDescription);
    await this.setState({
      actualState: {
        name: {
          val: restaurantName,
          edit: false,
        },
        address: {
          val: restaurantAddress,
          edit: false,
        },
        description: {
          val: restaurantDescription,
          edit: false,
        },
      },
      id: Math.random(),
      meanRating: null,
      menu: [],
    });
    if (restaurantName && restaurantDescription && restaurantAddress) {
      addNewRestaurant(this.state);
      this.setState({ actualState: initialState });
    }
  }

  render() {
    const {
      state: {
        actualState: {
          name: { val: restaurantName },
          address: { val: restaurantAddress },
          description: { val: restaurantDescription },
        },
      },
    } = this;

    return (
      <form className="main-form" onSubmit={this.handleSubmit}>
        <label htmlFor="name">
          Enter restaurant name
          <input
            type="text"
            className="form-control main-form__name"
            onChange={this.handleChange}
            required
            name="name"
            autoComplete="off"
            value={restaurantName}
          />
        </label>
        <label htmlFor="address">
          Enter restaurant address
          <input
            type="text"
            className="form-control main-form__address"
            onChange={this.handleChange}
            required
            name="address"
            autoComplete="off"
            value={restaurantAddress}
          />
        </label>
        <label htmlFor="description">
          Enter restaurant description
          <input
            type="text"
            className="form-control main-form__description"
            onChange={this.handleChange}
            required
            name="description"
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

