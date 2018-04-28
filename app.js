var getLocation = document.querySelector("#getLocation");
var updateWeather = document.querySelector("#updateWeather");
var latitude;
var longitude;
var url = "https://fcc-weather-api.glitch.me/api/current?lat=40.6558213&lon=-111.8863817";
var city = document.querySelector("#city");
var temp = document.querySelector("#temp");
var tempType = document.querySelector("#tempType");
var sky = '';
var currentTemp;
const farenheitButton = document.querySelector("#farenheit");
const celciusButton = document.querySelector("#celcius");
var isCelcius = true;

var background = {
    snow: 'https://images.unsplash.com/photo-1465220183275-1faa863377e3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4522f2cfd26358642b9458f52c5b01d7&auto=format&fit=crop&w=1267&q=80',
    rain: 'https://images.unsplash.com/photo-1487762488615-8a011458b53e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3008819eae6e8e6e82675619ba1a48fd&auto=format&fit=crop&w=1267&q=80',
    clear: 'https://images.unsplash.com/photo-1501682855625-15c985cd12a5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=24786866cf6aa9009096c706f1fd3454&auto=format&fit=crop&w=1350&q=80',
    clouds: 'https://images.unsplash.com/photo-1484758451231-0ca7abf647bc?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b00c9335e4186e785bcfac53367544ed&auto=format&fit=crop&w=1350&q=80'
}

geoFindMe();
getLocation.onclick = geoFindMe;
updateWeather.onclick = getWeather;
getWeather();
farenheitButton.onclick = () => ctof(currentTemp);
celciusButton.onclick = () => ftoc(currentTemp);



//geoFindMe();

function geoFindMe() {
    var output = document.getElementById("out");

    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }

    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
        getUrl(latitude, longitude);
    }

    function error() {
        output.innerHTML = "Unable to retrieve your location";
    }

    output.innerHTML = "<p>Locating…</p>";

    navigator.geolocation.getCurrentPosition(success, error);
}

// ======= Weather API stuff =======



function getUrl(lat, lon) {
    url = 'https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + lon;
};


function getWeather(data) {
    fetch(url) // Call the fetch function passing the url of the API as a parameter
        .then(resp => {
            return resp.json()
        })
        .then(function (data) {
            city.innerHTML = data.name;
            currentTemp = data.main.temp
            temp.innerHTML = currentTemp;
            sky = data.weather[0].main;
            sky = sky.toLowerCase();
            //console.log(sky);
            let skyBackground = background[sky];
            //console.log(skyBackground);
            if (skyBackground) {
                document.body.style.backgroundImage = 'url(' + skyBackground + ')';
            } else {
                document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1489517456831-3994100a43bd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a31684ae035e64a810b9ec10ff9f6b8a&auto=format&fit=crop&w=1189&q=80')";
            }
            disableButton();
        })
        .catch(function (err) {
            // This is where you run code if the server returns any errors
            console.log(err)
        });
}

function setBackground(sky) {
    document.body.style.backgroundImage = 'url(sky)';
}

function ftoc(f) {
    var c = (5 / 9) * (f - 32);
    currentTemp = Math.round(c * 10) / 10;
    temp.innerHTML = currentTemp;
    isCelcius = true;
    disableButton();
}

function ctof(c) {
    var f = 1.8 * c + 32;
    currentTemp = Math.round(f * 10) / 10;
    temp.innerHTML = currentTemp;
    isCelcius = false;
    disableButton();
}

function disableButton() {
    if (isCelcius === true) {
        //disable celciusButton
        tempType.textContent = "C";
        celciusButton.disabled = true;
        farenheitButton.disabled = false;
    } else {
        //disable farenheitButton
        tempType.textContent = "F";
        celciusButton.disabled = false;
        farenheitButton.disabled = true;
    }
}
