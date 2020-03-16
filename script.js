$("button").on("click", function(e){

  var currentCity = $(".current-city");
  var city = $("#search").val();  
  var APIKey = "ab35b7ff4acffaadd63092658010c663";
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
  console.log(city);

  $(currentCity).empty();
  e.preventDefault();
    $.ajax({
    url:queryURL,
    method: "GET"
    }).then(function(response){
    console.log(response);

  
  
  $(currentCity).append($("<h2>").text(city));
  $(currentCity).append($("<ul>"));
  var weatherList = $("ul");
  $(weatherList).append($("<li>").text("Temperature: " + ((((response.main.temp)-273.15)* 9/5 + 32).toFixed(1)) + "°F"));
  $(weatherList).append($("<li>").text("Humidity: " + (response.main.humidity) + "%"));
  $(weatherList).append($("<li>").text("Wind Speed: " + (response.wind.speed) + "MPH"));
  
  var cities = [];
  cities.push(city);
  localStorage.setItem("cities", JSON.stringify(cities));
  // $("aside").append($("<button>").text(city));  
})
});