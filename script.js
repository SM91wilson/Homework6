// var to get the current date
var today = new Date();
var currentDate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
// empty array
var cities = [];
// get array from local storage
var cities = [JSON.parse(localStorage.getItem("cities"))];

// event listener for the submit button
$("button").on("click", function (e) { 
  // stop the page from navigating away
  e.preventDefault();
  generateWeather();
  });
  // function to generate weather
  function generateWeather() {
    // var for the div called currentCity and for one called forecast
    var currentCity = $(".current-city");
    var forecast = $(".forecast");
    // getting the value of the input text
    var city = $("#search").val();
    // my api key
    var APIKey = "ab35b7ff4acffaadd63092658010c663";
    // building the query url
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    console.log(city);

    //  emptying relevant divs
    $(currentCity).empty();
    $(".savedBtns").empty();
    $("h4").remove();
    $(".day2weather").empty();
    $(".day3weather").empty();
    $(".day4weather").empty();
    $(".day5weather").empty();
    $(".day6weather").empty();
   
    
    // the first ajax call for current weather
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);

      // building the div with the information from the ajax call and the text input
      $(currentCity).append($("<h2>").text(city + " (" + currentDate + ")"));
      $(currentCity).append($("<ul>").addClass("cwlist"));
      var weatherList = $(".cwlist");
      $(weatherList).append($("<li>").text("Temperature: " + ((((response.main.temp) - 273.15) * 9 / 5 + 32).toFixed(1)) + "°F"));
      $(weatherList).append($("<li>").text("Humidity: " + (response.main.humidity) + "%"));
      $(weatherList).append($("<li>").text("Wind Speed: " + (response.wind.speed) + "MPH"));

      // for loop to create buttons from the saved data in the local storage
      for (let i = 0; i < cities.length; i++) {
        $(".savedBtns").append($("<li>").append($("<button>").text(cities[i])));
      };

      // ajax call for the 5 day forecast
      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey,
        method: "GET"
      }).then(function (forecastDays) {
        console.log(forecastDays);
        $(forecast).prepend($("<h4>").text("5 Day Forecast"));

        $(".day2weather").append($("<li>").text(forecastDays.list[3].dt_txt));
        $(".day2weather").append($("<li>").text("temp: " + (((((forecastDays.list[3].main.temp) - 273.15) * 9 / 5 + 32).toFixed(1)) + "°F")));
        $(".day2weather").append($("<li>").text("humidity: " + forecastDays.list[3].main.humidity + "%"));

        $(".day3weather").append($("<li>").text(forecastDays.list[11].dt_txt));
        $(".day3weather").append($("<li>").text("temp: " + (((((forecastDays.list[11].main.temp) - 273.15) * 9 / 5 + 32).toFixed(1)) + "°F")));
        $(".day3weather").append($("<li>").text("humidity: " + forecastDays.list[11].main.humidity + "%"));

        $(".day4weather").append($("<li>").text(forecastDays.list[19].dt_txt));
        $(".day4weather").append($("<li>").text("temp: " + (((((forecastDays.list[19].main.temp) - 273.15) * 9 / 5 + 32).toFixed(1)) + "°F")));
        $(".day4weather").append($("<li>").text("humidity: " + forecastDays.list[19].main.humidity + "%"));

        $(".day5weather").append($("<li>").text(forecastDays.list[27].dt_txt));
        $(".day5weather").append($("<li>").text("temp: " + (((((forecastDays.list[27].main.temp) - 273.15) * 9 / 5 + 32).toFixed(1)) + "°F")));
        $(".day5weather").append($("<li>").text("humidity: " + forecastDays.list[27].main.humidity + "%"));

        $(".day6weather").append($("<li>").text(forecastDays.list[35].dt_txt));
        $(".day6weather").append($("<li>").text("temp: " + (((((forecastDays.list[35].main.temp) - 273.15) * 9 / 5 + 32).toFixed(1)) + "°F")));
        $(".day6weather").append($("<li>").text("humidity: " + forecastDays.list[35].main.humidity + "%"));
      });

      // add current city to array
      cities.push(city);
      console.log(cities);
      // store the array to local storage
      localStorage.setItem("cities", JSON.stringify(cities));
    });
  }

// attempt at giving the buttons the function of bringing up the info of the city stated
$(".savedBtns").on("click", function (ev) {
  ev.preventDefault();
  var city = $(this).text();
  generateWeather();

});
