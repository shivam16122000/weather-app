const para = document.querySelector('#para');
const weatherkey = '353459f76552328470e6ef1e523effc2';
const img = document.querySelector('img');
let variable = 'mumbai';
let country;
let city;
let temp;
let feelslike;
let description;
let flag = true;
let globetemp;
let bool = true;
let body = document.querySelector('#loading');

render();

const _country = document.querySelector('#country');
const _city = document.querySelector('#city');
const _temp = document.querySelector('#temp');
const _feels = document.querySelector('#feels');
const _description = document.querySelector('#description');
const input = document.querySelector('#citi');
const form = document.querySelector('#form');
const degree = document.querySelector('#degree');
const feh = document.querySelector('#fah');

function assign() {
  _country.textContent = country;
  _city.textContent = city;
  if (flag) {
    _temp.textContent = temp + ' degree';
  } else {
    _temp.textContent = temp + ' fahrenheit';
  }
  _feels.textContent = feelslike;
  _description.textContent = description;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  variable = input.value;
  body.textContent = ' ...Loading';
  render();
});

function degreetofah(t) {
  let fahran = parseFloat(t) * (9 / 5) + 32;
  if (bool) {
    return fahran;
  } else {
    return t;
  }
}

degree.addEventListener('click', (e) => {
  e.preventDefault();
  flag = true;
  temp = globetemp;
  bool = true;
  assign();
});

feh.addEventListener('click', (e) => {
  e.preventDefault();
  flag = false;
  temp = degreetofah(temp);
  bool = false;
  assign();
});

function render() {
  fetch(
    'http://api.openweathermap.org/data/2.5/weather?q=' +
      variable +
      '&units=metric&appid=353459f76552328470e6ef1e523effc2',
    { mode: 'cors' }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response.name);
      body.textContent = '';
      country = response.sys.country;
      feelslike = response.main.feels_like;
      temp = response.main.temp;
      globetemp = response.main.temp;
      description = response.weather[0].description;
      city = response.name;
      img.src = 'https://www.countryflags.io/' + country + '/shiny/64.png';

      assign();
    })
    .catch(function (err) {
      console.log(err);
    });
}
