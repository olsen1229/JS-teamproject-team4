export const BASE_URL = "https://app.ticketmaster.com/discovery/v2/events.json?";
const API_KEY = "QRL9keS5G11LcsOGpjLTEnBcqGOFb3Rn";

export const options = {
    params: {
        apikey: API_KEY,
        classificationName: "music",
        page: 0,
        size: 16,
    },
};

export function fetchMusicEvents() {
    return fetch(`${BASE_URL}classificationName=music&apikey=${API_KEY}`).then((res) => {
        if (!res.ok) {
            throw new Error(res.status);
        } else {
            return res.json();
        }
    });      
}

export function fetchMusicEventsByKeyword(keyword) {
    return fetch(`${BASE_URL}classificationName=music&keyword=${keyword}&apikey=${API_KEY}`).then((res) => {
        if (!res.ok) {
            throw new Error(res.status);
        } else {
            return res.json();
        }
    }); 
}

export function fetchMusicEventsByCountry(countryCode) {
    return fetch(`${BASE_URL}classificationName=music&countryCode=${countryCode}&apikey=${API_KEY}`).then((res) => {
        if (!res.ok) {
            throw new Error(res.status);
        } else {
            return res.json();
        }
    }); 
}