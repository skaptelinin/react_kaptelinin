import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import RestaurantList from './RestaurantList';
import RestaurantApp from './RestaurantApp';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={RestaurantList} />
      <Route path="/food/:id" component={RestaurantApp} />
    </Switch>
  </BrowserRouter>
);

export default App;

