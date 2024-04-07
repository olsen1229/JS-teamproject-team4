const form = document.getElementById('search-form');
const resultsDiv = document.getElementById('results');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const genre = document.getElementById('genre').value;
  const country = document.getElementById('country').value;

  const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?genre=${genre}&countryCode=${country}&apikey=RnnCjDF1qlAegHSfEjgn2nA0R12izNsY`);
  const data = await response.json();

  resultsDiv.innerHTML = '';
  data._embedded.events.forEach((event) => {
    const resultDiv = document.createElement('div');
    resultDiv.textContent = event.name;
    resultsDiv.appendChild(resultDiv);
  });
});