import React, { Component } from "react";
import Filter from "./Filter";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import dotenv from "dotenv";
dotenv.config();

class GoogleMapContainer extends Component {
    handleMapReady = (mapProps, map) => {
        map.setOptions({
            draggableCursor: "default",
            draggingCursor: "pointer"
        });
    };

    render() {
        const { trips, lat, lng, onSubmit } = this.props;
        return (
            <Map
                google={this.props.google}
                onReady={this.handleMapReady}
                disableDefaultUI
                disableDoubleClickZoom
                gestureHandling={"none"}
                zoom={14}
                style={{ width: "100vw", height: "100vh" }}
                initialCenter={{ lat, lng }}
                center={{ lat, lng }}>
                <Filter trips={trips} onSubmit={onSubmit} />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_KEY
})(GoogleMapContainer);
