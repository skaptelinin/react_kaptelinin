import React from 'react';
import './App.css';

class FormApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name: {
          val: '',
          edit: false
          },
        description: {
          val: '',
          edit: false
          },
        address: {
          val: '',
          edit: false
          },
        id: Math.random()
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: {
        edit: false,
        val: event.target.value
      }
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.setState({
      id: Math.random(),
      name: {
        val: this.state.name.val.replace(/ {1,}/gu, ' ').trim(),
        edit: false
        },
      description: {
        val: this.state.description.val.replace(/ {1,}/gu, ' ').trim(),
        edit: false
        },
      address: {
        val: this.state.address.val.replace(/ {1,}/gu, ' ').trim(),
        edit: false
        }
    });
    if (this.state.address.val && this.state.description.val && this.state.name.val) {
    this.props.addRestaurant(this.state);
    this.setState({
        name: {
          val: '',
          edit: false
          },
        description: {
          val: '',
          edit: false
          },
        address: {
          val: '',
          edit: false
          }
    })
  }
  }

  render() {
    return(
    <form className="main-form" onSubmit={this.handleSubmit}>
      <input type="text" className="form-controls main-form__name"
      onChange={this.handleChange} required
      name="name" autoComplete="off" value={this.state.name.val}/>

      <input type="text" className="form-controls main-form__address"
      onChange={this.handleChange} required
      name="address" autoComplete="off" value={this.state.address.val}/>

      <input type="text" className="form-controls main-form__description"
      onChange={this.handleChange} required
       name="description" autoComplete="off" value={this.state.description.val}/>

      <button type="submit" className="btn" id="add-new-restaurant">Add</button>
    </form>);
  };
}

export default FormApp;

