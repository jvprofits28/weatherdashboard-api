let apiKey = "c96cebf97a842175a6fff0448811aac4";
let searchBtn = document.getElementById("searchBtn");
let seaInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", function () {
  let city = seaInput.value;
  console.log(city);
  cityWeather(city);
  fiveDayForecast(city);
});
function cityWeather(cityName) {
  let query = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  $.ajax({
    url: query,
    type: "GET",
    dataType: "json",
    success: function (res) {
      $("#TodaysWeather").empty();
      let cityName = $("<h3>").addClass("card-tile").text(res.name);
      let icon = $("<img>").attr(
        "src",
        `http://openweathermap.org/img/wn/${res.weather[0].icon}.png`
      );
      let description = $("<p>").text(`Skies:   ${res.weather[0].description}`);
      let temp = $("<p>").text(`Current Temperature:   ${res.main.temp}° F`);
      let feels = $("<p>").text(`Feels Like:   ${res.main.feels_like}° F`);
      let humidity = $("<p>").text(`Humidity:   ${res.main.humidity}%`);
      let max = $("<p>").text(`Today's High Temp:   ${res.main.temp_max}° F`);
      let min = $("<p>").text(`Today's Low Temp:   ${res.main.temp_min}° F`);
      let wind = $("<p>").text(`Wind Speed:    ${res.wind.speed} mph`);

      let content = $("<div>")
        .attr("id", "weather")
        .addClass("card-content")
        .append(
          cityName,
          icon,
          description,
          temp,
          feels,
          humidity,
          max,
          min,
          wind
        );

      $("#TodaysWeather").append(content);
    },
  });
}

function fiveDayForecast(cityName) {
  var query = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;
  $.ajax({
    url: query,
    type: "GET",
    dataType: "json",
    success: function (res) {
      $("#forecast").empty();
      let FiveDays = res.list.filter((reading) => {
        return reading.dt_txt.includes("15:00:00");
      });
      FiveDays.forEach((day) => {
        let card = $("<div>").addClass("card");
        let cardBody = $("<div>").addClass("card-body");
        let content = $("<div>").addClass("card-content");
        let date = $("<h5>")
          .addClass("card-title")
          .text(new Date(day.dt_txt).toLocaleDateString());
        let icon = $("<img>").attr(
          "src",
          `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`
        );
        let temp = $("<p>").text(`Temp: ${day.main.temp}° F`);
        let humidity = $("<p>").text(`Humidity: ${day.main.humidity}%`);
        let wind = $("<p>").text(`Wind: ${day.wind.speed} mph`);
        content.append(date, icon, temp, humidity, wind);
        $("#fiveDayForecast").append(card.append(cardBody.append(content)));
      });
    },
  });
}
