import { Component } from "react";
// import { Contact } from "./Contact";
// import {withScriptjs}from "./react-google-maps";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from'google-maps-react';

// const GoogleMapsAPI = 'AIzaSyB5F64Qxoz3mboEFZMKAxUibt4gB1aRM-E';

const LoadingContainer = (props) => (
  	<div>Fancy loading container!</div>
	)
class GMap extends Component{
	constructor(props){
		super(props);
		this.state = {
		  showingInfoWindow: false,
		  activeMarker: {},
		  selectedPlace: {},
		}
	  }
	onMarkerClick = (props, marker, e) =>
		this.setState({
		selectedPlace: props,
		activeMarker: marker,
		showingInfoWindow: true
	});
	onMapClicked = (props) => {
		if (this.state.showingInfoWindow) {
			this.setState({
			showingInfoWindow: false,
			activeMarker: null
			})
		}
	};
    render() {
		const { selectedPlace } = this.state;
		return(
			// <div style={{ margin: '100px' }}>
			// 	<Map
			// 		google={this.props.google}
			// 		center={{lat: 18.5204, lng: 73.8567}}
			// 		height='300px'
			// 		zoom={15}
			// 	/>
			// </div>
            <div>
            <Map google={this.props.google} zoom={14}>
              <Marker onClick={this.onMarkerClick} name={'Current location'} />
              <InfoWindow onClose={this.onInfoWindowClose}>
                  <div>
                    <h1>{selectedPlace && selectedPlace.name}</h1>
                  </div>
              </InfoWindow>
              </Map>
            </div>
		);
	}
}
export default GoogleApiWrapper({
apiKey:("AIzaSyA4jCkQbmhoYQX1mhojfnDfHWrV2qhRFXw"),
LoadingContainer: LoadingContainer,
})(GMap)


// import React, {  Component} from "react";
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
// const LoadingContainer = (props) => (
//   <div>Fancy loading container!</div>
// )
// class GMap extends Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       showingInfoWindow: false,
//       activeMarker: {},
//       selectedPlace: {},
//     }
//   }
//   onMarkerClick = (props, marker, e) =>
//     this.setState({
//       selectedPlace: props,
//       activeMarker: marker,
//       showingInfoWindow: true
//     });
//   onMapClicked = (props) => {
//     if (this.state.showingInfoWindow) {
//       this.setState({
//         showingInfoWindow: false,
//         activeMarker: null
//       })
//     }
//   };
//     render(){
//       const { selectedPlace } = this.state;
//         return (
//           <div>
//             <h1> GMap </h1>
//             <div>
//             <Map google={this.props.google} zoom={14}>
//               <Marker onClick={this.onMarkerClick} name={'Current location'} />
//               <InfoWindow onClose={this.onInfoWindowClose}>
//                   <div>
//                     <h1>{selectedPlace && selectedPlace.name}</h1>
//                   </div>
//               </InfoWindow>
//               </Map>
//             </div>
//           </div>
//         )
//      }
// }
// export default GoogleApiWrapper({
// apiKey:("AIzaSyByxPfKgJ9mU21CrOTkQwFDC2JGrYtYUcU"),
// LoadingContainer: LoadingContainer,
// })(GMap)
