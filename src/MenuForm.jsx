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
    event.preventDefault();
    await this.setState({
      id: Math.random(),
      name: {
        val: this.state.name.val.replace(/ {1,}/gu, ' ').trim(),
        edit: false,
      },
    });
    if (this.state.name.val) {
      this.props.addFood(this.state);
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
        <input
          type="text"
          className="form-controls main-form__name"
          onChange={this.handleChange}
          required
          name="name"
          autoComplete="off"
          value={this.state.name.val}
        />

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

