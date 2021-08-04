import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { homeMapStateToProps } from './MapStateToProps'


class Home extends Component {
    render() {
        return (
            <div>
                <Tabs>
                    <TabList>
                        <Tab>
                            <button className="question-btn"> Unanswered Questions </button>
                        </Tab>
                        <Tab>
                            <button className="question-btn"> Answered Questions </button>
                        </Tab>
                    </TabList>

                    <TabPanel>
                        {this.props.unansweredQuestionIds.length > 0 &&
                        <ul className='home-list'>
                            {this.props.unansweredQuestionIds.map((id) => (
                                <li key={id}>
                                    <Question id={id}></Question>
                                </li>
                            ))}
                        </ul>
                        }
                        {this.props.unansweredQuestionIds.length === 0 &&
                        <ul className='home-list'>
                            <li>
                                You have answered all questions.
                            </li>
                        </ul>
                        }
                    </TabPanel>
                    <TabPanel>
                        {this.props.answeredQuestionIds.length > 0 &&
                        <ul className='home-list'>
                            {this.props.answeredQuestionIds.map((id) => (
                                <li key={id}>
                                    <Question id={id}></Question>
                                </li>
                            ))}
                        </ul>
                        }
                        {this.props.answeredQuestionIds.length === 0 &&
                        <ul className='home-list'>
                            <li>You don't have any questions answered.</li>
                        </ul>
                        }
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}

export default connect(homeMapStateToProps)(Home)