// VideoPlayer.tsx
import React, { useState } from "react";
import YouTube from "react-youtube";
import "./VideoPlayer.scss";

interface VideoPlayerProps {
	playlistId: string; // ID of the YouTube playlist
	videoIndex: number; // Index of the video in the playlist
}

const VideoPlayerPlaylist: React.FC<VideoPlayerProps> = ({
	playlistId,
	videoIndex,
}) => {
	const [player, setPlayer] = useState<any>(null);
	const [isPlaying, setIsPlaying] = useState(true); // Assume autoplay by default

	const opts = {
		height: "390",
		width: "640",
		playerVars: {
			autoplay: 1,
			controls: 0,
			listType: "playlist",
			list: playlistId,
			index: videoIndex,
			modestbranding: 1,
			rel: 0,
			loop: 1,
		},
	};

	const onReady = (event: { target: any }) => {
		setPlayer(event.target);
	};

	const togglePlayback = () => {
		if (isPlaying) {
			player.pauseVideo();
		} else {
			player.playVideo();
		}
		setIsPlaying(!isPlaying);
	};

	return (
		<div className="main-container">
			<div className="video-responsive">
				<YouTube videoId={playlistId} opts={opts} onReady={onReady} />
				<button onClick={togglePlayback}>{isPlaying ? "Pause" : "Play"}</button>
				<div className="black-bar top"></div>
				<div className="black-bar bottom"></div>
			</div>
		</div>
	);
};

export default VideoPlayerPlaylist;
