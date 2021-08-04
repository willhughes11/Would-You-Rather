import { saveQuestionAnswer } from '../utils/api';
import { receiveQuestions } from './questions';

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function answerQuestion(authUser, qid, answer) {
    return {
        type: ANSWER_QUESTION,
        authUser,
        qid,
        answer,
    };
}

export function handleAnswerQuestion(authUser, qid, answer) {
    return function(dispatch) {
        const answerInfo = {
            authUser,
            qid,
            answer,
        };

        return saveQuestionAnswer(answerInfo)
            .then(function(res) {
                dispatch((answerQuestion(authUser, qid, answer)))
                dispatch(receiveUsers(res.users))
                dispatch(receiveQuestions(res.questions))
            })
    }
}