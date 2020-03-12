import dotenv from "dotenv";
dotenv.config();

const getPlacesHelper = async (coord, type, radius) => {
    const cors = "https://cors-anywhere.herokuapp.com/"  
    const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
    const { lat, lng } = coord;
    const locationQuery = `location=${lat},${lng}`;
    const radiusQuery = `radius=${radius}`;
    const typeQuery = `type=${type}`;
    const key = `key=${process.env.REACT_APP_GOOGLE_KEY}`;
    const rawResponse = await fetch(`${cors}${url}${locationQuery}&${typeQuery}&${radiusQuery}&${key}`);
    const response = await rawResponse.json();
    console.log(response);
    return response;
};

export { getPlacesHelper };