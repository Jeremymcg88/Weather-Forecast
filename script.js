
// creating on click for search btn
let searchBtn = document.getElementById('search-button');

// Creating current day forecast display
var cityName = document.getElementById('city-name');

//Container that holds the 5 day forecast 
var weatherColumns = document.getElementById('forecast-container');

// this will clear the history from local storage and whats displayed on the page
let clearEl = document.getElementById('clear-history');

//this is where we'll displayed the last 5 cities underneath the clear history button
var historyEl = document.getElementById('history');

//global VAR for displaying current weather 
var currentWeather = document.getElementById('city-name');

// UV index
var currentUVEl = document.getElementById('UV-index');

// will parse out the information from local storage 
var searchHistory = localStorage.getItem("searchHistory")
if(!searchHistory){
    searchHistory=[]
}
else
{
    searchHistory=JSON.parse(searchHistory);
}
var APIkey = "bd0834857d11c7c26292f5e1e8657635";
// Will return information from API when clicked.
searchBtn.addEventListener('click', function() {
    var searchQuery = document.getElementById('city-input').value;
    
    // This takes the input information and stores it.
    searchHistory.push(searchQuery);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
          console.log(searchHistory);

          // API Key
          var APIkey = "bd0834857d11c7c26292f5e1e8657635";

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
        
                // Getting current day forecast
                currentWeather.innerHTML=`City Name: ${data.name}`
                currentWeather.classList.add("col-12");
                var currentTempEl = document.getElementById('temperature');
                currentTempEl.innerHTML=`Temperature: ${data.main.temp}`
                var currentHumidityEl = document.getElementById('humidity');
                currentHumidityEl.innerHTML=`Humidity: ${data.main.humidity}`;
                var currentWindSpeedEl = document.getElementById('wind-speed');
                currentWindSpeedEl.innerHTML = `Wind Speed: ${data.wind.speed}`; 
                
                
              
               
               // API call that gives us our UVI 
                oneCallApi(data.coord.lat, data.coord.lon)

                renderSearchHistory();
            });
        });
    
    
    function oneCallApi(lat, lon) {
        console.log('lat and lon we gave to our new function thing!', lat, lon)
        var oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=bd0834857d11c7c26292f5e1e8657635&units=imperial`
    
        console.log('Awesome new url!! that gives lon/lat', oneCallUrl)
    
        fetch(oneCallUrl)
       .then(function(response) {
           console.log('RAW RESPONSE from over the inter!!', response)
           return response.json()
        })
       .then(function(data) {
            console.log('WHOLE DATA  ONE CALL API!!!!', data)

           // grabbing image to display icon
            var CurrentForecastImgEl=document.createElement('img');
            CurrentForecastImgEl.setAttribute('src', `http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`)
            currentWeather.append(CurrentForecastImgEl);
            
            // Getting our UVI from the API OneCall which is grabbed from the long/lat data
           
            let UVIndex = document.createElement("span");
            // UVIndex.setAttribute("class","badge badge-danger");
            UVIndex.innerHTML = `${data.current.uvi}`
            currentUVEl.innerHTML = "UV Index: ";
            currentUVEl.append(UVIndex);

            //

            var uvUrl= "https://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid="+APIkey;
            fetch(uvUrl) //Starting a second fetch request for to obtain the UV from the open weather API.
            .then (function (response) {
                console.log ("UV has a "+response);
                return response.json();
            })
            
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
        forecastTempEl.textContent=`Temp: ${currentDay.temp.max}`;
        var forecastWindEl=document.createElement('p');
        forecastWindEl.textContent=`Wind: ${currentDay.wind_speed}`;
        var forecastHumidityEl=document.createElement('p');
        forecastHumidityEl.textContent=`Humidity: ${currentDay.humidity}`;
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


    // clears search history but page only after page is refreshed
    clearEl.addEventListener('click', function () {
        searchHistory = [];
        renderSearchHistory();
    })
    
    // Renders search history to be displayed undearneath the Clear history function
function renderSearchHistory() {
    historyEl.innerHTML="";
    for (let i=0; i<searchHistory.length; i++) {
        const historyItem = document.createElement("input");
        historyItem.setAttribute("type","text");
        historyItem.setAttribute("readyonly",true);
        historyItem.setAttribute("class", "form-control d-block bg-white");
        historyItem.setAttribute("value", searchHistory[i]);
        historyItem.addEventListener("click", function() {
            oneCallApi(historyItem.value);
        })
        historyEl.append(historyItem);
     }
}

renderSearchHistory();


// creating cards to display forcast
// storing the last search
// when i refresh i should see previous searches (local searches)
// being able to clear history






