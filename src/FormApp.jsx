import React from 'react';
import './App.css';

class FormApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      id: Math.random(),
      meanRating: null,
      menu: [],
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: {
        edit: false,
        val: event.target.value,
      },
    });
  }

  handleSubmit = async event => {
    const { state: { name: { val: nameText } } } = this;
    const { state: { address: { val: addressText } } } = this;
    const { state: { description: { val: descriptionText } } } = this;
    const { props: { addRestaurant: addNewRestaurant } } = this;


    event.preventDefault();
    await this.setState({
      id: Math.random(),
      name: {
        val: nameText.replace(/ {1,}/gu, ' ').trim(),
        edit: false,
      },
      address: {
        val: addressText.replace(/ {1,}/gu, ' ').trim(),
        edit: false,
      },
      description: {
        val: descriptionText.replace(/ {1,}/gu, ' ').trim(),
        edit: false,
      },
      meanRating: null,
      menu: [],
    });
    if (nameText && descriptionText && addressText) {
      addNewRestaurant(this.state);
      this.setState({
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
      });
    }
  }

  render() {
    const { state: { name: { val: restaurantName } } } = this;
    const { state: { address: { val: restaurantAddress } } } = this;
    const { state: { description: { val: restaurantDescription } } } = this;

    return (
      <form
        className="main-form"
        onSubmit={this.handleSubmit}
      >
        <label
          htmlFor="name"
        >
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
        <label
          htmlFor="address"
        >
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
        <label
          htmlFor="description"
        >
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
        <button
          type="submit"
          className="btn"
          id="add-new-restaurant"
        >
           Add
        </button>
      </form>
    );
  }
}

export default FormApp;

