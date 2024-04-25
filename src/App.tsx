// App.tsx
import React, { useState } from "react";
import "./App.scss";
import VideoPlayer from "./VideoPlayer";
import VideoPlayerPlaylist from "./VideoPlayerPlaylist";

const videoIds = [
	"Dptx55JLQGE", // 12am - 6am
	"xjWxll7QpfU", // 6am - 12pm
	"3a2a0XRXWyo", // 12pm - 6pm
	"wsxZfCJHGbI", // 6pm - 12am
];

const App: React.FC = () => {
	const [videoId, setVideoId] = useState("");
	const [startSeconds, setStartSeconds] = useState(0);

	const selectVideoBasedOnTime = () => {
		const date = new Date();
		const hours = date.getHours();
		const index = Math.floor(hours / 6);
		setVideoId(videoIds[index]);

		const calculatedStartSeconds =
			((hours % 6) * 60 + date.getMinutes()) * 60 + date.getSeconds();
		console.log("calculatedStartSeconds first is : ", calculatedStartSeconds);
		setStartSeconds(calculatedStartSeconds);
	};

	return (
		<div className="App">
			{!videoId && (
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
			{videoId && <VideoPlayer videoId={videoId} startSeconds={startSeconds} />}
		</div>
	);
};

export default App;
