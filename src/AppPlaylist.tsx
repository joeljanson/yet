// App.tsx
import React, { useState } from "react";
import "./App.scss";
import VideoPlayerPlaylist from "./VideoPlayerPlaylist";

const AppPlaylist: React.FC = () => {
	const [playlistId] = useState("PLce5LQxkC5iXDs166_nK3019giH_6tl2L");
	const [videoIndex, setVideoIndex] = useState<number>(0);

	const selectVideoBasedOnTime = () => {
		const date = new Date();
		const hours = date.getHours();
		const index = Math.floor(hours / 6) + 1;
		setVideoIndex(index);
	};

	return (
		<div className="App">
			<div className="intro-text">
				<h1>yet</h1>
				<p>
					yet is an online installation by Joel Janson Johansen consisting of 24
					hours of looping audio and video.
				</p>
			</div>
			<button className="start-video-button" onClick={selectVideoBasedOnTime}>
				Click here to start installation
			</button>
			<VideoPlayerPlaylist playlistId={playlistId} videoIndex={videoIndex} />
		</div>
	);
};

export default AppPlaylist;
