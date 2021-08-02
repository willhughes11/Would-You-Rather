import React, { Component } from 'react'
import { handleAddQuestion } from '../actions/questions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class AddQuestion extends Component {

    state = {
        textOne: '',
        textTwo: '',
        home: false
    }
    
    handleTextOneChange = (e) => {
        const textOne = e.target.value
        this.setState(() => ({
            textOne
        }))
    }

    handleTextTwoChange = (e) => {
        const textTwo = e.target.value

        this.setState(() => ({
            textTwo
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { textOne, textTwo } = this.state
        const { dispatch } = this.props

        dispatch(handleAddQuestion(textOne, textTwo))
        this.setState(() => ({
            textOne: '',
            textTwo: '',
            home: true,
        }))
    }

    render() {
        const { textOne, textTwo, home } = this.state

        if (home) {
            return (<Redirect to='/' />)
        } else {
            return (
                <div>
                    <h3 className='center'>Would You Rather This or That?</h3>
                    <form className='new-question' onSubmit={this.handleSubmit}>
                        <TextBox 
                            placeholder="This?" 
                            value={textOne} 
                            onChange={this.handleTextOneChange} 
                            className="input" 
                            maxLength={280}>
                        </TextBox>
                        <div className="center margin">OR</div>
                        <TextBox 
                            placeholder="That?" 
                            value={textTwo} 
                            onChange={this.handleTextTwoChange} 
                            className="input" maxLength={280}>
                        </TextBox>
                        <button
                            className='btn'
                            type='submit'
                            disabled={textOne.trim() === '' || textTwo.trim() === ''}>
                            Add
                        </button>
                    </form>
                </div>
            )
        }
    }
}

const TextBox = ({placeholder,value,onChange,className,maxLength}) =>(
        <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
        maxLength={maxLength}
        >
        </input>
    )

export default connect()(AddQuestion)