import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [feedback, setFeedback] = useState([]);

	const [feedbackEdit, setFeedbackEdit] = useState({
		item: {},
		edit: false,
	});

	useEffect(() => {
		fetchFeedback();
	}, []);

	// fetch feedback
	const fetchFeedback = async () => {
		const response = await fetch("/feedback?_sort=id&_order=desc");
		const data = await response.json();

		setFeedback(data);
		setIsLoading(false);
	};

	// delete feedback
	const deleteFeedback = async (id) => {
		await fetch(`/feedback/${id}`, {
			method: "DELETE",
		});

		setFeedback(feedback.filter((item) => id !== item.id));
	};

	// add feedback
	const addFeedback = async (newFeedback) => {
		const response = await fetch("/feedback", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newFeedback),
		});

		const data = await response.json();

		setFeedback([data, ...feedback]);
	};

	// set item to be updated
	const editFeedback = (item) => {
		setFeedbackEdit({
			item,
			edit: true,
		});
	};

	// update feedback item
	const updateFeedback = async (id, updateItem) => {
		const response = await fetch(`/feedback/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updateItem),
		});

		const data = await response.json();

		setFeedback(
			feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
		);
		setFeedbackEdit({ item: {}, edit: false });
	};

	return (
		<FeedbackContext.Provider
			value={{
				feedback,
				deleteFeedback,
				addFeedback,
				editFeedback,
				feedbackEdit,
				updateFeedback,
				isLoading,
			}}
		>
			{children}
		</FeedbackContext.Provider>
	);
};

export default FeedbackContext;
