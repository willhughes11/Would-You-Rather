export function leaderboardMapStateToProps({ users }) {
    return {
        leaderboardUsers: Object.keys(users)
            .map((user) => {
                return {
                    id: user,
                    name: users[user].name,
                    answers: Object.keys(users[user].answers).length,
                    questions: users[user].questions.length,
                    score: Object.keys(users[user].answers).length + users[user].questions.length
                };
            }).sort((a, b) => b.score - a.score)
    };
}

export function loginMapStateToProps({ users }) {
    return {
        users
    };
}

export function navMapStateToProps ({authUser}) {
    return {
        loggedIn: authUser !== null,
        authUser
    }
}

export function privateRouteMapStateToProps({ authUser }) {
    const authenticated = authUser !== null

    return {
        authenticated
    }
}

export function questionMapStateToProps ({authUser, questions}, { id }) {
    const question = questions[id]

    return {
        authUser,
        question: question
    }
}

export function questionsMapStateToProps ({authUser, questions}, props) {
    const { id } = props.match.params;
    const question = questions[id]
    let answered = false
    if (question) {
        answered = question.optionOne.votes.indexOf(authUser) !== -1 || question.optionTwo.votes.indexOf(authUser) !== -1
    }

    return { id,question,authUser,answered }
}

export function notFoundMapStateToProps({ users }) {
    return {
        users,
    };
}

export function homeMapStateToProps({questions, authUser}) {
    return {
        authUser: authUser,
        answeredQuestionIds: Object.keys(questions)
            .filter((question) => {
                let optionOne = questions[question].optionOne.votes.indexOf(authUser) !== -1;
                let optionTwo = questions[question].optionTwo.votes.indexOf(authUser) !== -1;
                return optionOne || optionTwo
            })
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
        unansweredQuestionIds: Object.keys(questions)
            .filter((question) => {
                let optionOne = questions[question].optionOne.votes.indexOf(authUser) === -1;
                let optionTwo = questions[question].optionTwo.votes.indexOf(authUser) === -1;
                return optionOne && optionTwo
            })
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    }
}