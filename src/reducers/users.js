const initialState = {
    userList: [],
}
export const users = (state = initialState, action) => {
    switch (action.type) {
        case 'addUserList':
            return { ...state, userList: action.data };

        case 'editUserList':
            let userlist=state.userList;
            let newList=userlist.filter( user => user.id != action.data.id)
            return {userList:[...newList,action.data]}

        
        case 'deleteUser':
            let {userList}=state;
            let newlist=userList.filter( user => user.id != action.data.id)
            return {userList:[...newlist]}
        default:
            return state;


    }
}