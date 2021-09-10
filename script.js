
// creating on click for search btn
let searchBtn = document.getElementById('search-button');
var weatherColumns = document.getElementById('forecast-container');
let cityInput = "";
let clearInput = "";
let cityName = "";
var searchHistory = localStorage.getItem("searchHistory")
if(!searchHistory){
    searchHistory=[]
}
else
{
    searchHistory=JSON.parse(searchHistory);
}

// returns zip code information after the click happens 
searchBtn.addEventListener('click', function() {
var searchQuery = document.getElementById('city-input').value;


searchHistory.push(searchQuery);
localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
      console.log(searchHistory);

    // API key that returns the zipcode typed in by user 
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=bd0834857d11c7c26292f5e1e8657635&units=imperial`
    console.log('Url ????', url)
    console.log(document.getElementById('city-input').value);
    fetch(url)
       .then(function(response) {
           console.log('RAW RESPONSE from over the inter!!', response)
           // Always want to convert fetch responses to Json for user readability 
           return response.json()
        })
       .then(function(data) {
            console.log('WHOLE DATA THING!!!!', data)
            console.log('just the temp!',data.main.temp)
    
            oneCallApi(data.coord.lat, data.coord.lon)
       });
    });


function oneCallApi(lat, lon) {
    console.log('lat and lon we gave to our new fucntin thing!', lat, lon)
    var oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=bd0834857d11c7c26292f5e1e8657635&units=imperial`

    console.log('Awesome new url!! that gives lon/lat', oneCallUrl)

    fetch(oneCallUrl)
   .then(function(response) {
       console.log('RAW RESPONSE from over the inter!!', response)
       return response.json()
    })
   .then(function(data) {
        console.log('WHOLE DATA  ONE CALL API!!!!', data)

weatherColumns.innerHTML="";
    
for ( var i = 1; i < 6; i++) {
               var currentDay = data.daily[i]
    var dayBox=document.createElement('div');
    dayBox.classList.add("col", "forecast", "bg-primary", "text-white", "ml-3", "mb-3", "rounded");
    var forecastWeatherEl=document.createElement('p');
    forecastWeatherEl.textContent=getCurrentTimeFromStamp(currentDay.dt);
    var forecastWeatherImg=document.createElement('img');
    forecastWeatherImg.setAttribute('src', `http://openweathermap.org/img/wn/${currentDay.weather[0].icon}.png`)
    var forecastTempEl=document.createElement('p')
    forecastTempEl.textContent=`Temp:${currentDay.temp.max}`;
    var forecastWindEl=document.createElement('p');
    forecastWindEl.textContent=`Wind:${currentDay.wind_speed}`;
    var forecastHumidityEl=document.createElement('p');
    forecastHumidityEl.textContent=`Humidity:${currentDay.humidity}`;
    dayBox.append(forecastWeatherEl, forecastWeatherImg, forecastTempEl, forecastWindEl, forecastHumidityEl);
    weatherColumns.appendChild(dayBox);
 }
      
// http://openweathermap.org/img/wn/10d@2x.png = image to display weather
   });
};

var getCurrentTimeFromStamp = function(timestamp) {
    var d = new Date(timestamp*1000);
    timeStampCon = (d.getMonth()+1) + '/' + d.getDate() + '/' + d.getFullYear() + " " + d.getHours() + ':' + d.getMinutes();

    return timeStampCon;
};

// creating cards to display forcast
// storing the last search
// when i refresh i should see previous searches (local searches)
// being able to clear history






