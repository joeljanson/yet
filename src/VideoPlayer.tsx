import React from "react";
import "./VideoPlayer.scss";

interface VideoPlayerProps {
	url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
	return (
		<div className="main-container">
			<div className="video-responsive">
				<iframe
					src={url}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
					title="Embedded youtube"
				/>
				<div className="black-bar top"></div>
				<div className="black-bar bottom"></div>
			</div>
		</div>
	);
};

export default VideoPlayer;
