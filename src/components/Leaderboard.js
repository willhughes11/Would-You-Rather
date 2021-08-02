import React, { Component } from 'react'
import { connect } from 'react-redux'
import Avatar from 'react-avatar'
import { leaderboardMapStateToProps } from './MapStateToProps'


class Leaderboard extends Component {
    render() {
        const { leaderboardUsers } = this.props

        return (
        <ul className='home-list'>
            {leaderboardUsers.map((user) => (
                <div className='question' key={user.id}>
                    <Avatar name={user.id} />
                    <div className='question-info'>
                        <div>
                            <span> {user.name} </span>
                            <div> Asked : {user.questions} </div>
                            <div> Answered : {user.answers} </div>
                            <div> Score: {user.score} </div>
                        </div>
                    </div>
                </div>
            ))}
        </ul>
        )
    }
}

export default connect(leaderboardMapStateToProps)(Leaderboard)