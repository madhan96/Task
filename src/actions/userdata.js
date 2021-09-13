export const setUsersList = (data) => {
    return ({ type: 'addUserList', data: data });
}

export const editUserList = (data) =>{
    return ({type:'editUserList',data: data});
}

export const deleteUserInList=(data)=>{
    return({type:'deleteUser',data:data})
}
