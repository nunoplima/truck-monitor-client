import React, { Component } from "react";
import GoogleMapContainer from "./components/GoogleMap";
import { getTripsHelper } from "./util/tripsHelper";
import { getPlacesHelper } from "./util/placesHelper";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trips: [],
            lat: "",
            lng: "",
        };
    }

    async componentDidMount() {
        const { trips } = await getTripsHelper();
        // get the most recent coordinates from the first truck in the array
        const { lat, lng } = trips[0][1][0]; 
        this.setState({ trips, lat, lng });
    }
    
    
    handleOnSubmit = async (truckPlate, type, radius) => {
        const { trips } = this.state;
        // get most recent coordinates of specific truck
        const { lat, lng } = trips.find(trip => trip[0] === truckPlate)[1][0];
        // const { places } = await getPlacesHelper({ lat, lng }, type, radius);
        this.setState({ lat, lng });
    };  

    render() {
        console.log(this.state);
        const { trips, lat, lng } = this.state;

        return (
            <div className="App">
                {trips && <GoogleMapContainer trips={trips} lat={lat} lng={lng} onSubmit={this.handleOnSubmit} />}
            </div>
        );
    }
}

export default App;
