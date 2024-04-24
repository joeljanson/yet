// VideoPlayer.tsx
import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import "./VideoPlayer.scss";

interface VideoPlayerProps {
	videoId: string;
	startSeconds: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, startSeconds }) => {
	const [player, setPlayer] = useState<any>(null);
	const [isPlaying, setIsPlaying] = useState(false); // State to track if the video is playing

	useEffect(() => {
		const interval = setInterval(() => {
			logTimeRemaining();
		}, 60000); // Check every minute to log remaining time

		// Initial log when the component mounts
		logTimeRemaining();

		return () => clearInterval(interval); // Cleanup on unmount
	}, []);

	const opts = {
		height: "390",
		width: "640",
		playerVars: {
			autoplay: 1, // Autoplay is on by default to match initial state
			controls: 0,
			//start: startSeconds,
			modestbranding: 1,
			rel: 0,
			origin: window.location.origin, // Adding origin for increased compatibility
		},
	};

	const onReady = (event: { target: any }) => {
		setPlayer(event.target);
		setIsPlaying(true); // Set playing state when video is ready and autoplay begins
		event.target.playVideo(); // Ensure video plays from specified startSeconds
		event.target.seekTo(getStartSeconds());
	};

	const togglePlayback = () => {
		if (isPlaying) {
			player.pauseVideo();
		} else {
			if (player.getPlayerState() === 2) {
				// Check if the video is currently paused
				const currentTime = calculateCurrentTime();
				if (currentTime.videoId !== videoId) {
					// If the video ID has changed, load the new video
					player.loadVideoById({
						videoId: currentTime.videoId,
						startSeconds: currentTime.startSeconds,
					});
				} else {
					// If it's the same video, just seek to the new time
					player.seekTo(currentTime.startSeconds);
				}
			}
			player.playVideo();
		}
		setIsPlaying(!isPlaying);
	};

	const logTimeRemaining = () => {
		const currentTime = new Date();
		const currentHour = currentTime.getHours();
		const currentMinute = currentTime.getMinutes();

		// Determine the next segment hour: 6, 12, 18, or 24 (0 for next day)
		const nextSegmentHour = ((Math.floor(currentHour / 6) + 1) * 6) % 24;

		// Calculate total minutes passed in the day
		const totalMinutesCurrent = currentHour * 60 + currentMinute;

		// Total minutes for the next segment starting hour
		let totalMinutesNextSegmentStart = nextSegmentHour * 60;

		// If the next segment hour is 0 (midnight), set it to 24 hours (1440 minutes)
		if (nextSegmentHour === 0) {
			totalMinutesNextSegmentStart = 1440;
		}

		// Calculate the difference
		const timeLeftMinutes = totalMinutesNextSegmentStart - totalMinutesCurrent;

		console.log(
			`Time left until next video segment: ${timeLeftMinutes} minutes`
		);
	};

	return (
		<div className="main-container">
			<div className="video-responsive">
				<YouTube
					videoId={videoId}
					opts={opts}
					onReady={onReady}
					onStateChange={(e) => {
						if (e.data === YouTube.PlayerState.UNSTARTED) {
							e.target.seekTo(startSeconds);
						}
					}}
				/>
				<button className="pause-play" onClick={togglePlayback}>
					{isPlaying ? "" : "video || paused"}
				</button>
				<div className="black-bar top"></div>
				<div className="black-bar bottom"></div>
			</div>
		</div>
	);
};

function calculateCurrentTime() {
	const date = new Date();
	const hours = date.getHours();
	const index = Math.floor(hours / 6);
	const videoIds = [
		"Dptx55JLQGE", // 12am - 6am
		"xjWxll7QpfU", // 6am - 12pm
		"3a2a0XRXWyo", // 12pm - 6pm
		"wsxZfCJHGbI", // 6pm - 12am
	];
	const startSeconds =
		((hours % 6) * 60 + date.getMinutes()) * 60 + date.getSeconds();

	return { videoId: videoIds[index], startSeconds };
}

function getStartSeconds() {
	const date = new Date();
	const hours = date.getHours();
	const startSeconds =
		((hours % 6) * 60 + date.getMinutes()) * 60 + date.getSeconds();
	return startSeconds;
}

export default VideoPlayer;
