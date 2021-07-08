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
export class OverView extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      sum: 0,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      countries: [],
      center: {lat: 45, lng: -10}
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

  render() {
    const mapStyles = {
      width: '70%',
      height: '70%',
      left:'15%'
    };
    const { sum, center } = this.state;
    return (
      <div >
      
      <div style={{ position: 'sticky', width:'150px', left:'15%'}}>
        <h2>OverView</h2>
          <h3 style={{position: 'sticky' }}>
            <strong>Total Users: {sum}</strong>
          </h3>
        </div>
        <Map
          google={this.props.google}
          mapContainerStyle={{width: '300px',
          height: '100px'}}
          zoom={2}
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
  apiKey: 'YOUR_API_KEY'
})(OverView);
