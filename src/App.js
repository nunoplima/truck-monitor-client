import React, { Component } from "react";
import GoogleMapContainer from "./components/GoogleMapContainer/GoogleMapContainer";
import DetailsModal from "./components/DetailsModal/DetailsModal";
import { getTrips } from "./util/tripsHelper";
import { getPlaces, getDistances } from "./util/placesHelper";
import { mockPlacesResponse, mockDistanceResponse } from "./util/mockResponse";
import Loading from "./components/Loading/Loading";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trips: [],
            selectedTruck: "",
            typeOfPOI: "", 
            path: [],
            lat: "",
            lng: "",
            places: [],
            marker: {},
            isModalVisible: false,
        };
    }

    async componentDidMount() {
        const { trips } = await getTrips();
        // get the most recent coordinates from the first truck in the array
        const { lat, lng } = trips[0][1][0]; 
        this.setState({ trips, lat, lng });
    }
    
    handleOnSubmit = async (selectedTruck, typeOfPOI, radius) => {
        const { trips } = this.state;
        const currentTrip = trips.find(trip => trip[0] === selectedTruck);

        // get path of selected truck (trip minus current location)
        const path = currentTrip[1].slice(1);
        
        // get most recent coordinates of selected truck
        const { lat, lng } = currentTrip[1][0];
        
        // get nearby points of interest
        // const { results: rawPlacesArr } = await getPlaces({ lat, lng }, typeOfPOI, radius);
        const rawPlacesArr = mockPlacesResponse.results;
        const placesArr = rawPlacesArr.map(({ geometry }) => geometry.location);

        // get distances mapped to each respective place
        // const distancesArr = await getDistances({ lat, lng }, placesArr);
        const distancesArr = mockDistanceResponse.rows[0].elements;
        
        // map distancesArr to placesArr
        const places = placesArr.map((place, idx) => ({ ...place, distance: distancesArr[idx].distance.text, duration: distancesArr[idx].duration.text }))
        
        this.setState({ selectedTruck, typeOfPOI, path, lat, lng, places, isModalVisible: false, marker: {} });
    }; 

    handleOnMarkerSelect = marker => {
        this.setState({ marker, isModalVisible: true });
    };

    // handle modal visibility
    handleModalClose = () => {
        this.setState({ isModalVisible: false, marker: {} });
    };

    render() {
        const { trips, selectedTruck, typeOfPOI, path, lat, lng, places, marker, isModalVisible } = this.state;

        return (
            <div className="App">
                {trips.length ? (
                    <GoogleMapContainer
                        trips={trips}
                        selectedTruck={selectedTruck}
                        typeOfPOI={typeOfPOI}
                        path={path}
                        lat={lat}
                        lng={lng}
                        places={places}
                        onSubmit={this.handleOnSubmit}
                        onMarkerSelect={this.handleOnMarkerSelect}
                        marker={marker}
                    />
                ) : (
                    <Loading />
                )}

                {isModalVisible && (
                    <DetailsModal
                        onModalClose={this.handleModalClose}
                        marker={marker}
                        typeOfPOI={typeOfPOI}
                    />
                )}
            </div>
        );
    }
}

export default App;
