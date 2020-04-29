import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';

class Quiz extends Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        question: 'Сколько будет 2*2?',
        rightAnswerId: 2,
        id: 1,
        answers: [
          {text: '5', id: 1},
          {text: '4', id: 2},
          {text: '8', id: 3},
          {text: '2', id: 4}
        ]
      },
      {
        question: 'Сколько будет 3+2?',
        rightAnswerId: 4,
        id: 2,
        answers: [
          {text: '8', id: 1},
          {text: '4', id: 2},
          {text: '9', id: 3},
          {text: '5', id: 4}
        ]
      }
    ]
  }

  onAnswerClickHandler = (answerID) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === 'success'){
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if (question.rightAnswerId === answerID) {
      if (!results[question.id]) {
        results[question.id] = 'success';
        console.log(this.state.results);
      }
      this.setState({
        answerState: {[answerID]: 'success'},
        results
      })

      const timeout = window.setTimeout(()=> {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }
        window.clearTimeout(timeout)
      }, 1000)

    } else {
      results[question.id] = 'error';
      console.log(this.state.results);
      this.setState({
        answerState: {[answerID]: 'error'},
        results
      })
    }
  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    })
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
        <h1>Ответьте на все вопросы</h1>
        {
          this.state.isFinished ? <FinishedQuiz
          results={this.state.results}
          quiz={this.state.quiz}
          onRetry={this.retryHandler}/> : 
          <ActiveQuiz
            answers={this.state.quiz[this.state.activeQuestion].answers}
            question={this.state.quiz[this.state.activeQuestion].question}
            onAnswerClick={this.onAnswerClickHandler}
            quizLength={this.state.quiz.length}
            answerNumber={this.state.activeQuestion + 1}
            state={this.state.answerState}
            />
          }
        </div>
      </div>
    )
  }
}

export default Quiz;