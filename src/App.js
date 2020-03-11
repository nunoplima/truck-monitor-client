import React from "react";
import { getTripsHelper } from "./util/tripsHelper";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trips: {},
        }

    }

    async componentDidMount() {
        const { trips } = await getTripsHelper();
        this.setState({ trips });
    }

    render() {
        console.log(this.state.trips)
        return <div className="App">live</div>;
    }
}

export default App;
