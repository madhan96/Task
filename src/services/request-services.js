import {  userService } from './service-calls'
import { setUsersList } from '../actions/userdata';

export const getUsers = () => {
    return (dispatch) => {
        userService((res) => {
            dispatch(setUsersList(res));
        },()=>{
            dispatch(setUsersList([]));
        });
    }
}

