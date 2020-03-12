import React from "react";
import { Marker } from "google-maps-react";


const MarkerContainer = (props) => {


    return (
        <Marker {...props} onClick={(e) => console.log(e)} />
    )
};

export default MarkerContainer;

