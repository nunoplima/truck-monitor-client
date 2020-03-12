import React, { Component } from "react";
import Filter from "./Filter";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import dotenv from "dotenv";
import truckImage from "../assets/images/icn-current-location.png";
import pathImage from "../assets/images/icn-path.png";
import firstLocationImage from "../assets/images/icn-first-location.png";

dotenv.config();

class GoogleMapContainer extends Component {
    handleMapReady = (mapProps, map) => {
        map.setOptions({
            draggableCursor: "default",
            draggingCursor: "pointer"
        });
    };

    renderTruckLastPosition = () => {
        const { lat, lng } = this.props;
        return <Marker position={{ lat, lng }} icon={{url: truckImage, scaledSize: new this.props.google.maps.Size(35,35)}}  />
    };

    renderPath = () => {
        const path = this.props.path;
        const firstLocationIdx = path.length - 1;
        return path.map(({ lat, lng }, idx) => {
            const isFirstLocation = idx === firstLocationIdx;
            return (
                <Marker 
                    key={idx}
                    position={{ lat, lng }}
                    icon={{
                        url: isFirstLocation ? firstLocationImage : pathImage,
                        scaledSize: isFirstLocation
                            ? new this.props.google.maps.Size(17, 17)
                            : new this.props.google.maps.Size(15, 15)
                    }}
                />
            );
        });
    };

    renderPOI = () => {

    };

    render() {
        const { trips, selectedTruck, path, lat, lng, onSubmit } = this.props;
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

                {/* <Marker
                    position={{lat: 38.736413, lng: -9.206345}} 
                    icon={{url: "../assets/images/icn-current-location.png",
                            anchor: new this.props.google.maps.Point(32,32),
                            scaledSize: new this.props.google.maps.Size(64,64)}}
                    /> */}
                
                {selectedTruck.length && this.renderTruckLastPosition()}
                
                {path.length && this.renderPath()}

                
                
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_KEY
})(GoogleMapContainer);
