import React, { Component } from "react";
import Filter from "./Filter";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import dotenv from "dotenv";
dotenv.config();

class GoogleMapContainer extends Component {
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={8}
                style={{ width: "100vw", height: "100vh", cursor: "none" }}
                initialCenter={{ lat: 47.444, lng: -122.176 }}
            >
                <Filter />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_KEY
})(GoogleMapContainer);
