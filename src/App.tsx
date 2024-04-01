import React, { useState } from "react";
import "./App.scss";
import VideoPlayer from "./VideoPlayer"; // Import the VideoPlayer component

const videoUrls = [
	"https://www.youtube-nocookie.com/embed/7DiEyqEdqmM?si=kLJhZlh-mYAvQbds&amp;start=",
	"https://www.youtube-nocookie.com/embed/dBAHjZwXKFo?si=jxENG8XRi7dWXTV-&amp;start=",
	"https://www.youtube-nocookie.com/embed/7DiEyqEdqmM?si=kLJhZlh-mYAvQbds&amp;start=",
	"https://www.youtube-nocookie.com/embed/7DiEyqEdqmM?si=kLJhZlh-mYAvQbds&amp;start=",
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
		//const startSeconds = 60 * (date.getMinutes() / 60);

		setCurrentVideoUrl(
			`${videoUrls[index]}${startSeconds}&autoplay=1&controls=0&modestbranding=1&rel=0`
		);
	};

	return (
		<div className="App">
			{!currentVideoUrl && (
				<button className="start-video-button" onClick={selectVideoBasedOnTime}>
					Start Video
				</button>
			)}
			{currentVideoUrl && <VideoPlayer url={currentVideoUrl} />}
		</div>
	);
};

export default App;
