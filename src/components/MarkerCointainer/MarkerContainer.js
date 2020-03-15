import React from "react";
import { Marker } from "google-maps-react";
import "./MarkerContainer.css";

// React.memo shallowly compares its props and takes a cb as second parameter that takes prev and new props as args
const MarkerContainer = React.memo(
    props => {
        const handleOnMarkerSelect = (markerProps, marker, e) => {
            props.onMarkerSelect(markerProps);
        };

        return <Marker {...props} onClick={handleOnMarkerSelect} />;
    },
    (oldProps, newProps) => {
        const isSameLocation = JSON.stringify(oldProps.position) === JSON.stringify(newProps.position);
        const isSameTypeOfPOI = oldProps.icon.url === newProps.icon.url;
        return isSameLocation && isSameTypeOfPOI;
    }
);

export default MarkerContainer;
