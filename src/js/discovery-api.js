export const BASE_URL = "https://app.ticketmaster.com/discovery/v2/events.json?";
const API_KEY = "QRL9keS5G11LcsOGpjLTEnBcqGOFb3Rn";

export const options = {
    params: {
        apikey: API_KEY,
        countryCode: "US",
        keyword: "",
        classificationName: "music",
    },
};