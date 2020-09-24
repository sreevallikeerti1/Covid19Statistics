const url = `https://covid19.mathdro.id/api`;

// DOM Selctors
let cntiner = document.querySelector(".details");
let recovered = document.querySelector(".rec-count");
let death = document.querySelector(".def-count");
let countryName = document.querySelector(".countryName");
let updateAt = document.getElementsByClassName(".updated-at");
let pickCountry = document.getElementById("pick-country");
let countryData = document.querySelector(".countryData");
var chartdata = document.getElementById("myChart");
var chartdata1 = document.getElementById("myChart1");

// Loads Global Data
const getData = async () => {
  try {
    let {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(url);

    let html = "";

    let activeCase = confirmed.value - recovered.value - deaths.value;
    console.log(activeCase);
    html += `
        <div class="row">
            <div class="card infections">
            Total infections
            <h3 class="inf-count count">${confirmed.value.toLocaleString()}</h3>
            <span class="updated-at">${new Date(
              lastUpdate
            ).toDateString()}</span>
            </div>
            <div class="card active">
            Total Active
            <h3 class="inf-count count">${activeCase.toLocaleString()}</h3>
            <span class="updated-at">${new Date(
              lastUpdate
            ).toDateString()}</span>
            </div>
            <div class="card recovered">
            Total recovered
            <h3 class="rec-count count">${recovered.value.toLocaleString()}</h3>
            <span class="updated-at">${new Date(
              lastUpdate
            ).toDateString()}</span>
            </div>
            <div class="card deaths">
            Total deaths
            <h3 class="def-count count">${deaths.value.toLocaleString()}</h3>
            <span class="updated-at">${new Date(
              lastUpdate
            ).toDateString()}</span>
            </div>
        </div>
        `;

    cntiner.innerHTML = html;

    // Loads Chart for Global Data
    var myChart = new Chart(chartdata, {
      type: "bar",
      data: {
        labels: ["Confirmed", "Active", "Recovered", "Deaths"],
        datasets: [
          {
            label: "Covid-19 Cases",
            data: [confirmed.value, activeCase, recovered.value, deaths.value],
            backgroundColor: [
              "#804000",
              "#005ce6",
              "#2eb82e",
              "#e60000",
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// Get All Countries
const getCountry = async () => {
  try {
    let {
      data: { countries: countriesAll },
    } = await axios.get(`${url}/countries`);

    let countryData = "";
    countriesAll.forEach((country) => {
      countryData += ` <option value="${country.name}">${country.name}</option>`;
    });

    pickCountry.insertAdjacentHTML("beforeend", countryData);
  } catch (error) {}
};

// Loads Global Data
const getCountryData = async () => {
  try {
    let {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(`${url}/countries/${pickCountry.value}`);

    let html = "";

    let activeCase = confirmed.value - recovered.value - deaths.value;

    html += `
        <div class="row">
            <div class="card infections">
            Total infections
            <h3 class="inf-count count">${confirmed.value.toLocaleString()}</h3>
            <span class="updated-at">${new Date(
              lastUpdate
            ).toDateString()}</span>
            </div>
            <div class="card active">
            Total Active
            <h3 class="inf-count count">${activeCase.toLocaleString()}</h3>
            <span class="updated-at">${new Date(
              lastUpdate
            ).toDateString()}</span>
            </div>
            <div class="card recovered">
            Total recovered
            <h3 class="rec-count count">${recovered.value.toLocaleString()}</h3>
            <span class="updated-at">${new Date(
              lastUpdate
            ).toDateString()}</span>
            </div>
            <div class="card deaths">
            Total deaths
            <h3 class="def-count count">${deaths.value.toLocaleString()}</h3>
            <span class="updated-at">${new Date(
              lastUpdate
            ).toDateString()}</span>
            </div>
        </div>
        `;

    countryName.innerHTML = pickCountry.value;
    countryData.innerHTML = html;

    // Display chart For A Selected Country
    var myChart = new Chart(chartdata1, {
      type: "bar",
      data: {
        labels: ["Confirmed", "Active", "Recovered", "Deaths"],
        datasets: [
          {
            label: "Covid-19 Cases",
            data: [confirmed.value, activeCase, recovered.value, deaths.value],
            backgroundColor: [
              "#804000",
              "#005ce6",
              "#2eb82e",
              "#e60000",
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// All Function Calls
window.onload = getData();
getCountry();
// Event To Get Country Data and populate
pickCountry.addEventListener("change", getCountryData);
