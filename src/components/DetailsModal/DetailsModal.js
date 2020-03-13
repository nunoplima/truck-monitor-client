import React from "react";
import Modal from "react-modal";
import { typeOfPOIObj } from "../../constants/constants";
import "./DetailsModal.css";

Modal.setAppElement("#root");

const DetailsModal = ({ onModalClose, marker, typeOfPOI }) => {
    const { distance, duration } = marker;

    return (
        <div className="modalContainer">
            <div
                className="closeModalButton"
                onClick={() => onModalClose()}>
                &times;
            </div>
            <p>{typeOfPOIObj[typeOfPOI]} Details</p>
            <hr/>
            <p>Distance: <span>{distance}</span></p>
            <p>Trip duration: <span>{duration}</span></p>
        </div>
    );
};

export default DetailsModal;
