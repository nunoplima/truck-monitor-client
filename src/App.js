import React, { Component } from "react";
import GoogleMapContainer from "./components/GoogleMap";
import { getTripsHelper } from "./util/tripsHelper";
import { getPlacesHelper } from "./util/placesHelper";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trips: {}
        };
    }

    async componentDidMount() {
        const { trips } = await getTripsHelper();
        // const { places } = await getPlacesHelper({lat: "38.747098", lng: "-9.239545"}, 500, "lodging");
        this.setState({ trips });
    }

    render() {
        console.log(this.state.trips);
        return (
            <div className="App">
                <GoogleMapContainer />
            </div>
        );
    }
}

export default App;
