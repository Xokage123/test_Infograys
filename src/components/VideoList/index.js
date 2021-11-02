import React from 'react';
import Video from '../video';

class VideoList extends React.Component {

	constructor(props) {
		super(props);
		console.log(`List of videos: ${props.videos.map((v, i) => `${i + 1}). ${v}`).join(', ')}`);
	}

	/**
	 * Return random video id from the list
	 * @param {Array<string>} videos
	 * @return {string}
	 */
	static getRandomVideo(videos) {
		return /v=([\S]+)/.exec(videos[Math.floor(Math.random() * (videos.length + 1))])[1];
	}

	add() {
		this.props.model.add(VideoList.getRandomVideo(this.props.videos));
	}

	remove(video) {
		this.props.model.remove(video);
	}

	render() {
		const list = this.props.model.videos.map(video => {
			return (
				<li key={video.id}>
					{video.url}
					<button onClick={this.remove.bind(this, video)}>x</button>
				</li>
			);
		}, this);
		const videos = this.props.model.videos.map(video => {
			return (
				<Video
					url={video.url}
					key={video.id}
					videoId={video.videoId}
				/>
			);
		}, this);
		return (
			<div>
				<button className="button addButton" onClick={this.add.bind(this)}>Добавить видео в список</button>
				<ul className="listVideos">
					{
						this.props.model.videos.map(video => {
							return (
								<li className="listVideos_Item" key={video.id}>
									<div className="videoContainer">
										<Video
											url={video.url}
											key={video.id}
											videoId={video.videoId} а
										/>
									</div>
									<div className="linkContainer">
										{video.url}
										<button className="button removeButton" onClick={this.remove.bind(this, video)}>Удалить видео из списка</button>
									</div>
								</li>
							)
						})
					}
				</ul>
			</div>
		);
	}
}

export default VideoList;