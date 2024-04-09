import axios from 'axios';
import { BASE_URL, options } from './discovery-api.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { throttle } from 'lodash';

console.log(BASE_URL)

const eventGallery = document.querySelector('.main-container');
const selectCountry = document.querySelector('.select')
const searchCountry = document.querySelector('.input')


async function fetchData() { 
  try { 
    const res = await axios.get(BASE_URL, options); 
      console.log(res.data)
    const { events } = res.data._embedded;
    console.log(events); 
      renderEvent(events)

  } catch (err) { 
      console.log(err)
      Notify.failure(`Sorry! No event found!`);
      
  }
}



function renderEvent(events) {
    const markup = events.map(({ name, images, dates, _embedded : {venues} }) => {
        return `
                <a class="card">
                        <div class="second-border"></div>
                        <img src="${images[0].url}" alt="sample pic" class="card-img">
                        <h5 class="event-name">${name}</h5>
                        <div class="event-info"><p class="date">${dates.start.localDate}</p>
                          <p class="location">
                              <img src="/location-icon.b3919cfb.png" alt="location icon" class="location-icon">
                              ${venues[0].name}
                          </p></div>
                          
                        
                    </a>
                `;
    }).join("")

    eventGallery.insertAdjacentHTML("beforeend", markup)
}

async function countryEvent(e) {
  eventGallery.innerHTML = "";
  let selectedCountry = e.target.value;
  console.log(e.target.value)
  options.params.countryCode = selectedCountry
  console.log(selectedCountry)
  try {
    const res = await axios.get(BASE_URL, options);
    const { events } = res.data._embedded;
    console.log(events)
    renderEvent(events)
  } catch (err) { 
      console.log(err)
      Notify.failure(`Sorry! No event found!`)
        
  }
}

async function inputEvent() {
  if (searchCountry.value === "") {
    options.params.keyword = "";
    fetchData()
  } eventGallery.innerHTML = "" 
  options.params.keyword = searchCountry.value
  // console.log(searchCountry.value)
  try { 
    const res = await axios.get(BASE_URL, options); 
      const { events } = res.data._embedded;
      renderEvent(events)

  } catch (err) { 
    console.log(err)
    Notify.failure(`Sorry! No event found!`);
  }
}

selectCountry.addEventListener("change", countryEvent)
searchCountry.addEventListener("input", throttle(inputEvent, 1500))

fetchData()