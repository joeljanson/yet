import React, { useState, useEffect, useRef } from "react";
import "./VideoPlayer.scss";

interface VideoPlayerProps {
	videoId: string;
	startSeconds: number;
}

declare global {
	interface Window {
		YT: any;
		onYouTubeIframeAPIReady: () => void;
	}
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, startSeconds }) => {
	const playerRef = useRef<HTMLDivElement>(null);
	const [player, setPlayer] = useState<YT.Player | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	// Helper function to initialize the YouTube player
	const initializePlayer = () => {
		const newPlayer = new window.YT.Player(playerRef.current!, {
			height: "390",
			width: "640",
			videoId: videoId,
			playerVars: {
				autoplay: 1,
				controls: 0,
				rel: 0,
				modestBranding: 1,
				start: startSeconds,
				origin: window.location.origin,
				host: "https://www.youtube-nocookie.com",
			},
			events: {
				onReady: onPlayerReady,
				onStateChange: onPlayerStateChange,
			},
		});
		setPlayer(newPlayer);
	};

	useEffect(() => {
		const tag = document.createElement("script");
		tag.src = "https://www.youtube.com/iframe_api";
		const firstScriptTag = document.getElementsByTagName("script")[0];

		// Ensure the parent node exists before inserting the new script tag
		if (firstScriptTag && firstScriptTag.parentNode) {
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		} else {
			// Optionally handle the case where the script cannot be inserted
			console.error(
				"Failed to load the YouTube API script because the script tag or its parent node is missing."
			);
		}

		window.onYouTubeIframeAPIReady = initializePlayer;

		return () => {
			if (player) player.destroy();
		};
	}, [videoId, startSeconds]);

	const onPlayerReady = (event: YT.PlayerEvent) => {
		setIsPlaying(true);
		event.target.playVideo();
	};

	const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
		if (event.data === window.YT.PlayerState.PAUSED) {
			setIsPlaying(false);
		} else if (event.data === window.YT.PlayerState.PLAYING) {
			setIsPlaying(true);
		}
	};

	const togglePlayback = () => {
		if (!player) return;
		if (isPlaying) {
			player.pauseVideo();
		} else {
			player.playVideo();
		}
		setIsPlaying(!isPlaying);
	};

	const logTimeRemaining = () => {
		const currentTime = new Date();
		const currentHour = currentTime.getHours();
		const currentMinute = currentTime.getMinutes();
		const nextSegmentHour = ((Math.floor(currentHour / 6) + 1) * 6) % 24;
		const totalMinutesCurrent = currentHour * 60 + currentMinute;
		let totalMinutesNextSegmentStart = nextSegmentHour * 60;

		if (nextSegmentHour === 0) {
			totalMinutesNextSegmentStart = 1440;
		}

		const timeLeftMinutes = totalMinutesNextSegmentStart - totalMinutesCurrent;
		console.log(
			`Time left until next video segment: ${timeLeftMinutes} minutes`
		);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			logTimeRemaining();
		}, 60000);

		logTimeRemaining();

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="main-container">
			<div className="video-responsive">
				<div id="player" ref={playerRef}></div>
				<button
					onClick={togglePlayback}
					className={isPlaying ? "pause-play" : "pause-play paused"}
				>
					{isPlaying ? "" : "video || paused"}
				</button>
				<div className="black-bar top"></div>
				<div className="black-bar bottom"></div>
			</div>
		</div>
	);
};

export default VideoPlayer;
