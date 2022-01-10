const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
  //destructure properties
  const { cityDets, weather } = data;
  console.log(data);

  //update details temlapte
  details.innerHTML = `
        <h2 class="my-3">${cityDets.EnglishName}</h2>
        <h5 class="my-3">${cityDets.Country.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

  //update day/night & icon img
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";

  time.setAttribute("src", timeSrc);

  // remove the display none class if present
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return {
    //objext shorthand notation when the property name and value has a same name we can use short hand notation
    cityDets,
    weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get the city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //updating new city in ui
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});
