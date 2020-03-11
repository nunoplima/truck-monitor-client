import dotenv from "dotenv";
dotenv.config();

const getPlacesHelper = async (coord, radius, type) => {
    const cors = "https://cors-anywhere.herokuapp.com/"  
    const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
    const { lat, lng } = coord;
    const locationQuery = `location=${lat},${lng}`;
    const radiusQuery = `radius=${radius}`;
    const typeQuery = `type=${type}`;
    const key = `key=${process.env.REACT_APP_GOOGLE_KEY}`;
    const rawResponse = await fetch(`${cors}${url}${locationQuery}&${radiusQuery}&${typeQuery}&${key}`);
    const response = await rawResponse.json();
    console.log(response);
    // const cors = "https://cors-anywhere.herokuapp.com/"
    // const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
    // const { lat, lng } = coord;
    // const location = `location=${lat},${lng}`;
    // const rradius = `radius=5000`;
    // const keyword = `keyword=crossfit`;
    // const name = `name=crossfit`;
    // const ttype = `type=gym`;
    // const key = `key=${process.env.REACT_APP_PLACES_KEY}`;
    // const rawResponse = await fetch(`${cors}${url}${location}&${rradius}&${name}&${keyword}&${ttype}&${key}`);
    // const response = await rawResponse.json();
    // console.log(response);
};

export { getPlacesHelper };