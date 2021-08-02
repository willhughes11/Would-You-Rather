import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { receiveUsers } from './users'


export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION';


export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function handleAddQuestion(text1, text2) {
    return (dispatch, getState) => {
        const { authUser } = getState()
        dispatch(showLoading())
        return saveQuestion ({
            optionOneText: text1,
            optionTwoText: text2,
            author: authUser
        }).then((res) => {
            dispatch(addQuestion(res.formattedQuestion))
            dispatch(receiveUsers(res.users))
            dispatch(hideLoading())
        })
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