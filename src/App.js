import React, { Component } from "react";
import GoogleMapContainer from "./components/GoogleMapContainer/GoogleMapContainer";
import DetailsModal from "./components/DetailsModal/DetailsModal";
import { getTrips } from "./util/tripsHelper";
import { getPlaces, getDistances } from "./util/placesHelper";
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
        // if there is at leat one ongoing trip, get the most recent coordinates from the first truck in the array 
        const { lat, lng } = trips.length ? trips[0][1][0] : { lat: "", lng: "" }; 
        this.setState({ trips, lat, lng });
    }
    
    getPlacesAndDistances = async ({ lat, lng }, typeOfPOI, radius) => {
        // get nearby points of interest from the Google Places API
        const { results: rawPlacesArr } = await getPlaces({ lat, lng }, typeOfPOI, radius);
        const placesArr = rawPlacesArr.map(({ geometry }) => geometry.location);

        // get nearby points of interest respective distances from the Google Distance Matrix API
        const distancesArr = await getDistances({ lat, lng }, placesArr);
        
        // return distances mapped to each respective place
        return placesArr.map((place, idx) => (
            { ...place, distance: distancesArr[idx].distance.text, duration: distancesArr[idx].duration.text }
        ));
    };

    handleOnSubmit = (selectedTruck, typeOfPOI, radius) => {
        this.setState({ isFetching: true }, async () => {
            const { trips, seenPlaces } = this.state;
            const currentTrip = trips.find(trip => trip[0] === selectedTruck);
    
            // get path of selected truck (trip minus current location)
            const path = currentTrip[1].slice(1);
            
            // get most recent coordinates of selected truck
            const { lat, lng } = currentTrip[1][0];
    
            // check if the requested POIs are already stored in state
            let places;
            const seenPlacesKey = `${lat}${lng}${typeOfPOI}${radius}`;
            const seenPlacesAtCurPos = seenPlaces[seenPlacesKey];

            if (seenPlacesAtCurPos) places = seenPlacesAtCurPos;
            else places = await this.getPlacesAndDistances({ lat, lng }, typeOfPOI, radius);
       
            // update state
            this.setState(prevState => {
                const seenPlaces = seenPlacesAtCurPos
                    ? { ...prevState.seenPlaces }
                    : { ...prevState.seenPlaces, [seenPlacesKey]: places };
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