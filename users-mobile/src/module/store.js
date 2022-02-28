import { GET_USERS, GET_USERS_BY_ID } from './action';

export default (state = null, action) => {
    switch (action.type){
        case GET_USERS:
            return {
                users: action.payload.users
            };
        case GET_USERS_BY_ID:
            return {
                user: action.payload.user
            };
        default:
            return { ...state };
    }
}