import React from "react";
import "./Filter.css";

const Filter = () => {
    return (
        <div className="formContainer">
            <form onSubmit={(e) => e.preventDefault()}>
                <select id="trucks">

                </select>
                <select>

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