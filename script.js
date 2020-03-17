// var to get the current date
var today = new Date();
var currentDate = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

// event listener for the submit button
$("button").on("click", function(e){

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

  //  emptying the current city div
  $(currentCity).empty();
  $(forecast).empty();
  // stop the page from navigating away
  e.preventDefault();
  // the ajax call
    $.ajax({
      url:queryURL,
      method: "GET"
    }).then(function(response){
    console.log(response);

    // building the div with the information from the ajax call and the text input
    $(currentCity).append($("<h2>").text(city + " (" + currentDate +")"));
    $(currentCity).append($("<ul>"));
    var weatherList = $("ul");
    $(weatherList).append($("<li>").text("Temperature: " + ((((response.main.temp)-273.15)* 9/5 + 32).toFixed(1)) + "°F"));
    $(weatherList).append($("<li>").text("Humidity: " + (response.main.humidity) + "%"));
    $(weatherList).append($("<li>").text("Wind Speed: " + (response.wind.speed) + "MPH"));
    
  
      $.ajax({
        url:"https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey,
        method: "GET"
      }).then(function(forecastDays){
        console.log(forecastDays);
        $(forecast).append($("<h5>").text("5 Day Forecast"));
        

      });
      
      

    

  
  

  // array to store all searched for cities
  var cities = [];
  // add current city to array
  cities.push(city);
  // store the array to local storage
  localStorage.setItem("cities", JSON.stringify(cities));
  // $("aside").append($("<button>").text(city));  

  // retrieve data from local storage
  // generate buttons from data the recalls the information from the response
  // ajax call for 5 day forecast
});
});