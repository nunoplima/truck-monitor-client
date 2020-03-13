import React, { Component } from "react";
import Loading from "../Loading/Loading";
import Filter from "../Filter/Filter";
import { Map, GoogleApiWrapper } from "google-maps-react";
import MarkerContainer from "../MarkerCointainer/MarkerContainer";
import dotenv from "dotenv";
import { imageUrlByTypeOfPOI } from "../../constants/constants";
import truckImage from "../../assets/images/icn-current-location.png";
import pathImage from "../../assets/images/icn-path.png";
import firstLocationImage from "../../assets/images/icn-first-location.png";

dotenv.config();

class GoogleMapContainer extends Component {
    handleMapReady = (mapProps, map) => {
        map.setOptions({
            draggableCursor: "default",
            draggingCursor: "pointer",
        });
    };

    renderTruckLastPosition = () => {
        const { lat, lng } = this.props;
        return (
            <MarkerContainer
                position={{ lat, lng }}
                clickable={false}
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
                <MarkerContainer
                    key={idx}
                    position={{ lat, lng }}
                    clickable={false}
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
        const { places, typeOfPOI, onMarkerSelect, marker } = this.props;
        // get correct icon given the type of POI
        // let icnImage;
        // if (typeOfPOI === "gas_station") icnImage = gasStationImage;
        // else if (typeOfPOI === "lodging") icnImage = hotelImage;
        // else icnImage = restaurantImage;

        return places.map(({ lat, lng, distance, duration }, idx) => {
            // check if this marker is selected
            let isSelected = false;
            if (marker.position) {
                const { lat: selectedMarkerLat, lng: selectedMarkerLng } = marker.position;
                isSelected = lat === selectedMarkerLat && lng === selectedMarkerLng ? true : false;
            }
            return (
                <MarkerContainer
                    key={idx}
                    position={{ lat, lng }}
                    icon={{
                        url: isSelected ? imageUrlByTypeOfPOI[typeOfPOI].selected : imageUrlByTypeOfPOI[typeOfPOI].notSelected,
                        scaledSize: new this.props.google.maps.Size(35, 35)
                    }}
                    distance={distance}
                    duration={duration}
                    onMarkerSelect={onMarkerSelect}
                />
            )
        });
    };

    render() {
        const { trips, selectedTruck, path, lat, lng, places, onSubmit } = this.props;
        return (
            <>
                <Filter trips={trips} onSubmit={onSubmit} />

                <Map
                    google={this.props.google}
                    onReady={this.handleMapReady}
                    disableDefaultUI
                    disableDoubleClickZoom
                    gestureHandling={"none"}
                    zoom={14}
                    zoomControl
                    style={{ width: "100vw", height: "100vh" }}
                    initialCenter={{ lat, lng }}
                    center={{ lat, lng }}>

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
            </>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_KEY,
    LoadingContainer: Loading
})(GoogleMapContainer);
