import { getInitialData } from '../utils/api'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
import { receiveAuthUser} from './authUser'
import { showLoading, hideLoading } from 'react-redux-loading'


export function handleInitialData() {
    return (dispatch, getState) => {
        const { authUser } = getState()
            dispatch(showLoading())
            getInitialData().then(({users, questions}) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(receiveAuthUser(authUser))
                dispatch(hideLoading())
            })
        }
}
