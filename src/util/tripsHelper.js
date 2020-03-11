const getTripsHelper = async () => {
    const options = {
        headers: {
            "Content-type": "application/json"
        }
    };
    const rawResponse = await fetch(`http://localhost:4000/all`, options);
    const response = await rawResponse.json();
    return response;
};

export { getTripsHelper };