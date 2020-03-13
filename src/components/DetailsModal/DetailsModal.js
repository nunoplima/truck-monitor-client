import React from "react";
import Modal from "react-modal";
import truckImage from "../../assets/images/icn-current-location.png";
import { imageUrlByTypeOfPOI } from "../../constants/constants";
import { typeOfPOIObj } from "../../constants/constants";
import "./DetailsModal.css";

Modal.setAppElement("#root");

const DetailsModal = ({ onModalClose, marker, selectedTruck, typeOfPOI }) => {
    const { distance, duration } = marker;

    return (
        <div className="modal">
            <div className="modalContainer">
                <div className="closeModalButton" onClick={() => onModalClose()}>
                    &times;
                </div>

                <div className="modalIcnSection">
                    <p>{selectedTruck}</p>
                    <img src={truckImage} alt={"Truck icon"}></img>
                </div>

                <div className="modalMiddleSection">
                    <p>{distance}</p>
                    
                    <p className="modalArrow">&#8674;</p>
                        
                    <p>{duration}</p>
                </div>

                <div className="modalIcnSection">
                    <p>{typeOfPOIObj[typeOfPOI]}</p>
                    <img src={imageUrlByTypeOfPOI[typeOfPOI].notSelected} alt={"Marker icon"}></img>
                </div>
            </div>
        </div>
    );

    // return (
    //     <div className="modalContainer">
    //         <div
    //             className="closeModalButton"
    //             onClick={() => onModalClose()}>
    //             &times;
    //         </div>
    //         <p>{typeOfPOIObj[typeOfPOI]} Details</p>
    //         <hr/>
    //         <p>Distance: <span>{distance}</span></p>
    //         <p>Trip duration: <span>{duration}</span></p>
    //     </div>
    // );
};

export default DetailsModal;
