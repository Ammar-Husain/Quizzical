import React, {useState, useEffect} from 'react'
import Options from './options.js'
import {nanoid} from 'nanoid'

export default function Quiz({category, setPage}) {
	const [isPlaying, setIsPlaying] = useState(true)
	const [questions, setQuestions] = useState([])
	const [answers, setAnswers] = useState(['', '', '', '', ''])
	const [result, setResult] = useState({correctAnswers: 0, wrongAnswers: 0, unAnsweredQuestions: 0})
	useEffect(() => {
		if (isPlaying) {
			let url, categoryNumber;
			category === 'general'? categoryNumber=9
			: category === 'scince'? categoryNumber=17
			: category === 'computer'? categoryNumber=18
			: category === 'math'? categoryNumber=19
			: category === 'sport'? categoryNumber=21
			: category === 'geography'? categoryNumber=22
			: category === 'history'? categoryNumber=23
			: category === 'politics'? categoryNumber=24
			: category === 'animals'? categoryNumber=27
			: categoryNumber=31
			url = `https://opentdb.com/api.php?amount=5&category=${categoryNumber}&type=multiple`
			async function fetchTheQuestions() {
				const response = await fetch(url)
				const data = await response.json()
				const questionsData = data.results.map((result) => {
					return {
						question: result.question,
						correctAnswer: result.correct_answer,
						options: shuffle([result.correct_answer, ...result.incorrect_answers]),
						id: nanoid()
					}
				})
				setQuestions(questionsData)
			}
			fetchTheQuestions();
		}
	}, [isPlaying])
	function selectAnswer(event, index) {
		if (isPlaying) {
			let value = event.target.value;
			setAnswers(prevAnswers => {
				let updatedAnswers = [...prevAnswers];
				updatedAnswers[index] = value;
				return updatedAnswers;
			})
		}
		}
	function checkAnswers() {
			let corrects = 0,
			wrongs = 0;
		document.querySelectorAll('.option').forEach((option, index) => {
			const questionInd = Math.floor(index/4);
			const theCorrectAnswer = questions[questionInd].correctAnswer;
			if(option.value === theCorrectAnswer && option.classList.contains('selected-option')) {
					corrects++
			} else if(option.classList.contains('selected-option')) {
				wrongs++
			}
		})
			const unAnswereds = 5 - (corrects + wrongs)
			setResult({correctAnswers: corrects, wrongAnswers: wrongs, unAnsweredQuestions: unAnswereds})
			setIsPlaying(false)
	}
	function playAgain() {
		document.querySelectorAll('.option').forEach(option => {
			option.classList.remove('selected-option')
			option.classList.remove('correct-answer')
			option.classList.remove('wrong-answer')
		})
		setAnswers(['', '', '', '', ''])
		setIsPlaying(true);
	}
	function shuffle(array) {
		const newArray = [];
		array.forEach((item) => {
			const randomIndex = Math.floor(Math.random()*array.length);	
			newArray.splice(randomIndex, 0, item)
		})
		return newArray
	}
	const questionsElementsList =  questions.map((question, index) => {
		let questionIndex = index
		return (
			<div key={question.id} className="question">
				<span className="question-text" dangerouslySetInnerHTML={{__html:question.question}}></span>
				<div className={`options options${index}`}>
				<Options questionIndex={questionIndex} questions={questions} isPlaying={isPlaying} answers={answers} selectAnswer = {selectAnswer}/>
				</div>
			</div>
		)
	})
	if (questionsElementsList.length) {
		return (
			<div className="quiz-page">
						<div className="questions-container">
							{questionsElementsList}
						</div>
						{ isPlaying?
							<button 
							className="check-answers-button"
							onClick={checkAnswers}
								>Check answers
							</button>
							: <div className="result">
								<span>
									You scored <span style={{color: 'green'}}>{result.correctAnswers}</span> correct answers
									and <span style={{color: 'red'}}>{result.wrongAnswers}</span> wrong answers
									{result.unAnsweredQuestions?
										<span> and <span style={{color: 'gray'}}>{result.unAnsweredQuestions}</span> unanswered questions</span>:""
									}
								</span>
								<div>
								<button className="play-again-button"
								onClick={playAgain}>Play again</button>
								<button className="back-home"
								onClick={()=>setPage('start-page')}>Back home</button>
								</div>
							</div>
						}
					</div>	
		)
	} else return (<h1>Loading ...</h1>)
}