import React, { Component } from "react";
import Filter from "./Filter";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import dotenv from "dotenv";
import truckImage from "../assets/images/icn-current-location.png";
import pathImage from "../assets/images/icn-path.png";
import firstLocationImage from "../assets/images/icn-first-location.png";
import restaurantImage from "../assets/images/icn-restaurant.png";
import hotelImage from "../assets/images/icn-hotel.png";
import gasStationImage from "../assets/images/icn-gas-station.png";

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
        return (
            <Marker
                position={{ lat, lng }}
                icon={{
                    url: truckImage,
                    scaledSize: new this.props.google.maps.Size(35, 35)
                }}
            />
        );
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
        const { places, typeOfPOI } = this.props;
        // get correct icon given the type of POI
        let icnImage;
        if (typeOfPOI === "gas_station") icnImage = gasStationImage;
        else if (typeOfPOI === "lodging") icnImage = hotelImage;
        else icnImage = restaurantImage;

        return places.map(({ lat, lng }, idx) => (
            <Marker
                key={idx}
                position={{ lat, lng }}
                icon={{
                    url: icnImage,
                    scaledSize: new this.props.google.maps.Size(35, 35)
                }}
            />
        ));
    };

    render() {
        const { trips, selectedTruck, path, lat, lng, places, onSubmit } = this.props;
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
                
                {places.length && this.renderPOI()}
                
                
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_KEY
})(GoogleMapContainer);
