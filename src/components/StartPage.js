import React from 'react'

export default function StartPage({ selectCategory, startQuiz, category }) {
	return (
		<div className = "start-page-content">
			<span className="game-name">Quizzical</span>
			<span className="description">
				five MCQs in the topic you choose, test your knowledge! 
			</span>
			<select className="select-category"
			onChange={selectCategory}
			value={category} >
				<option value="general">General</option>
				<option value="scince">Since</option>
				<option value="computer">Computer Scince</option>
				<option value="math">Mathmetics</option>
				<option value="sport">Sport</option>
				<option value="history">history</option>
				<option value="geography">geography</option>
				<option value="politics">politics</option>
				<option value="animals">animals</option>
				<option value="anime">Anime and Manga</option>
			</select>
			<button className="start-quizz-button" onClick={startQuiz}>Start quiz</button>
		</div>
	)
}