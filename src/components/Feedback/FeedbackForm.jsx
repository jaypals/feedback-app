import { useState, useContext, useEffect } from "react";
import Card from "../../shared/Card";
import Button from "../../shared/Button";
import Rating from "../Rating/Rating";
import FeedbackContext from "../../context/FeedbackContext";

function FeedbackForm() {
	const [text, setText] = useState("");
	const [btnDisabled, setbtnDisabled] = useState(true);
	const [message, setMessage] = useState("");
	const [rating, setRating] = useState(10);

	const { addFeedback, feedbackEdit, updateFeedback } =
		useContext(FeedbackContext);

	useEffect(() => {
		if (feedbackEdit.edit === true) {
			setbtnDisabled(false);
			setText(feedbackEdit.item.text);
			setRating(feedbackEdit.item.rating);
		}
	}, [feedbackEdit]);

	const handleChange = (e) => {
		setText(e.target.value);
	};

	const handleFormValid = () => {
		if (text === "") {
			setbtnDisabled(true);
			setMessage(null);
		} else if (text.trim().length < 10 && text !== "") {
			setbtnDisabled(true);
			setMessage("Review must be at least 10 characters or above!");
		} else {
			setbtnDisabled(false);
			setMessage(null);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (text.trim().length > 10) {
			const newFeedback = {
				text,
				rating,
			};

			if (feedbackEdit.edit === true) {
				updateFeedback(feedbackEdit.item.id, newFeedback);
			} else {
				addFeedback(newFeedback);
			}
			setText("");
			setbtnDisabled(true);
		}
	};

	return (
		<Card>
			<form onSubmit={handleSubmit}>
				<h2>How would you rate your service with us?</h2>
				<Rating select={(rating) => setRating(rating)} />
				<div className='input-group'>
					<input
						type='text'
						placeholder='Write a review'
						onChange={handleChange}
						value={text}
						onKeyUp={handleFormValid}
					/>
					<Button type='submit' isDiabled={btnDisabled}>
						Send
					</Button>
				</div>
				{message && <div className='message'>{message}</div>}
			</form>
		</Card>
	);
}

export default FeedbackForm;
