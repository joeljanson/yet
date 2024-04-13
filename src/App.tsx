import React, { useState } from "react";
import "./App.scss";
import VideoPlayer from "./VideoPlayer"; // Import the VideoPlayer component

const videoUrls = [
	"https://www.youtube-nocookie.com/embed/Dptx55JLQGE?si=3Z5Tno6LilosvD07&amp;start=", //12am - 6am
	"https://www.youtube-nocookie.com/embed/cjSS3jKc54I?si=fG5XbaAWEt1pQabX&amp;start=", //6am - 12pm
	"https://www.youtube-nocookie.com/embed/3a2a0XRXWyo?si=Om4RHmRP5cqIo3iK&amp;start=", //12pm - 6pm
	"https://www.youtube-nocookie.com/embed/wsxZfCJHGbI?si=8uTykOekKDDZFUu0&amp;start=", //6pm - 12am
];

const App: React.FC = () => {
	const [currentVideoUrl, setCurrentVideoUrl] = useState("");

	const selectVideoBasedOnTime = () => {
		const date = new Date(); // Get current date/time
		date.setHours(date.getHours()); // Adjust for GMT+1
		const hours = date.getHours();
		console.log(hours);
		const index = Math.floor(hours / 6);
		const startSeconds =
			((hours % 6) * 60 + date.getMinutes()) * 60 + date.getSeconds();

		setCurrentVideoUrl(
			`${videoUrls[index]}${startSeconds}&autoplay=1&controls=0&modestbranding=1&rel=0`
		);
	};

	return (
		<div className="App">
			{!currentVideoUrl && (
				<div>
					<div className="intro-text">
						<h1>yet</h1>
						<p>
							yet is an online installation by Joel Janson Johansen consisting
							of 24 hours of looping audio and video.
						</p>
					</div>
					<button
						className="start-video-button"
						onClick={selectVideoBasedOnTime}
					>
						Click here to start installation
					</button>
				</div>
			)}
			{currentVideoUrl && <VideoPlayer url={currentVideoUrl} />}
		</div>
	);
};

export default App;
