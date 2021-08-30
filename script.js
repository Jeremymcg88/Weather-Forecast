// creating on click for search btn
let searchBtn = document.getElementById('search');

searchBtn.addEventListener('click', function() {
    console.log(document.getElementById('location').value)

   var url = `https://api.openweathermap.org/data/2.5/weather?q=${document.getElementById('location').value}&appid=bd0834857d11c7c26292f5e1e8657635&units=imperial`

   console.log('Url ????', url)


   fetch(url)
   .then(function(response) {
       console.log('RAW RESPONSE from over the inter!!', response)
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

    console.log('Awesome new url!! that we are gonna smack!', oneCallUrl)

    fetch(oneCallUrl)
   .then(function(response) {
       console.log('RAW RESPONSE from over the inter!!', response)
       return response.json()
    })
   .then(function(data) {
        console.log('WHOLE DATA  ONE CALL API thing THING!!!!', data)    
        // put that stuff on the page!!

   });
}