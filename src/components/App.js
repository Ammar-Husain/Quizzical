import React, {useState, useEffect} from 'react'
import StartPage from './StartPage.js'
import Quiz from './Quiz.js'
export default function App() {
	const [page, setPage] = useState('start-page');
	const [category, setCategory] = useState('general');
	
	function selectCategory(event) {
		let value = event.target.value
		setCategory(value)
	}		
	function startQuiz() {
		setPage('quiz-page')
	}
	
	if (page === 'start-page') {
		return (
			<main className="start-page">
				<StartPage 
				selectCategory={selectCategory}
				startQuiz={startQuiz}
				category={category}
				/>
			</main>
		)
	} else {
		return (
		<main>
			<Quiz
			category={category}
			setPage={setPage}/>
		</main>
		)
	}
}