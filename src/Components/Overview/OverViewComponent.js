import React from 'react';
import api from '../../api';
import { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { countryData } from "../../countriesData";

/*Overview component handles the display of the map and number of users.
  Executes GET method, extracting relevent data(countries that are in the database) from JSON file(countries details).
  Using Google maps - disaplying the map and with Markers and InfoWindow compenents displaying
  the countries that have been extracted.*/

const countryDict = [];

const checkLatitude = (map) => {

  const sLat = map.getBounds().getSouthWest().lat();
  const nLat = map.getBounds().getNorthEast().lat();
  if (sLat < -85 || nLat > 85) {
    //the map has gone beyone the world's max or min latitude - gray areas are visible
    //return to a valid position
    if (map.lastValidCenter) {
      map.setCenter(map.lastValidCenter);
    }
  } else {
    map.lastValidCenter = map.getCenter();
  }
}


export class OverView extends Component {

  function

  constructor(props) {
    super(props);

    this.state = {
      sum: 0,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      countries: [],
      center: { lat: 45, lng: -10 },
      isMapLoaded: false,
      mapModel: null,
    }
  }

  async extractInfo(data) {//creating data for the map (name,longitude and latitude)

    for (let i = 0; i < data.length; i++) {
      this.state.sum += data[i].users;//calculating the total users
      this.setState({//adding the data of the countries to present on the map (name, total users)
        countries: this.state.countries.concat([[data[i].country, data[i].users]])
      });
    }
    countryData.map((data => { // extracting the relevant countries from the JSON file
      this.state.countries.map((country) => {
        if (data.name === country[0]) {
          countryDict.push([data.latlng[0], data.latlng[1], country[0], country[1]])
          //push [latitude, longitude , country name, number of users] for countries that are in the database
        }
        return 1;
      })
      return 1;
    }))
  }

  async componentDidMount() {

    await api.get('/')
      .then(res => {
        const data = res.data;
        this.extractInfo(data);
        return res.data
      }).catch((error) => {
        console.log(error + ' inside componentDidMount');
      });
    this.setState({});
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.state.isMapLoaded && this.state.mapModel) {
      this.setState({ isMapLoaded: true }, () => {
        this.setOutOfBoundsListener(this.state.mapModel)
      })
    }
  }


  displayMarkers = () => {
    return countryDict.map((country, index) => {
      return <Marker key={index} id={index} position={{
        lat: country[0],
        lng: country[1]
      }}
        onClick={this.onMarkerClick}
        name={country[2] + ': ' + country[3]} />
    })
  }

  onMarkerClick = (props, marker) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };


  setOutOfBoundsListener = () => { //Listening to map coordinates - handling out of bounds gray area in map
    this.props.google.maps.event.addListener(this.state.mapModel, 'dragend', () => {
      checkLatitude(this.state.mapModel);
    });
    this.props.google.maps.event.addListener(this.state.mapModel, 'idle', () => {
      checkLatitude(this.state.mapModel);
    });
    this.props.google.maps.event.addListener(this.state.mapModel, 'zoom_changed', () => {
      checkLatitude(this.state.mapModel);
    });
  };

  render() {
    const mapStyles = {
      width: '70%',
      height: '70%',
      left: '15%'
    };
    const { sum, center } = this.state;
    
    return (
      <div style={{ overflow: 'visible' }}>
        <div style={{ position: 'sticky', width: '150px', left: '15%' }}>
          <h2>OverView</h2>
          <h3 style={{ position: 'sticky', color: 'teal' }}>
            <strong>Total Users: {sum}</strong>
          </h3>
        </div>
        <Map
          onReady={(mapProps, map) => {
            this.setState({ mapModel: map })}}
          google={this.props.google}
          mapContainerStyle={{
            width: '300px',
            height: '100px'}}
          zoom={2}
          minZoom={2}
          maxZoom={5}
          style={mapStyles}
          initialCenter={center}>
          {this.displayMarkers()}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}>
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyChBEJgCpQbXHLmlWK_8A5Vj8TS5wUDXm8'
})(OverView);