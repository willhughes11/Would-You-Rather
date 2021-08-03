import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import { questionMapStateToProps } from './MapStateToProps';


class Question extends Component {
    render() {
        const { question } = this.props

        if (!question) {
            return <p>Question Not Found!</p>
        } else {
            
            const { id, author, optionOne, optionTwo } = question
    
            return (
                <Link to={`/question/${id}`} className='question'>
                    <Avatar name={author} />
                    <div className='question-info'>
                        <div>
                            <span>{author}</span>
                            <p>{optionOne.text} OR {optionTwo.text}</p>
                        </div>
                    </div>
                </Link>
            )
        }
    }
}

export default connect(questionMapStateToProps)(Question)