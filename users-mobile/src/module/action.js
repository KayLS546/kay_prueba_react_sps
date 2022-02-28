import axios from 'axios';

export function getUsers(){
    return (dispatch) => {
        return axios.get('https://reqres.in/api/users')
        .then((response) => {
            dispatch(setUsers(response.data));
        }).catch((error) => {
            console.error("Error",error);
        });
    };
}

export function getUserById(idUser){
    return (dispatch) => {
        return axios.get('https://reqres.in/api/users/'+idUser)
        .then((response) => {
            dispatch(setUsersById(response.data));
        }).catch((error) => {
            console.error("Error",error);
        });
    };
}

export const GET_USERS = "GET_USERS";
export const setUsers = (users) => ({
    type: GET_USERS,
    payload: { users }
})
export const GET_USERS_BY_ID = "GET_USERS_BY_ID";
export const setUsersById = (user) => ({
    type: GET_USERS_BY_ID,
    payload: { user }
})
