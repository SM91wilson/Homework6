// var to get the current date
var today = new Date();
var currentDate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
// get array from local storage
var cities = [JSON.parse(localStorage.getItem("cities"))];
// my api key
var APIKey = "ab35b7ff4acffaadd63092658010c663";
// setting the city search var
var city = $("#search").val();

// event listener for the submit button
$("button").on("click", function (e) {
  // stop the page from navigating away
  e.preventDefault();
  // run function to generate weather data
  generateWeather();
  // run function to generate buttons
  // buttonList();

// function to generate weather
function generateWeather() {
  // var for the div called currentCity
  var currentCity = $(".current-city");
  // getting the value of the input text
  city = $("#search").val();

  // building the query url
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
  console.log(city);

  //  emptying relevant divs
  $(currentCity).empty();
  $(".savedBtns").empty();
  $("h4").remove();
  $(".day2").empty();
  $(".day3").empty();
  $(".day4").empty();
  $(".day5").empty();
  $(".day6").empty();

  // the first ajax call for current weather
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    // building the div with the information from the ajax call and the text input
    $(currentCity).addClass("card");
    // add city and date as title
    $(currentCity).append($("<h2>").text(city + " (" + currentDate + ")"));
    // adding icon from openweathermaps through the response data 
    $(currentCity).append(($("<img>").attr({
        class: "icon col-2",
        src: "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png",
        alt: "weather-icon"
    })));
    $(currentCity).append($("<div>").addClass("weatherStats"));
    var weatherStats = $(".weatherStats");
    // adding weather stats for the current date of the serached city
    $(weatherStats).append($("<p>").text("Temperature: " + ((((response.main.temp) - 273.15) * 9 / 5 + 32).toFixed(1)) + "°F"));
    $(weatherStats).append($("<p>").text("Humidity: " + (response.main.humidity) + "%"));
    $(weatherStats).append($("<p>").text("Wind Speed: " + (response.wind.speed) + "MPH"));

    // for loop to create buttons from the saved data in the local storage
    function buttonList(){
    for (let i = 1; i < cities.length; i++) {
      $(".savedBtns").append($("<li>").append($("<button>").text(cities[i])));
    };
    }

    // ajax call for the 5 day forecast
    function forcast(){
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey,
      method: "GET"
    }).then(function (forecastDays) {
      console.log(forecastDays);
      // adding a title for the forecast
      $(".forecast-title").append($("<h4>").text("5 Day Forecast"));

      // adding the date of the next day in the forecast, removing the time from the title
      $(".day2").append($("<p>").text((forecastDays.list[4].dt_txt).slice(0,10)));
      // get icon from forecastDays data
      $(".day2").append($("img>").attr({
          class: "icon col-2",
          src: "http://openweathermap.org/img/w/" + forecastDays.list[4].weather[0].icon + ".png",
          alt: "forecast-icon"
      }));      
      $(".day2").append($("<p>").text("temp: " + (((((forecastDays.list[4].main.temp) - 273.15) * 9 / 5 + 32).toFixed(1)) + "°F")));
      $(".day2").append($("<p>").text("humidity: " + forecastDays.list[4].main.humidity + "%"));

      $(".day3").append($("<p>").text((forecastDays.list[12].dt_txt).slice(0,10)));
      $(".day2").append($("img>").attr({
        class: "icon col-2",
        src: "http://openweathermap.org/img/w/" + forecastDays.list[12].weather[0].icon + ".png",
        alt: "forecast-icon"
    })); 
      $(".day3").append($("<p>").text("temp: " + (((((forecastDays.list[12].main.temp) - 273.15) * 9 / 5 + 32).toFixed(1)) + "°F")));
      $(".day3").append($("<p>").text("humidity: " + forecastDays.list[12].main.humidity + "%"));

      $(".day4").append($("<p>").text((forecastDays.list[20].dt_txt).slice(0,10)));
      $(".day2").append($("img>").attr({
        class: "icon col-2",
        src: "http://openweathermap.org/img/w/" + forecastDays.list[20].weather[0].icon + ".png",
        alt: "forecast-icon"
    })); 
      $(".day4").append($("<p>").text("temp: " + (((((forecastDays.list[20].main.temp) - 273.15) * 9 / 5 + 32).toFixed(1)) + "°F")));
      $(".day4").append($("<p>").text("humidity: " + forecastDays.list[20].main.humidity + "%"));

      $(".day5").append($("<p>").text((forecastDays.list[28].dt_txt).slice(0,10)));
      $(".day2").append($("img>").attr({
        class: "icon col-2",
        src: "http://openweathermap.org/img/w/" + forecastDays.list[28].weather[0].icon + ".png",
        alt: "forecast-icon"
    })); 
      $(".day5").append($("<p>").text("temp: " + (((((forecastDays.list[28].main.temp) - 273.15) * 9 / 5 + 32).toFixed(1)) + "°F")));
      $(".day5").append($("<p>").text("humidity: " + forecastDays.list[28].main.humidity + "%"));

      $(".day6").append($("<p>").text((forecastDays.list[36].dt_txt).slice(0,10)));
      $(".day2").append($("img>").attr({
        class: "icon col-2",
        src: "http://openweathermap.org/img/w/" + forecastDays.list[36].weather[0].icon + ".png",
        alt: "forecast-icon"
    })); 
      $(".day6").append($("<p>").text("temp: " + (((((forecastDays.list[36].main.temp) - 273.15) * 9 / 5 + 32).toFixed(1)) + "°F")));
      $(".day6").append($("<p>").text("humidity: " + forecastDays.list[36].main.humidity + "%"));
    });
  }
  forcast();

  if(cities.includes(city)){
    buttonList();
  }else{
    // add current city to array
    cities.push(city);
  }
    console.log(cities);
    // store the array to local storage
    localStorage.setItem("cities", JSON.stringify(cities));
    buttonList();
  });
}});

// attempt at giving the buttons the function of bringing up the info of the city stated
$(".savedBtns").on("click", function (ev) {
  ev.preventDefault();
  console.log(ev);
  var city = $(this).text();
  generateWeather();
});
// }});
