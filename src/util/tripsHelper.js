import dotenv from "dotenv";
dotenv.config();

const getTrips = async () => {
    const options = {
        headers: {
            "Content-type": "application/json"
        }
    };
    const url =
        process.env.NODE_ENV === "development"
            ? "http://localhost:4000"
            : "https://truck-monitor-server.herokuapp.com";
    try {
        const rawResponse = await fetch(`${url}/trips`, options);
        const response = await rawResponse.json();
        return response;
    } catch(e) {
        console.log(e);
    }
    
};

export { getTrips };