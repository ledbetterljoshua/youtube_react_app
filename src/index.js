import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail'
const API_KEY = 'AIzaSyD486Q-8tQYQIyxUsml0AYWOAmle2jY0ZY';

//create Component to spit out html
class App extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			videos: [], 
			stelectedVideo: null 
		};
		this.videoSearch('oh wonder');
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			console.log(videos);
			this.setState({
				videos:videos, 
				stelectedVideo: videos[0]
			});
			//same as this.setState({videos: data});
		});
	}

	render() {
		const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 500);
		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch} />
				<VideoDetail video={this.state.stelectedVideo}  />
				<VideoList
				 onVideoSelect={stelectedVideo => this.setState({stelectedVideo})}
				 videos={this.state.videos} />
			</div>
		);
	}
}



//take generated html and put it on page

ReactDOM.render(<App />, document.querySelector('.container'));