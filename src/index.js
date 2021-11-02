import React, { useState } from 'react';
import { render } from 'react-dom';
import VideoList from './components/videoList';
import VideoModel from './models/video';
import Input from './components/youtubeInput';

import './styles/style.css';

const model = window.model = new VideoModel();


const App = (props) => {
	const [videos, setVideos] = useState([])
	return (
		<div>
			<h3>Test task</h3>
			<Input callback={(array) => {
				const transformValue = array.map((video) => {
					return `https://www.youtube.com/watch?v=${video.id.videoId}`
				})
				setVideos(() => {
					return transformValue
				})
			}} />
			<VideoList model={model} videos={videos} />
		</div>
	)
};

const renderApp = () => {
	render(<App />, document.getElementById('app'));
}

model.on('change', renderApp);

renderApp();
