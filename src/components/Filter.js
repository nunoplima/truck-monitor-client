import React from "react";
import "./Filter.css";

const Filter = ({ trips }) => {

    return (
        <div className="formContainer">
            <form onSubmit={(e) => e.preventDefault()}>
                <select defaultValue={"Select license plate"}>
                    <option disabled>Select license plate</option>
                    {/* render option per plate */}
                    {Object.keys(trips).map(plate => <option key={plate} value={plate}>{plate}</option>)}
                </select>

                <select defaultValue={"Select POI type"}>
                    <option disabled>Select POI type</option>
                    <option value="gas_station">Gas Stations</option>
                    <option value="restaurant">Restaurants</option>
                    <option value="lodging">Hotels</option>
                </select>

                <select defaultValue={"Select radius"}>
                    <option disabled>Select radius</option>
                    <option value="500">500m</option>
                    <option value="1000">1Km</option>
                    <option value="2000">2Km</option>
                </select>

                <input type="submit" value="Apply"/>
            </form>
        </div>
    );
};

export default Filter;