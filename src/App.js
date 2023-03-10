import Header from "./components//Header/Header";
import FeedbackList from "./components/Feedback/FeedbackList";
import FeedbackStats from "./components/Feedback/FeedbackStats";
import FeedbackForm from "./components/Feedback/FeedbackForm";
import AboutPage from "./Pages/AboutPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutIconLink from "./shared/AboutIconLink";
import { FeedbackProvider } from "./context/FeedbackContext";

function App() {
	return (
		<FeedbackProvider>
			<BrowserRouter>
				<Header />
				<div className='container'>
					<Routes>
						<Route
							exact
							path='/'
							element={
								<>
									<FeedbackForm />
									<FeedbackStats />
									<FeedbackList />
									<AboutIconLink />
								</>
							}
						/>
						<Route exact path='/about' element={<AboutPage />} />
					</Routes>
				</div>
			</BrowserRouter>
		</FeedbackProvider>
	);
}

export default App;
