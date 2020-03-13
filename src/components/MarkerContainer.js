import React from "react";
import { Marker } from "google-maps-react";
import "./MarkerContainer.css";

// React.memo shallowly compares its props and takes a cb as second parameter that takes prev and new props as args
const MarkerContainer = React.memo(
    props => {
        const handleOnMarkerSelect = (props, marker, e) => {
            console.log(props, e);
            props.onMarkerSelect(marker);
        };

        return <Marker {...props} onClick={handleOnMarkerSelect} />;
    },
    (oldProps, newProps) => {
        const isSameLocation = JSON.stringify(oldProps.position) === JSON.stringify(newProps.position);
        const isSameTypeOfPOI = oldProps.icon.url === newProps.icon.url;
        return isSameLocation && isSameTypeOfPOI;
    }
);

// class MarkerContainer extends Component {
//     shouldComponentUpdate(nextProps) {
//         return JSON.stringify(nextProps.position) !== JSON.stringify(this.props.position);
//     }

//     handleOnMarkerSelect = (props, marker, e) => {
//         // console.log(props, marker, e)
//         props.onMarkerSelect(marker)
//     };

//     render() {
//         return (
//             <Marker {...this.props} onClick={this.handleOnMarkerSelect} />
//         )
//     }
// }

export default MarkerContainer;
