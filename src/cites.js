async function addCitiesList() {
  const station =
    await json(`http://api.geonames.org/searchJSON?username=${getGeoApiKey()}&featureCode=PPLC&maxRows=100&orderby=population
    `);
  console.log("station: ", station);
  for (let i = 0; i < station.geonames.length; i++) {
    let newCity = {
      name: station.geonames[i].name,
      info: null,
    };
    cities.push(newCity);
    // let cityInfo = await addCity(newCity);
  }
  console.log("Cities: ", cities);
}

export function getCities() {
  return [
    {
      name: "lodz",
      info: null,
    },
    {
      name: "krakow",
      info: null,
    },
    {
      name: "wroclaw",
      info: null,
    },
    {
      name: "Poznan",
      info: null,
    },
    {
      name: "Gdansk",
      info: null,
    },
    {
      name: "Szczecin",
      info: null,
    },
    {
      name: "Bydgoszcz",
      info: null,
    },
    {
      name: "Lublin",
      info: null,
    },
    {
      name: "katowice",
      info: null,
    },
    {
      name: "seoul",
      info: null,
    },
    {
      name: "bankok",
      info: null,
    },
    {
      name: "dhaka",
      info: null,
    },
    {
      name: "hanoi",
      info: null,
    },
    {
      name: "lahore",
      info: null,
    },
    {
      name: "warsaw",
      info: null,
    },
    {
      name: "Beijing",
      info: null,
    },
    {
      name: "Kinshasa",
      info: null,
    },
    {
      name: "Mexico City",
      info: null,
    },
    {
      name: "Moscow",
      info: null,
    },
    {
      name: "Dhaka",
      info: null,
    },
    {
      name: "Seoul",
      info: null,
    },
    {
      name: "Tokyo",
      info: null,
    },
    {
      name: "Cairo",
      info: null,
    },
    {
      name: "London",
      info: null,
    },
    {
      name: "Jakarta",
      info: null,
    },
    {
      name: "Hanoi",
      info: null,
    },
    {
      name: "Taipei",
      info: null,
    },
    {
      name: "Lima",
      info: null,
    },
    {
      name: "Bogotá",
      info: null,
    },
    {
      name: "Hong Kong",
      info: null,
    },
    {
      name: "Baghdad",
      info: null,
    },
    {
      name: "Tehran",
      info: null,
    },
    {
      name: "Singapore",
      info: null,
    },
    {
      name: "Bangkok",
      info: null,
    },
    {
      name: "Santiago",
      info: null,
    },
    {
      name: "Kabul",
      info: null,
    },
    {
      name: "Nairobi",
      info: null,
    },
    {
      name: "Bamako",
      info: null,
    },
    {
      name: "Riyadh",
      info: null,
    },
    {
      name: "Addis Ababa",
      info: null,
    },
    {
      name: "Ankara",
      info: null,
    },
    {
      name: "Berlin",
      info: null,
    },
    {
      name: "Madrid",
      info: null,
    },
    {
      name: "Pyongyang",
      info: null,
    },
    {
      name: "Caracas",
      info: null,
    },
    {
      name: "Buenos Aires",
      info: null,
    },
    {
      name: "Kyiv",
      info: null,
    },
    {
      name: "Quito",
      info: null,
    },
    {
      name: "Luanda",
      info: null,
    },
    {
      name: "Abuja",
      info: null,
    },
    {
      name: "Dakar",
      info: null,
    },
    {
      name: "Mogadishu",
      info: null,
    },
    {
      name: "Ouagadougou",
      info: null,
    },
    {
      name: "Algiers",
      info: null,
    },
    {
      name: "Rome",
      info: null,
    },
    {
      name: "Lusaka",
      info: null,
    },
    {
      name: "Brasília",
      info: null,
    },
    {
      name: "Santo Domingo",
      info: null,
    },
    {
      name: "Lomé",
      info: null,
    },
    {
      name: "Havana",
      info: null,
    },
    {
      name: "Paris",
      info: null,
    },
    {
      name: "Pretoria",
      info: null,
    },
    {
      name: "Brazzaville",
      info: null,
    },
    {
      name: "Tashkent",
      info: null,
    },
    {
      name: "Khartoum",
      info: null,
    },
    {
      name: "Accra",
      info: null,
    },
    {
      name: "Sanaa",
      info: null,
    },
    {
      name: "Conakry",
      info: null,
    },
    {
      name: "Beirut",
      info: null,
    },
    {
      name: "Bucharest",
      info: null,
    },
    {
      name: "Abu Dhabi",
      info: null,
    },
    {
      name: "Minsk",
      info: null,
    },
    {
      name: "Budapest",
      info: null,
    },
    {
      name: "Vienna",
      info: null,
    },
    {
      name: "Kampala",
      info: null,
    },
    {
      name: "Rabat",
      info: null,
    },
    {
      name: "Manila",
      info: null,
    },
    {
      name: "Phnom Penh",
      info: null,
    },
    {
      name: "Damascus",
      info: null,
    },
    {
      name: "Harare",
      info: null,
    },
    {
      name: "Monrovia",
      info: null,
    },
    {
      name: "Stockholm",
      info: null,
    },
    {
      name: "Asunción",
      info: null,
    },
    {
      name: "Kuala Lumpur",
      info: null,
    },
    {
      name: "Kathmandu",
      info: null,
    },
    {
      name: "N'Djamena",
      info: null,
    },
    {
      name: "Antananarivo",
      info: null,
    },
    {
      name: "Niamey",
      info: null,
    },
    {
      name: "Tripoli",
      info: null,
    },
    {
      name: "Yaoundé",
      info: null,
    },
    {
      name: "Amman",
      info: null,
    },
    {
      name: "Belgrade",
      info: null,
    },
    {
      name: "Montevideo",
      info: null,
    },
    {
      name: "Maputo",
      info: null,
    },
    {
      name: "Port-au-Prince",
      info: null,
    },
    {
      name: "Nouakchott",
      info: null,
    },
    {
      name: "Prague",
      info: null,
    },
    {
      name: "Copenhagen",
      info: null,
    },
    {
      name: "Sofia",
      info: null,
    },
    {
      name: "Kigali",
      info: null,
    },
    {
      name: "Baku",
      info: null,
    },
    {
      name: "Lilongwe",
      info: null,
    },
    {
      name: "Yerevan",
      info: null,
    },
    {
      name: "Oslo",
      info: null,
    },
    {
      name: "Tbilisi",
      info: null,
    },
    {
      name: "Dublin",
      info: null,
    },
    {
      name: "Brussels",
      info: null,
    },
    {
      name: "Guatemala City",
      info: null,
    },
    {
      name: "Managua",
      info: null,
    },
    {
      name: "Kingston",
      info: null,
    },
    {
      name: "Nay Pyi Taw",
      info: null,
    },
    {
      name: "Bishkek",
      info: null,
    },
    {
      name: "Tegucigalpa",
      info: null,
    },
    {
      name: "Libreville",
      info: null,
    },
  ];
}
