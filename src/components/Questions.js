import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Avatar from 'react-avatar';
import { handleAnswerQuestion } from '../actions/questions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { questionsMapStateToProps } from './MapStateToProps';

class Questions extends Component {

    state = {
        answered: this.props.answered,
        selectedOption: ''
    }

    _handleOptionChange = (changeEvent) => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    };

    get handleOptionChange() {
        return this._handleOptionChange;
    }

    set handleOptionChange(value) {
        this._handleOptionChange = value;
    }

    _handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(handleAnswerQuestion(this.props.authUser, this.props.question.id, this.state.selectedOption));
        this.setState(() => ({
            answered: true
        }));
    };

    get handleSubmit() {
        return this._handleSubmit;
    }

    set handleSubmit(value) {
        this._handleSubmit = value;
    }

    render() {
        const { question } = this.props

        if (!question) {
            return (<Redirect from='*' to='/not-found' />)
        } else{
            const { author, optionOne, optionTwo } = question

            return (
                <div className='question'>
                    <Avatar name={author} />
                    <div className='question-info'>
                        {this.state.answered &&
                            <div>
                                <span>{author} asks</span>
                                <div> Questions </div>
                                <div style={{margin: '10px', padding: '10px'}}>
                                    <div>{optionOne.text}  {question.optionOne.votes.indexOf(this.props.authUser) !== -1 &&
                                            <FontAwesomeIcon icon={faCheckCircle} color='green' />
                                    } </div>
                                    <div>
                                        Total Number of Votes: {question.optionOne.votes.length}
                                    </div>
                                    <div>
                                        Vote Percentage: {question.optionOne.votes.length/(question.optionOne.votes.length + question.optionTwo.votes.length) * 100}%
                                    </div>
    
                                </div>
                                <div> OR </div>
                                <div style={{margin: '10px', padding: '10px'}}>
                                    <div>{optionTwo.text} {question.optionTwo.votes.indexOf(this.props.authUser) !== -1 &&
                                    <FontAwesomeIcon icon={faCheckCircle} color='green'/>
                                    }</div>
                                    <div>
                                        Total Number Of Votes: {question.optionTwo.votes.length}
                                    </div>
                                    <div>
                                        Vote Percentage: {question.optionTwo.votes.length/(question.optionOne.votes.length + question.optionTwo.votes.length) * 100}%
                                    </div>
    
                                </div>
                            </div>
                        }
                        {!this.state.answered &&
                        <form onSubmit={this.handleSubmit}>
                            <div>Questions</div>
                            <div className="radio">
                                <label>
                                    <input type="radio" value="optionOne"
                                           checked={this.state.selectedOption === 'optionOne'}
                                           onChange={this.handleOptionChange} />
                                    {optionOne.text}                            </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input type="radio" value="optionTwo"
                                           checked={this.state.selectedOption === 'optionTwo'}
                                           onChange={this.handleOptionChange} />
                                    {optionTwo.text}
                                </label>
                            </div>
                            <button
                                className='btn'
                                type='submit'
                                disabled={this.state.selectedOption === ''}>
                                VOTE
                            </button>
                        </form>
                        }
                    </div>
                </div>
            )
        }
    }
}

export default connect(questionsMapStateToProps)(Questions)