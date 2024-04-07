const apiKey = 'YRnnCjDF1qlAegHSfEjgn2nA0R12izNsY';

function searchEvents(countryCode, genreId) {
    let url = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${countryCode}&apikey=${apiKey}`;
    
    if (genreId) {
        url += `&genreId=${genreId}`;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Events:', data);
            // Process the event data here
        })
        .catch(error => {
            console.error('Error fetching events:', error);
        });
}

// Example usage:
// Replace 'US' with the desired country code
// Replace 'GENRE_ID' with the desired genre ID
searchEvents('US', 'GENRE_ID');
