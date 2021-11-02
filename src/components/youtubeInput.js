import React from 'react';

const handleKeyPress = Symbol();

const handleOnChange = Symbol();

export default class Input extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: 'Funny cats'};
		this.setVideos = props.callback.bind(this)
	}
	componentDidMount() {
		gapi.client.request({
			path: 'https://www.googleapis.com/youtube/v3/search',
			params: {
				part: 'snippet',
				q: this.state.value,
				maxResults: 20
			}
		}).then((res) => {
			this.setVideos(res.result.items)
		})
	}
	[handleKeyPress](event) {
		if (event.key === 'Enter') {
			console.log(`Let's make youtube search for "${this.state.value}"`);
		}
	}
	[handleOnChange](event) {
		this.setState({value: event.target.value});
		gapi.client.request({
			path: 'https://www.googleapis.com/youtube/v3/search',
			params: {
				part: 'snippet',
				q: this.state.value,
				maxResults: 20
			}
		}).then((res) => {
			this.setVideos(res.result.items)
		})
	}
	render() {
		return (
			<div>
				<input
				type="text"
				onChange={this[handleOnChange].bind(this)}
				onKeyPress={this[handleKeyPress].bind(this)}
				value={this.state.value}
				/>
			</div>
		);
	}
}