import { combineReducers } from 'redux';
import { selectedProducts } from './selectedproducts';
import { users } from './users';

export default combineReducers({ selectedProducts, users });