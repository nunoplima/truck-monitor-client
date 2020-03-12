import React, { useState } from "react";
import "./Filter.css";

const Filter = ({ trips, onSubmit }) => {
    const [truckPlate, setTruckPlate] = useState("");
    const [type, setType] = useState("");
    const [radius, setRadius] = useState("");

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (!truckPlate.length || !type.length || !radius.length) {
            // TODO: convert to modal
            alert("All fields are required. \nPlease fill them all before submiting.");
        } else {
            onSubmit(truckPlate, type, radius);
        }
    };

    return (
        <form onSubmit={handleOnSubmit}>
            <select onChange={(e) => setTruckPlate(e.target.value)} defaultValue={"Select license plate"}>
                <option disabled>Select license plate</option>
                {/* render option per plate, plate is in the 1st idx */}
                {trips.map(el => <option key={el[0]} value={el[0]}>{el[0]}</option>)}
            </select>

            <select onChange={(e) => setType(e.target.value)} defaultValue={"Select POI type"}>
                <option disabled>Select POI type</option>
                <option value="gas_station">Gas Stations</option>
                <option value="restaurant">Restaurants</option>
                <option value="lodging">Hotels</option>
            </select>

            <select onChange={(e) => setRadius(e.target.value)} defaultValue={"Select radius"}>
                <option disabled>Select radius</option>
                <option value="500">500m</option>
                <option value="1000">1Km</option>
                <option value="2000">2Km</option>
            </select>

            <input type="submit" value="Apply"/>
        </form>
    );
};

export default Filter;