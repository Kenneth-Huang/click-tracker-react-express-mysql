import axios from 'axios';

const URL = 'http://localhost:8000/tracks';

export const ADD_TRACK = 'ADD_TRACK';
export const REMOVE_TRACK = 'REMOVE_TRACK';
export const CLEAR_TRACKS = 'CLEAR_TRACKS';
export const SAVE_TRACKS = 'SAVE_TRACKS';
export const REFRESH_SCREEN = 'REFRESH_SCREEN';

export const COLOUR_CHANGE ='COLOUR_CHANGE';
export const GREEN_COLOUR = 'GREEN_COLOUR';
export const RED_COLOUR = 'RED_COLOUR';
export const BLACK_COLOUR = 'BLACK_COLOUR';

export const GET_TRACK_DATA = 'GET_TRACK_DATA';
export const COMBINE_TRACK_DATA = 'COMBINE_TRACK_DATA';
export const LOADING_DATA = 'LOADING_DATA';

export const fetchAllTracks = () => {
	return  (dispatch)=>{
		axios.get(URL).then(res=> {
			dispatch(gotTrackData(res.data.data));
			dispatch(isTracksLoading(false));
		}).catch((response) => {
			console.log('Error!')
		});
	}
}

const gotTrackData=(data)=>{
	return ({
		type:GET_TRACK_DATA,
		data
	})
}

export const isTracksLoading=(isLoading)=>({type:LOADING_DATA,data:isLoading});

export const saveCurrentSessionTracks = (tracks) => {
	return (dispatch)=>{
		axios.post(URL,
			{
				data: tracks
			},
			{
				headers: {
					'Content-type': 'application/json',
					'Accept': 'application/json'
				}
			}
		).then((response) => {
				console.log('save data:'+response.data);
				console.log(`current session tracks:${tracks.length} saved`);
				dispatch(combineTrackData(tracks));
				dispatch(clearSessionData());
				
		}).catch((response) => {
				console.log('Error!')
		});
	}
};

const combineTrackData=(data)=>{
	return ({
		type:COMBINE_TRACK_DATA,
		data
	})
}
const clearSessionData=()=>{
	return ({
		type:CLEAR_TRACKS,
	})
}

export const addCurrentTrack = (track) =>{
	return ({
		type:ADD_TRACK,
		data:track
	})
}

export const changeColour = (colour) => ({type:colour});

export const removeLastTrack = () => ({type:REMOVE_TRACK});
