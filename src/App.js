import React, { Component } from "react";
import GoogleMapContainer from "./components/GoogleMapContainer";
import { getTripsHelper } from "./util/tripsHelper";
import { getPlacesHelper } from "./util/placesHelper";
import mockResponse from "./util/mockResponse";

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
        };
    }

    async componentDidMount() {
        const { trips } = await getTripsHelper();
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
        // const { results } = await getPlacesHelper({ lat, lng }, typeOfPOI, radius);
        const { results } = mockResponse;
        const places = results.map(({ geometry }) => geometry.location);

        this.setState({ selectedTruck, typeOfPOI, path, lat, lng, places });
    }; 

    render() {
        console.log(this.state);
        const { trips, selectedTruck, typeOfPOI, path, lat, lng, places } = this.state;

        return (
            <div className="App">
                {trips && (
                    <GoogleMapContainer
                        trips={trips}
                        selectedTruck={selectedTruck}
                        typeOfPOI={typeOfPOI}
                        path={path}
                        lat={lat}
                        lng={lng}
                        places={places}
                        onSubmit={this.handleOnSubmit}
                    />
                )}
            </div>
        );
    }
}

export default App;
