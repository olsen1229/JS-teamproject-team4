import axios from 'axios';
import { BASE_URL, options } from './discovery-api.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { throttle } from 'lodash';

console.log(BASE_URL)

const eventGallery = document.querySelector('.main-container');
const selectCountry = document.querySelector('.select')
const searchCountry = document.querySelector('.input')

//=======FETCH DATA FROM API========//
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

//=========INSERT MARKUP==========//

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

//======== RENDER EVENTS AS PER COUNTRY ===========//
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

//=========RENDER EVENTS BY SEARCH ==========//
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

// ==========PAGINATION ===========//
const pageNumbersUl = document.getElementById('page-numbers');
const currentPageDiv = document.querySelector('.current-page');
const nums = [...Array(30).keys()].slice(1);
console.log(nums)

function renderPageNumbers(startIndex) {
    pageNumbersUl.innerHTML = '';
    currentPageDiv.textContent = startIndex;
    if (startIndex > 1) {
        const previousPageLi = document.createElement('li');
        previousPageLi.textContent = 1;
        pageNumbersUl.appendChild(previousPageLi);
        const previousEllipsisLi = document.createElement('li');
        previousEllipsisLi.textContent = '...';
        pageNumbersUl.appendChild(previousEllipsisLi);
        previousEllipsisLi.addEventListener('click', () => {
            const previousStartIndex = Math.max(startIndex - 5, 1);
            renderPageNumbers(previousStartIndex);
        });
    }
    const endIndex = Math.min(startIndex + 4, nums.length);
    for (let i = startIndex; i <= endIndex; i++) {
        const li = document.createElement('li');
        li.textContent = i;
        if (i === startIndex) {
            li.classList.add('active');
        }
        li.addEventListener('click', () => {
            pageNumbersUl.querySelectorAll('.active').forEach(activeLi => activeLi.classList.remove('active'));
            li.classList.add('active');
            currentPageDiv.textContent = i;
        });
        pageNumbersUl.appendChild(li);
    }
    if (endIndex < nums.length) {
        const nextEllipsisLi = document.createElement('li');
        nextEllipsisLi.textContent = '...';
        pageNumbersUl.appendChild(nextEllipsisLi);
        const lastPageLi = document.createElement('li');
        lastPageLi.textContent = nums.length;
        pageNumbersUl.appendChild(lastPageLi);
        nextEllipsisLi.addEventListener('click', () => {
            const nextStartIndex = endIndex + 1;
            renderPageNumbers(nextStartIndex);
        });
    }
}
renderPageNumbers(1);

//========RENDER EVENT PER PAGE======//

const activePage = document.querySelector(".pagination")
console.log(activePage)
console.log(currentPageDiv.innerText)

async function renderEventByPage(e) {
  eventGallery.innerHTML = "";
  // console.log(e.target.innerText)
  console.log(e.target.classList.contains('active'))
  if (e.target.classList.contains('active')) {
    newPage = e.target.innerText
    options.params.page = newPage
    console.log(newPage)
    try {
      const res = await axios.get(BASE_URL, options);
      const { events } = res.data._embedded;
      renderEvent(events)

    } catch (err) {
      console.log(err)
      Notify.failure(`Sorry! No event found!`);
    }
  } else {
    eventGallery.innerHTML = "";
    Notify.failure(`Please click the page button again!`)
    try {
      const res = await axios.get(BASE_URL, options);
      const { events } = res.data._embedded;
      renderEvent(events)

    } catch (err) {
      console.log(err)
      Notify.failure(`Sorry! No event found!`);
    }
  }
  
}

activePage.addEventListener("click", renderEventByPage) 



selectCountry.addEventListener("change", countryEvent)
searchCountry.addEventListener("input", throttle(inputEvent, 1500))

fetchData()