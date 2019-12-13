import React from 'react';
import { validateInput } from './helper';

const initialState = { name: { itemValue: '' } };

class MenuForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      id: Math.random(),
    };
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ name: { itemValue: value } });
  }

  handleSubmit = event => {
    let {
      state: { name: { itemValue: mealName } },
      props: { addFood: addNewFood },
    } = this;

    event.preventDefault();
    mealName = validateInput(mealName);
    this.setState(
      () => ({
        id: Math.random(),
        name: { itemValue: mealName },
      }),
      () => {
        if (mealName) {
          addNewFood(this.state);
          this.setState({ ...initialState });
        }
      }
    );
  }

  render() {
    const { state: { name: { itemValue: mealName } } } = this;

    return (
      <form className="menu-form" onSubmit={this.handleSubmit}>
        <label htmlFor="food-name">
          Enter meal name
          <input
            type="text"
            className="food-form form-control"
            onChange={this.handleChange}
            required
            autoComplete="off"
            value={mealName}
          />
        </label>

        <button type="submit" className="btn">
            Add
        </button>
      </form>
    );
  }
}

export default MenuForm;

