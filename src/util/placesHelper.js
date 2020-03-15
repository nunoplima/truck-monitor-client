import dotenv from "dotenv";
dotenv.config();

const getPlaces = async (coord, type, radius) => {
    try {
        const cors = "https://cors-anywhere.herokuapp.com/"  
        const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
        const { lat, lng } = coord;
        const locationQuery = `location=${lat},${lng}`;
        const radiusQuery = `radius=${radius}`;
        const typeQuery = `type=${type}`;
        const key = `key=${process.env.REACT_APP_GOOGLE_KEY}`;
        const rawResponse = await fetch(`${cors}${url}${locationQuery}&${typeQuery}&${radiusQuery}&${key}`);
        const response = await rawResponse.json();
        return response;
    } catch(e) {
        console.log(e);
    }
};

const getDistances = async (fromCoord, toCoordArr) => {
    try {
        const cors = "https://cors-anywhere.herokuapp.com/"  
        const url = "https://maps.googleapis.com/maps/api/distancematrix/json?";
        const { lat, lng } = fromCoord;
        const originQuery = `origins=${lat},${lng}`;
        const destinationsString = toCoordArr.map(({ lat, lng }) => `${lat},${lng}`).join("|");
        const destinationsQuery = `destinations=${destinationsString}`
        const key = `key=${process.env.REACT_APP_GOOGLE_KEY}`;
        const rawResponse = await fetch(`${cors}${url}${originQuery}&${destinationsQuery}&${key}`);
        const response = await rawResponse.json();
        return response.rows[0].elements;
    } catch(e) {
        console.log(e);
    }
};

export { getPlaces, getDistances };