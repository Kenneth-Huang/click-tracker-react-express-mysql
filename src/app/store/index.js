import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import {createLogger} from 'redux-logger';
import * as actions from './actions';

const reducers = combineReducers({
	currentSessionTracks(currentSessionTracks=[],action){
		switch(action.type){
			case actions.ADD_TRACK:
				return [...currentSessionTracks, action.data];
			case actions.CLEAR_TRACKS:
				return []
			case actions.REMOVE_TRACK:
				if(currentSessionTracks.length)
					currentSessionTracks.pop();
				return [...currentSessionTracks];
		}
		return currentSessionTracks;
	},
	dotColour(dotColour={colour:'green'},action){
		switch(action.type){
			case actions.GREEN_COLOUR:
				return {colour:'green'};
			case actions.BLACK_COLOUR:
				return {colour:'black'};
			case actions.RED_COLOUR:
				return {colour:'red'};
		}
		return dotColour;
	},
	loadTracks(loadTracks={dbTracks:[],loadingTracks:false},action){
		switch(action.type){
			case actions.GET_TRACK_DATA:
				return {dbTracks:action.data};
			case actions.COMBINE_TRACK_DATA:
				let dbTracks = loadTracks.dbTracks.concat(action.data);
				return {...loadTracks,dbTracks};
			case actions.LOADING_DATA:
				return {...loadTracks, loadingTracks:action.data};
		}
		return loadTracks;
	}
})


export const store = createStore(
	reducers,
	applyMiddleware(createLogger()
	, thunk
	)
);