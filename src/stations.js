import { getGeoApiKey } from "./keys.js";
import { getCities } from "./cites";
import { json } from "./utility.js";

let stations = [];

async function addStationsList() {
  const cities = getCities();

  for (let i = 0; i < cities.length; i++) {
    const station = await json(
      `https://api.waqi.info/search/?token=${getGeoApiKey()}&keyword=${
        cities[i].name
      }`
    );
    console.log("station: ", station);
    for (let i = 0; i < station.geonames.length; i++) {
      let nieStations = {
        name: station.geonames[i].name,
        info: null,
      };
      cities.push(newCity);
      // let cityInfo = await addCity(newCity);
    }
    console.log("Cities: ", cities);
  }
}

async function getCityStations(city) {
  const station = await json(
    `https://api.waqi.info/search/?token=${getGeoApiKey()}&keyword=${city}`
  );

  let receivedStationUID = [];
  for (let i = 0; i < stations.data.length; i++) {
    receivedStationUID.push(stations.data[i].uid);
  }

  const stations = await json(
    `https://api.waqi.info/feed/@${uid}/?token=${getGeoApiKey()}`
  );
}
