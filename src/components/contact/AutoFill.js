import { map } from "jquery";
import { Component } from "react";
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';

const GoogleMapsAPI = 'AIzaSyA4jCkQbmhoYQX1mhojfnDfHWrV2qhRFXw';

Geocode.setApiKey( GoogleMapsAPI );
Geocode.enableDebug();


class AutoFill extends Component{
    constructor( props ){
		super( props );
		this.state = {
            name:'',
            email:'',
			address: '',
			city: '',
			area: '',
			state: '',
			mapPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
			},
			markerPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
			}
		}
	}
    componentDidMount() {
		Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng ).then(
			response => {
				const address = response.results[0].formatted_address,
				      addressArray =  response.results[0].address_components,
				      city = this.getCity( addressArray ),
				      area = this.getArea( addressArray ),
				      state = this.getState( addressArray );

				console.log( 'city', city, area, state );

				this.setState( {
					address: ( address ) ? address : '',
					area: ( area ) ? area : '',
					city: ( city ) ? city : '',
					state: ( state ) ? state : '',
				} )
			},
			error => {
				console.error( error );
			}
		);
	}
    componentDidMount() {
		Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng ).then(
			response => {
				const address = response.results[0].formatted_address,
				      addressArray =  response.results[0].address_components,
				      city = this.getCity( addressArray ),
				      area = this.getArea( addressArray ),
				      state = this.getState( addressArray );

				console.log( 'city', city, area, state );

				this.setState( {
					address: ( address ) ? address : '',
					area: ( area ) ? area : '',
					city: ( city ) ? city : '',
					state: ( state ) ? state : '',
				} )
			},
			error => {
				console.error( error );
			}
		);
	}
    shouldComponentUpdate( nextProps, nextState ){
		if (
			this.state.markerPosition.lat !== this.props.center.lat ||
			this.state.address !== nextState.address ||
			this.state.city !== nextState.city ||
			this.state.area !== nextState.area ||
			this.state.state !== nextState.state
		) {
			return true
		} else if ( this.props.center.lat === nextProps.center.lat ){
			return false
		}
	}
    shouldComponentUpdate( nextProps, nextState ){
		if (
			this.state.markerPosition.lat !== this.props.center.lat ||
			this.state.address !== nextState.address ||
			this.state.city !== nextState.city ||
			this.state.area !== nextState.area ||
			this.state.state !== nextState.state
		) {
			return true
		} else if ( this.props.center.lat === nextProps.center.lat ){
			return false
		}
	}
    getCity = ( addressArray ) => {
		let city = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			if ( addressArray[ i ].types[0] && 'administrative_area_level_2' === addressArray[ i ].types[0] ) {
				city = addressArray[ i ].long_name;
				return city;
			}
		}
	};
    getArea = ( addressArray ) => {
		let area = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			if ( addressArray[ i ].types[0]  ) {
				for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
					if ( 'sublocality_level_1' === addressArray[ i ].types[j] || 'locality' === addressArray[ i ].types[j] ) {
						area = addressArray[ i ].long_name;
						return area;
					}
				}
			}
		}
	};
    getState = ( addressArray ) => {
		let state = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			for( let i = 0; i < addressArray.length; i++ ) {
				if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
					state = addressArray[ i ].long_name;
					return state;
				}
			}
		}
	};
    onMarkerDragEnd = ( event ) => {
		let newLat = event.latLng.lat(),
		    newLng = event.latLng.lng();

		Geocode.fromLatLng( newLat , newLng ).then(
			response => {
				const address = response.results[0].formatted_address,
				      addressArray =  response.results[0].address_components,
				      city = this.getCity( addressArray ),
				      area = this.getArea( addressArray ),
				      state = this.getState( addressArray );
				this.setState( {
					address: ( address ) ? address : '',
					area: ( area ) ? area : '',
					city: ( city ) ? city : '',
					state: ( state ) ? state : '',
					markerPosition: {
						lat: newLat,
						lng: newLng
					},
					mapPosition: {
						lat: newLat,
						lng: newLng
					},
				} )
			},
			error => {
				console.error(error);
			}
		);
	};
    onPlaceSelected = ( place ) => {
		console.log( 'plc', place );
		const address = place.formatted_address,
		      addressArray =  place.address_components,
		      city = this.getCity( addressArray ),
		      area = this.getArea( addressArray ),
		      state = this.getState( addressArray ),
		      latValue = place.geometry.location.lat(),
		      lngValue = place.geometry.location.lng();
		// Set these values in the state.
		this.setState({
			address: ( address ) ? address : '',
			area: ( area ) ? area : '',
			city: ( city ) ? city : '',
			state: ( state ) ? state : '',
			markerPosition: {
				lat: latValue,
				lng: lngValue
			},
			mapPosition: {
				lat: latValue,
				lng: lngValue
			},
		})
	};
    render(){
			withGoogleMap(
				props => (
					<GoogleMap google={ this.props.google }
					           defaultZoom={ this.props.zoom }
					           defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
					>
						{/* InfoWindow on top of marker */}
						<InfoWindow
							onClose={this.onInfoWindowClose}
							position={{ lat: ( this.state.markerPosition.lat + 0.0018 ), lng: this.state.markerPosition.lng }}
						>
							<div>
								<span style={{ padding: 0, margin: 0 }}>{ this.state.address }</span>
							</div>
						</InfoWindow>
						{/*Marker*/}
						<Marker google={this.props.google}
						        name={'Dolores park'}
						        draggable={true}
						        onDragEnd={ this.onMarkerDragEnd }
						        position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
						/>
						<Marker />
						{/* For Auto complete Search Box */}
						<Autocomplete
							style={{
								width: '100%',
								height: '40px',
								paddingLeft: '16px',
								marginTop: '2px',
								marginBottom: '500px'
							}}
							onPlaceSelected={ this.onPlaceSelected }
							types={['(regions)']}
						/>
					</GoogleMap>
				)
			)
        return(map);
    }
}
export default AutoFill;