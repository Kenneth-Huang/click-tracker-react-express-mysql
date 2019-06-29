import React, { Component } from 'react'
import Header from './Header';
import Canvas from './Canvas';
import { connect } from 'react-redux';
import * as actions from '../store/actions';



class Main extends Component {
	constructor(props){
		super(props);
		this.state={
			tracks:[]
		}
	}

	componentDidMount(){
		this.props.fetchAllTracks();
	}

	render() 
	{
		const {loadedTracks, isLoadingTrack}=this.props;
		if(!loadedTracks)
			loadedTracks = [];
		console.log('store.tracks', loadedTracks)
		return (
			<React.Fragment>
				<Header tracks={loadedTracks}/>
				<Canvas tracks={loadedTracks} isLoadingTrack={isLoadingTrack}/>
			</React.Fragment>
		)
	}
}

function mapStateToProps(state, ownProps){
	return {
		loadedTracks:state.loadTracks.dbTracks,
		isLoadingTrack:state.loadTracks.loadingTracks
	};
}

function mapDispatchToProps(dispatch, ownProps){
	return {
		fetchAllTracks(){
			dispatch(actions.isTracksLoading(true));
			setTimeout(() => {
				dispatch(actions.fetchAllTracks());
			}, 1000);
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);