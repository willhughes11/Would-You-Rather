import { RECEIVE_AUTH_USER } from '../actions/authUser'

export default function authUser(state = null, action) {
    switch (action.type) {
        case RECEIVE_AUTH_USER:
            return action.user

        default:
            return state
    }
}