import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { saveState, loadState } from './utils/localStorage';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
const persistedState = loadState();
const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));
store.subscribe(() => {
  saveState({
    selectedProducts: store.getState().selectedProducts
  });
});
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter >
      <Switch>
        <Route path="/app" component={App} />
        <Redirect exact from="/" to="/app/dashboard" />
      </Switch>
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
