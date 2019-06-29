import React from "react";
import { connect } from "react-redux";
import * as actions from '../store/actions';

class Canvas extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			x: 0,
			y: 0
		};
	}

	drawTracks(isLoadingTrack, tracks) {
		if (isLoadingTrack)
			return (<text x={500} y={200}>Loading...</text>);
		return tracks.map(({ id, colour, x, y }) => {
			if(!id)
				id = Math.random();
			return <circle key={id} cx={x} cy={y} r={10} fill={colour} />
		});
	}

	render() {
		const { x, y } = this.state;
		const { isLoadingTrack, tracks, currentSessionTracks, addCurrentTrack, colour} = this.props;
		console.log("isLoadingTrack", isLoadingTrack);
		return (
			<React.Fragment>
				<div
					className="container"
					onClick={
						(e)=>{
							let x = e.nativeEvent.offsetX;
							let y = e.nativeEvent.offsetY;
							addCurrentTrack({colour,x,y});
							this.setState({ x, y });
						}
					}
					style={{
						width: "100%",
						height: "400px",
						backgroundColor: "yellow"
					}}
				>
					<svg style={{ width: "100%", height: "400px" }}>
						{this.drawTracks(isLoadingTrack, tracks.concat(currentSessionTracks))}
					</svg>
				</div>
				<h1>{x} {y}</h1>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state, ownProps){
	return {
		colour:state.dotColour.colour,
		currentSessionTracks:state.currentSessionTracks
	};
}

function mapDispatchToProps(dispatch, ownProps){
	return ({
		addCurrentTrack(track){
			dispatch(actions.addCurrentTrack(track));
		}
	})
}

export default connect(mapStateToProps,mapDispatchToProps)(Canvas)