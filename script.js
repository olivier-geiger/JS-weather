const api = {
  key: 'e2141c8c8dc63caba858f3cbdd08bf15',
  base: 'https://api.openweathermap.org/data/2.5/',
};

const search = document.querySelector('.search');
const btn = document.querySelector('.btn');
btn.addEventListener('click', getInput);

function getInput(event) {
  event.preventDefault();
  if (event.type == 'click') {
    getData(search.value);
    // console.log(search.value);
  }
}

function getData() {
  fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}&lang=fr`)
    .then(response => {
      //   console.log(response);
      return response.json();
    })
    .then(displayData);
}

function displayData(response) {
  console.log(response);
  if (response.cod === '404') {
    const error = document.querySelector('.error');
    error.textContent = 'La ville nest pas référencé';
    search.value = '';
  } else {
    const city = document.querySelector('.city');
    city.innerText = `${response.name}, ${response.sys.country}`;

    const today = new Date();
    const date = document.querySelector('.date');
    date.innerText = dateFunction(today);

    const temp = document.querySelector('.temp');
    temp.innerHTML = `Température: ${Math.round(response.main.temp)} <span>°C</span>`;

    const weather = document.querySelector('.weather');
    weather.innerText = `Météo: ${response.weather[0].description}`;

    const tempRange = document.querySelector('.temp-range');
    tempRange.innerText = `Température Ressentie: ${Math.round(
      response.main.temp_min,
    )}°C / ${Math.round(response.main.temp_max)}°C`;

    const weatherIcon = document.querySelector('.weather-icon');
    const iconURL = 'http://openweathermap.org/img/w/';
    weatherIcon.src = iconURL + response.weather[0].icon + '.png';

    search.value = '';
  }
}

function dateFunction(d) {
  let months = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ];
  let days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}
