import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer
} from './_DATA';

export function getInitialData() {
    return Promise.all([_getUsers(), _getQuestions()]).then(
      ([users, questions]) => ({
        users,
        questions
      })
    );
  }

// export async function getInitialData() {
//     let values = await Promise.all([_getUsers(), _getQuestions()]);
//     ([users,questions]) => ({
//         users,
//         questions
//     })
//     return values
// }

// export async function saveQuestion(info) {
//     return await _saveQuestion(info)
// }

export function saveQuestion(info) {
    return _saveQuestion(info);
  }

// export async function saveQuestionAnswer(info) {
//     return await _saveQuestionAnswer(info)
// }

export function saveQuestionAnswer(info) {
    return _saveQuestionAnswer(info);
  }