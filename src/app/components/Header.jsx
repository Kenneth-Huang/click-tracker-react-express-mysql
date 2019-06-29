import React from 'react';
import {connect} from 'react-redux';
import * as action from '../store/actions';
import * as colour from '../constants/color';


const Header = ({changeColour, saveCurrentSessionTracks, removeLastTrack,
				 currentSessionTracks, tracks, dotColour}) => {
	return (
		<div className="d-flex flex-row pt-4 pb-4 mt-1 mb-2 bg-secondary justify-content-between">
			<div className="p-2">Colour</div>
			<button className="p-3 btn btn-success" onClick={()=>changeColour(action.GREEN_COLOUR)}>
				{dotColour===colour.COLOUR_GREEN?'X':' '}
			</button>
			<button className="p-3 btn btn-danger" onClick={()=>changeColour(action.RED_COLOUR)}>
				{dotColour===colour.COLOUR_RED?'X':' '}
			</button>
			<button className="p-3 btn btn-dark" onClick={()=>changeColour(action.BLACK_COLOUR)}>
				{dotColour===colour.COLOUR_BLACK?'X':' '}
			</button>
			<button className="p-3 btn btn-warning" 
					onClick={()=>removeLastTrack()}>
				Undo last click
			</button>
			<button className="p-3 btn btn-warning" 
					onClick={()=>saveCurrentSessionTracks(currentSessionTracks)}>
				Save
			</button>
			<div className="p-2 d-flex flex-column">
			<div className="p-1">
			<span>Totol clicks:</span>{tracks.length+currentSessionTracks.length}
			</div>
			<div className="p-1">
			<span>Current session clicks:</span>{currentSessionTracks.length}
			</div>
			</div>
		</div>
	);
};

function mapStateToProps(state, ownProp){
	return {
		currentSessionTracks:state.currentSessionTracks,
		dotColour:state.dotColour.colour,
		tracks:ownProp.tracks
	};
}

function mapDispatchToProps(dispatch, ownProp){
	return {
		saveCurrentSessionTracks(tracks){
			dispatch(action.saveCurrentSessionTracks(tracks));
		},
		changeColour(colour){
			dispatch(action.changeColour(colour));
		},
		removeLastTrack(){
			dispatch(action.removeLastTrack());
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);

