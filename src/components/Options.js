import React from 'react'
import {nanoid} from 'nanoid'

export default function Options(props) {
	const { questionIndex, questions, isPlaying, answers, selectAnswer } = props;
	const question = questions[questionIndex]
	return question.options.map((option, index) => {
		let optionClass,
			optionValue = question.options[index];
		if (isPlaying && optionValue === answers[questionIndex]) {
			optionClass = "selected-option"
		} else if (!isPlaying) {
			let optionElement = document.querySelectorAll('.option')[questionIndex * 4 + index],
				correctAnswer = questions[questionIndex].correctAnswer;
			if (optionValue === correctAnswer) {
				optionClass = "correct-answer"
			}
			else if (optionElement.classList.contains('selected-option')) {
				optionClass = "wrong-answer"
			}
		}
		return (
			<button key={nanoid()} className={`option ${optionClass}`}
					value={optionValue}
					onClick={(event) => selectAnswer(event, questionIndex)}
					dangerouslySetInnerHTML={{__html:option}}
					>
				</button>
		)
	})
}