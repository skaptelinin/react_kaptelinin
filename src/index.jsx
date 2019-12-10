import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import RestaurantApp from './RestaurantApp';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
  (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/food/:id" component={RestaurantApp} />
      </Switch>
    </BrowserRouter>
  ), document.getElementById('root')
);

/*
 * If you want your app to work offline and load faster, you can change
 * Unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */
serviceWorker.unregister();
