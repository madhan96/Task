function CustomException(err) {
    this.message = err.message;
    this.name = err.name;
    this.errorName = err.errorName;
}


export const userService = (callBackSuc, callbackFail) => {
    fetch('https://gorest.co.in/public/v1/users', {
        method: 'GET'
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Invalid Input')
        };
    })
        .then((result) => {
            callBackSuc(result.data);
        })
        .catch((error) => {
            alert('An Error Occured: Please try Again!');
            callbackFail();
        });
}

export const createUser = (data, callBackSuc, callbackFail) => {
    fetch('https://gorest.co.in/public/v1/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(async (response) => {
            let res = await response.json()
            if (response.ok) {
                return res;
            } else {
                throw new CustomException(res.data);
            }
        })
        .then((result) => {
            //console.log('Success:', result);
            callBackSuc();
        })
        .catch((error) => {            
            alert(error.message);
            callbackFail();
        });
}

export const editUser = (id,data, callBackSuc, callbackFail) => {
    fetch(`https://gorest.co.in/public/v1/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(async (response) => {
        let res = await response.json()
        if (response.ok) {
            return res;
        } else {
            throw new CustomException(res.data);
        }
    })
    .then((result) => {
        callBackSuc();
    })
    .catch((error) => {            
        alert(error.message);
        callbackFail();
    });
}

export const deleteUser = (id,data, callBackSuc, callbackFail) => {
    fetch(`https://gorest.co.in/public/v1/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(async (response) => {
        let res = await response.json()
        if (response.ok) {
            return res;
        } else {
            throw new CustomException(res.data);
        }
    })
    .then((result) => {
        callBackSuc();
    })
    .catch((error) => {            
        alert(error.message);
        callbackFail();
    });
}

