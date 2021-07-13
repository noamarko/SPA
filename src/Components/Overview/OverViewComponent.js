import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import Paper from "@material-ui/core/Paper";

const checkLatitude = (map) => {
  const sLat = map.getBounds().getSouthWest().lat();
  const nLat = map.getBounds().getNorthEast().lat();
  if (sLat < -85 || nLat > 85) {
    if (map.lastValidCenter) {
      map.setCenter(map.lastValidCenter);
    }
  } else {
    map.lastValidCenter = map.getCenter();
  }
};

function OverView(props) {
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});
  const [mapModel, setMapModel] = useState(null);

  const componentDidUpdate = async () => {
    if (mapModel) {
      setOutOfBoundsListener(mapModel);
    }
  };

  useEffect(() => {
    componentDidUpdate();
  }, [mapModel]);

  const displayMarkers = () => {
    return props.dataList.map((country, index) => {
      if (country.users > 0)
        return (
          <Marker
            key={index}
            id={index}
            position={{
              lat: country.lat,
              lng: country.lng,
            }}
            onClick={onMarkerClick}
            name={country.country + ": " + country.users}
          />
        );
    });
  };

  const onMarkerClick = (markerProps, marker) => {
    setSelectedPlace(markerProps);
    setActiveMarker(marker);
    setShowingInfoWindow(true);
  };

  const onClose = () => {
    if (showingInfoWindow) {
      setShowingInfoWindow(false);
      setActiveMarker(null);
    }
  };

  const setOutOfBoundsListener = () => {
    //Listening to map coordinates - handling out of bounds gray area in map
    props.google.maps.event.addListener(mapModel, "dragend", () => {
      checkLatitude(mapModel);
    });
    props.google.maps.event.addListener(mapModel, "idle", () => {
      checkLatitude(mapModel);
    });
    props.google.maps.event.addListener(mapModel, "zoom_changed", () => {
      checkLatitude(mapModel);
    });
  };

  const mapStyles = {
    position: "relative",
    width: "95%",
    height: "85%",
    fullscreenControl: false,
  };

  const divStyle = {
    padding: "20px",
    width: "fit-content",
  };

  const paperStyle = {
    position: "fixed",
    width: "80%",
    height: "650px",
    borderRadius: "20px",
    padding: "10px",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <div style={divStyle}>
      <Paper elevation={4} style={paperStyle}>
        <div style={headerStyle}>
          <h2>OverView</h2>
          <h3 style={{ color: "steelblue" }}>Total Users: {props.usersData}</h3>
        </div>
        <Map
          onReady={(mapProps, map) => {
            setMapModel(map);
          }}
          google={props.google}
          mapContainerStyle={{
            width: "300px",
            height: "100px",
          }}
          zoom={2}
          minZoom={2}
          maxZoom={7}
          style={mapStyles}
          initialCenter={{ lat: 45, lng: -10 }}
        >
          {displayMarkers()}
          <InfoWindow
            marker={activeMarker}
            visible={showingInfoWindow}
            onClose={onClose}
          >
            <div>
              <h4>{selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </Map>
      </Paper>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyChBEJgCpQbXHLmlWK_8A5Vj8TS5wUDXm8",
})(OverView);
