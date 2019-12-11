import React from 'react';

class MenuForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        val: '',
        edit: false,
      },
      rating: null,
      id: Math.random(),
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
    const { props: { addFood: addNewFood } } = this;
    const { state: { name: { val: text } } } = this;

    event.preventDefault();
    await this.setState({
      id: Math.random(),
      name: {
        val: text.replace(/ {1,}/gu, ' ').trim(),
        edit: false,
      },
    });
    if (text) {
      addNewFood(this.state);
      this.setState({
        name: {
          val: '',
          edit: false,
        },
      });
    }
  }

  render() {
    return (
      <form className="main-form" onSubmit={this.handleSubmit}>
        <label
          htmlFor="food-name"
        >
          Enter meal name
          <input
            type="text"
            className="food-form"
            onChange={this.handleChange}
            required
            name="name"
            autoComplete="off"
            value={this.state.name.val}
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

export default MenuForm;

