import restaurantImage from "../assets/images/icn-restaurant.png";
import restaurantImageSelected from "../assets/images/icn-restaurant-selected.png";
import hotelImage from "../assets/images/icn-hotel.png";
import hotelImageSelected from "../assets/images/icn-hotel-selected.png";
import gasStationImage from "../assets/images/icn-gas-station.png";
import gasStationImageSelected from "../assets/images/icn-gas-station-selected.png";

const typeOfPOIObj = {
    gas_station: "Gas Station",
    lodging: "Hotel",
    restaurant: "Restaurant"
};

const imageUrlByTypeOfPOI = {
    lodging: {
        selected: hotelImageSelected,
        notSelected: hotelImage
    },
    restaurant: {
        selected: restaurantImageSelected,
        notSelected: restaurantImage
    },
    gas_station: {
        selected: gasStationImageSelected,
        notSelected: gasStationImage
    }
};

export { typeOfPOIObj, imageUrlByTypeOfPOI };
