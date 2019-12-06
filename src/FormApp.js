import React from 'react';
import './App.css';

class FormApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        description: '',
        address: '',
        id: Math.random()
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      id: Math.random()
    }); 
    this.props.addRestaurant(this.state);
    this.setState({
        name: '',
        description: '',
        address: '',
    })
  }

  render() {
    return(
    <form className="main-form" onSubmit={this.handleSubmit}>
      <input type="text" className="form-controls main-form__name"
      onChange={this.handleChange} required
      name="name" autoComplete="off" value={this.state.name}/>

      <input type="text" className="form-controls main-form__address"
      onChange={this.handleChange} required
      name="address" autoComplete="off" value={this.state.address}/>

      <input type="text" className="form-controls main-form__description"
      onChange={this.handleChange} required
       name="description" autoComplete="off" value={this.state.description}/>

      <button type="submit" className="btn" id="add-new-restaurant">Add</button>
    </form>);
  };
}

export default FormApp;

