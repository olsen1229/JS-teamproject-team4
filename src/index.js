document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search');
  const countryInput = document.getElementById('country');

  searchInput.addEventListener('input', searchEvents);
  countryInput.addEventListener('input', searchEvents);

  // Initial search when the page loads
  searchEvents();
});

function searchEvents() {
  const searchInputValue = document.getElementById('search').value.trim();
  const countryInputValue = document.getElementById('country').value.trim().toUpperCase();

  const apiKey = 'RnnCjDF1qlAegHSfEjgn2nA0R12izNsY';
  let url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}`;

  let queryParams = [];
  if (searchInputValue) queryParams.push(`keyword=${searchInputValue}`);
  if (countryInputValue) queryParams.push(`countryCode=${countryInputValue}`);

  if (queryParams.length > 0) {
    url += `&${queryParams.join('&')}`;
  }

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const eventsDiv = document.getElementById('events');
      eventsDiv.innerHTML = ''; // Clear previous results

      if (data._embedded && data._embedded.events.length > 0) {
        data._embedded.events.forEach(event => {
          const eventName = event.name;
          const eventDate = new Date(event.dates.start.dateTime).toLocaleDateString();
          const eventVenue = event._embedded.venues[0].name;
          const eventLocation = event._embedded.venues[0].city.name + ', ' + event._embedded.venues[0].country.name;

          const eventInfo = `<div class="col-md-3 col-6">
                                <a data-bs-toggle="modal" data-bs-target="#myModal">
                                  <div class="box">
                                    <img src="${event.images[0].url}" class="img-fluid" />
                                    <h4>${eventName}</h4>
                                    <p>Date: ${eventDate}</p>
                                    <small>Location: ${eventLocation}</small>
                                  </div>
                                </a>
                                <div class="modal fade" id="myModal">
                                  <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                      <div class="modal-header">
                                        <h1 class="modal-title fs-5">${eventName}</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                      </div>
                                      <div class="modal-body">
                                        <p>Date: ${eventDate}</p>
                                        <p>Venue: ${eventVenue}</p>
                                        <p>Location: ${eventLocation}</p>
                                        <p>Description: ${event.info}</p>
                                      </div>
                                      <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>`;
          eventsDiv.insertAdjacentHTML('beforeend', eventInfo);
        });
      } else {
        eventsDiv.innerHTML = '<p>No events found</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching events:', error);
    });
}
