import React, { Component } from "react";
import GoogleMapContainer from "./components/GoogleMapContainer/GoogleMapContainer";
import DetailsModal from "./components/DetailsModal/DetailsModal";
import { getTrips } from "./util/tripsHelper";
import { getPlaces, getDistances } from "./util/placesHelper";
import { mockPlacesResponse, mockDistancesResponse } from "./util/mockResponse";
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
            seenPlaces: {},
            marker: {},
            isModalVisible: false,
            isFetching: false,
        };
    }

    async componentDidMount() {
        const { trips } = await getTrips();
        // get the most recent coordinates from the first truck in the array
        // TODO: if there are no active trips
        const { lat, lng } = trips[0][1][0]; 
        this.setState({ trips, lat, lng });
    }
    
    handleOnSubmit = (selectedTruck, typeOfPOI, radius) => {
        const { trips, seenPlaces } = this.state;
        const currentTrip = trips.find(trip => trip[0] === selectedTruck);

        // get path of selected truck (trip minus current location)
        const path = currentTrip[1].slice(1);
        
        // get most recent coordinates of selected truck
        const { lat, lng } = currentTrip[1][0];

        // check if the requested POIs are already stored in state
        let places;
        const seenPlacesString = `${lat}${lng}${typeOfPOI}${radius}`;
        const seenPlacesAtCurPos = seenPlaces[seenPlacesString];
 
        this.setState({ isFetching: true }, async () => {
            if (seenPlacesAtCurPos) {
                places = seenPlacesAtCurPos;
            } else {
                // get nearby points of interest from the Google Places API
                // const { results: rawPlacesArr } = await getPlaces({ lat, lng }, typeOfPOI, radius);
                const rawPlacesArr = mockPlacesResponse.results;
                const placesArr = rawPlacesArr.map(({ geometry }) => geometry.location);
        
                // get nearby points of interest respective distances from the Google Distance Matrix API
                // const distancesArr = await getDistances({ lat, lng }, placesArr);
                const distancesArr = mockDistancesResponse.rows[0].elements;
                
                // get distances mapped to each respective place
                places = placesArr.map((place, idx) => (
                    { ...place, distance: distancesArr[idx].distance.text, duration: distancesArr[idx].duration.text }
                ));
            }
            
            // update state
            this.setState(prevState => {
                const seenPlaces = seenPlacesAtCurPos
                    ? { ...prevState.seenPlaces }
                    : { ...prevState.seenPlaces, [seenPlacesString]: places };
                return {
                    selectedTruck,
                    typeOfPOI,
                    path,
                    lat,
                    lng,
                    places,
                    seenPlaces,
                    isModalVisible: false,
                    marker: {},
                    isFetching: false,
                }
            });
        });
    }; 

    // handle POI marker select
    handleOnMarkerSelect = marker => this.setState({ marker, isModalVisible: true });

    // handle modal visibility
    handleModalClose = () => {
        this.setState({ isModalVisible: false, marker: {} });
    };

    render() {
        const { trips, selectedTruck, typeOfPOI, path, lat, lng, places, marker, isModalVisible, isFetching } = this.state;

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
                        isFetching={isFetching}
                    />
                ) : (
                    <Loading />
                )}

                {isModalVisible && (
                    <DetailsModal
                        onModalClose={this.handleModalClose}
                        marker={marker}
                        selectedTruck={selectedTruck}
                        typeOfPOI={typeOfPOI}
                    />
                )}
            </div>
        );
    }
}

export default App;
