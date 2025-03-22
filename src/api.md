# Api report

```js
const polutionStates = [
  "Dobra",
  "Średnia",
  "Niezdrowa dla wrażliwych osób",
  "Niezdrowa",
  "Bardzo niezdrowa",
  "Niebezpieczna",
];
```

<div>
    <form id="cityForm">
        <label>Miasto (bez polskich znaków)</label>
        <input type="text" id="city-name" name="fname" placeholder="torun">
        <input type="submit" value="Dodaj">
    </form>
</div>

<div id="message" class="none">
    <h1 class="main-title"></h1>
    <p class="description"></p>
</div>

```js
import { getGeoApiKey } from "./keys.js";

const loginForm = document.querySelector("#cityForm");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let cityInput = document.querySelector("#city-name");
  if (cityInput.value.length > 0) addNewCity(cityInput.value);
  cityInput.value = "";
});

async function addNewCity(city) {
  for (let i = 0; i < cities.length; i++) {
    if (cities[i].name == city) {
      zoomToLocation(cities[i].info.latitude, cities[i].info.longitude, 10);
      updateMessage(cities[i].info.polutionState, cities[i].info.index);
      return;
    }
  }
  let newCity = {
    name: city,
    info: null,
  };
  cities.push(newCity);
  console.log("cities: ", cities);

  let cityInfo = await addCity(newCity);
  console.log(cityInfo);
  if (cityInfo != null) {
    zoomToLocation(cityInfo.latitude, cityInfo.longitude, 10);
  }
  console.log(cityInfo);
  updateMessage(cityInfo.polutionState, cityInfo.index);
}

function updateMessage(polutionState, polutionIndex) {
  const messageContainer = document.querySelector("#message");
  const messageTitle = document.querySelector(".main-title");
  const messageDescription = document.querySelector(".description");

  messageContainer.className = "";
  console.log("Polution state: " + polutionState);

  let message;
  switch (polutionState) {
    case 1:
      messageContainer.classList.add("good");
      message = "Brak przewiwwskazań do codziennych czynności";
      break;
    case 2:
      messageContainer.classList.add("moderate");
      message = "Brak przewiwwskazań do codziennych czynności";
      break;
    case 3:
      messageContainer.classList.add("potentially-bad");
      message = "Unikać przewlekłych czynności na zewnątrz";
      break;
    case 4:
      messageContainer.classList.add("bad");
      message = "Unikać przebywania na zewnątrz";
      break;
    case 5:
      messageContainer.classList.add("very-bad");
      message = "Unikać przebywania na zewnątrz";
      break;
    case 6:
      messageContainer.classList.add("hazardous");
      message = "Unikać przebywania na zewnątrz";
      break;
    default:
      messageContainer.classList.add("hazardous");
      message = "Błąd ładowania danych";
  }

  messageTitle.innerHTML = `Jakość powietrza: ${
    polutionStates[polutionState - 1]
  }`;
  messageDescription.innerHTML = `Współczynnik zanieczyszczenia: ${polutionIndex}</br>${message}`;
}
```

```js
import * as L from "npm:leaflet";
import { getAQApiKey } from "./keys.js";

const latitude = 52;
const longitude = 19.45;

const div = display(document.createElement("div"));
div.style = "height: 400px;";

const map = L.map(div).setView([latitude, longitude], 6.2);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const API_KEY = getAQApiKey();

import { getCities } from "./cites.js";
let cities = getCities();
console.log(cities);
// let cities = [
//   {
//     name: "lodz",
//     info: {},
//   },
//   {
//     name: "krakow",
//     info: {},
//   },
//   {
//     name: "wroclaw",
//     info: {},
//   },
//   {
//     name: "Poznan",
//     info: {},
//   },
//   {
//     name: "Gdansk",
//     info: null,
//   },
//   {
//     name: "Szczecin",
//     info: null,
//   },
//   {
//     name: "Bydgoszcz",
//     info: null,
//   },
//   {
//     name: "Lublin",
//     info: null,
//   },
//   {
//     name: "katowice",
//     info: null,
//   },
//   {
//     name: "warsaw",
//     info: null,
//   },
// ];

async function json(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
  return await response.json();
}

(async function fetchCities() {
  try {
    const cityDataPromises = cities.map(async (city) => {
      addCity(city);
    });

    await Promise.all(cityDataPromises);
  } catch (error) {
    console.error("Error fetching city data:", error);
  }
})();

async function addCity(city) {
  const station = await json(
    `https://api.waqi.info/feed/${city.name}/?token=${API_KEY}`
  );
  if (station.data && station.data != "Unknown station") {
    display(station.data);
    city.name = city.name;
    city.info = getCityData(station.data);
    if (city.info) {
      const circle = L.circle([city.info.latitude, city.info.longitude], {
        color: city.info.color,
        fillColor: city.info.color,
        fillOpacity: 0.3,
        radius: 7000,
      }).addTo(map);
      return city.info;
    }
  }
  return null;
}
```

```js
// function updateCircleRadius(circle) {
//   const zoomLevel = map.getZoom();
//   const maxZoom = map.getMaxZoom() || 18;
//   const minZoom = map.getMinZoom() || 1;

//   const minRadius = 4500;
//   const maxRadius = 45000;

//   const newRadius = maxRadius / (zoomLevel - minZoom + 1);

//   circle.setRadius(Math.max(newRadius, minRadius));
// }

function addCircle(latitude, longitude, color) {
  const circle = L.circle([latitude, longitude], {
    color: color,
    fillColor: color,
    fillOpacity: 0.3,
    radius: 7000,
  }).addTo(map);
}

function zoomToLocation(latitude, longitude, zoomLevel) {
  map.setView([latitude, longitude], zoomLevel);
}
```

```js
function getCityData(stationData) {
  const so2 = stationData.iaqi.so2?.v || 0;
  const no2 = stationData.iaqi.no2?.v || 0;
  const pm10 = stationData.iaqi.pm10?.v || 0;

  function calculateAQI(value, breakpoints) {
    for (let i = 0; i < breakpoints.length; i++) {
      if (value <= breakpoints[i]) return i * 50;
    }
    return 300;
  }

  const so2_aqi = calculateAQI(so2, [20, 80, 250]);
  const no2_aqi = calculateAQI(no2, [50, 100, 150, 200]);
  const pm10_aqi = calculateAQI(pm10, [50, 100, 150, 200, 300]);

  const maxPolution = Math.max(so2_aqi, no2_aqi, pm10_aqi);
  let color;
  function summarizeAirQuality(polutionIndex) {
    if (polutionIndex < 50) {
      color = "#00cc00";
      return 1;
    }
    if (polutionIndex < 100) {
      color = "#aacc00";
      return 2;
    }
    if (polutionIndex < 200) {
      color = "#cccc00";
      return 3;
    }
    if (polutionIndex < 300) {
      color = "#cc9400";
      return 4;
    }
    if (polutionIndex >= 300) {
      color = "#cc0000";
      return 5;
    }
    color = "#3a3a3a";
    return 6;
  }

  const maxIndex = Math.max(so2 * 2.5, no2, pm10);
  const currentPolutionState = summarizeAirQuality(maxPolution);
  return {
    color: color,
    latitude: stationData.city.geo[0],
    longitude: stationData.city.geo[1],
    index: maxIndex,
    polutionState: currentPolutionState,
  };
}
```

<style>
    p{
        margin-bottom: 0;    
    }

    .none {
        display: none;
    }

    #message {
        padding: 1rem;
        margin: 0.5rem;
        border-radius: 2rem;
        border-style: dashed;
        border-width: 3px;
    }

    .good {
        border-color: #00cc00;
        background-color: #00cc0077;
    }

    .moderate {
        border-color: #aacc00;
       
       background-color: #aacc0077;
    }
    .potentially-bad {
        border-color: #cccc00;
        background-color: #cccc0077;
    }

    .bad {
        border-color: #cc9400;
        background-color: #cc940077;
    }

    .very-bad {
        border-color: #cc0000;
        background-color: #cc000077;
    }

    .hazardous {
        border-color: #3a3a3a;
        background-color: #3a3a3a77;
    }


</style>
