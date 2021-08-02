import { getInitialData } from '../utils/api'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
import { receiveAuthUser} from './authUser'


export function handleInitialData() {
    return (dispatch, getState) => {
        const { authUser } = getState()
            getInitialData().then(({users, questions}) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(receiveAuthUser(authUser))
            })
        }
}
