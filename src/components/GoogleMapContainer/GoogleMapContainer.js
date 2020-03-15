import React, { Component } from "react";
import Loading from "../Loading/Loading";
import Filter from "../Filter/Filter";
import { Map, GoogleApiWrapper } from "google-maps-react";
import MarkerContainer from "../MarkerCointainer/MarkerContainer";
import dotenv from "dotenv";
import PropTypes from "prop-types";
import { imageUrlByTypeOfPOI } from "../../constants/constants";
import spinner from "../../assets/images/spinner.svg";
import truckImage from "../../assets/images/icn-current-location.png";
import pathImage from "../../assets/images/icn-path.png";
import firstLocationImage from "../../assets/images/icn-first-location.png";
import "./GoogleMapContainer.css";

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
                    scaledSize: new this.props.google.maps.Size(40, 40)
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
                            ? new this.props.google.maps.Size(18, 18)
                            : new this.props.google.maps.Size(16, 16)
                    }}
                />
            );
        });
    };

    renderPOI = () => {
        const { places, typeOfPOI, onMarkerSelect, marker } = this.props;

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
                        scaledSize: new this.props.google.maps.Size(40, 40)
                    }}
                    distance={distance}
                    duration={duration}
                    onMarkerSelect={onMarkerSelect}
                />
            )
        });
    };

    render() {
        const { trips, selectedTruck, path, lat, lng, places, onSubmit, isFetching } = this.props;

        return (
            <>
                <Filter trips={trips} onSubmit={onSubmit} />

                <Map
                    google={this.props.google}
                    onReady={this.handleMapReady}
                    disableDefaultUI
                    disableDoubleClickZoom
                    gestureHandling={window.innerWidth <= 550 ? "greedy" : "none"}
                    zoom={14}
                    minZoom={13}
                    zoomControl
                    initialCenter={{ lat, lng }}
                    center={{ lat, lng }}
                    backgroundColor={"#ddd"}
                    scaleControl>

                    {selectedTruck.length && this.renderTruckLastPosition()}
                    
                    {path.length && this.renderPath()}
                    
                    {places.length && this.renderPOI()}

                    {isFetching ? (
                        <>
                            <div className="fetchSpinnerCointainer">
                                <img src={spinner} alt="Fetching spinner"></img>
                            </div>
                        </>
                    ) : null}

                </Map>
            </>
        );
    }
}

GoogleMapContainer.propTypes = {
    trips: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.array), PropTypes.array]).isRequired,
    selectedTruck: PropTypes.string.isRequired,
    typeOfPOI: PropTypes.string.isRequired,
    path: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.array]).isRequired,
    lat: PropTypes.string.isRequired,
    lng: PropTypes.string.isRequired,
    places: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.array]).isRequired,
    onSubmit: PropTypes.func.isRequired,
    onMarkerSelect: PropTypes.func.isRequired,
    marker: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
};

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_KEY,
    LoadingContainer: Loading
})(GoogleMapContainer);