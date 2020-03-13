import React from "react";
import Modal from "react-modal";
import "./DetailsModal.css";

Modal.setAppElement("#root");

const typeObj = {
    "gas_station": "Gas Station",
    "lodging": "Hotel",
    "restaurant": "Restaurant"
}

const DetailsModal = ({ onModalClose, marker, selectedTruck, typeOfPOI }) => {
    const { distance, duration } = marker;

    return (
        <div className="modalContainer">
            <div
                className="startModalButton"
                onClick={() => onModalClose()}>
                &times;
            </div>
            <p className="modalTitle">{typeObj[typeOfPOI]} Details</p>
            <hr/>
            {/* <p>Truck plate: <span>{selectedTruck}</span></p> */}
            <p>Distance: <span>{distance}</span></p>
            <p>Trip duration: <span>{duration}</span></p>
        </div>
    );
};

export default DetailsModal;
