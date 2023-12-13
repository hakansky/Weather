let input = document.querySelector('.input-user-city');
let userCityName = document.querySelector('.user-city-name');
let weatherDegree = document.querySelector('.weather-degree');
let weatherDescription = document.querySelector('.weather-description');
let weatherIcon = document.querySelector('.weather-icon');
let weatherFeelsLike = document.querySelector('.weather-feels-like');
let weatherWind = document.querySelector('.weather-wind');
let buttonRemember = document.querySelector('.button-remember');

let maxLabel = document.querySelector('.max');
let minLabel = document.querySelector('.min');
let feelsLikeLabel = document.querySelector('.feels-like');
let windLabel = document.querySelector('.wind');
let rememberLabel = document.querySelector('.button-remember');


input.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        if (input.value !== '') {
            getWeather(input.value);
            maxLabel.style.display = 'block';
            minLabel.style.display = 'block';
            feelsLikeLabel.style.display = 'block';
            windLabel.style.display = 'block';
            rememberLabel.style.display = 'block';
            userCityName.style.display = 'block';
        }
    }
})

document.addEventListener('DOMContentLoaded', function () {
    GetCity ();
    if (userCityName.innerHTML === '') {
        weatherIcon.innerHTML = '🍃';
        userCityName.innerHTML = '';
        weatherDegree.innerHTML = '';
        weatherDescription.innerHTML = '';
        weatherFeelsLike.innerHTML = '';
        weatherWind.innerHTML = '';
        maxLabel.style.display = 'none';
        minLabel.style.display = 'none';
        feelsLikeLabel.style.display = 'none';
        windLabel.style.display = 'none';
        rememberLabel.style.display = 'none';
        userCityName.style.display = 'none';
    }
})

function getWeather(city) {
    let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=' + city + '&appid=d07db496d3a14c4144742b427e4dad22';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            userCityName.innerHTML = data.name;
            weatherDegree.innerHTML = data.main.temp.toFixed(0) + '&deg';
            weatherDescription.innerHTML = data.weather[0].description;
            maxLabel.innerHTML = 'Max: ' + data.main.temp_max.toFixed(0) + '&deg' + ' |';
            minLabel.innerHTML = '| Min: ' + data.main.temp_min.toFixed(0) + '&deg';
            weatherFeelsLike.innerHTML = data.main.feels_like.toFixed(0) + '&deg';
            weatherWind.innerHTML = data.wind.speed.toFixed(0) + 'm/s';
            // weatherIcon.innerHTML = '<img src="https://openweathermap.org/img/wn/' + data.weather[0]['icon'] + '@2x.png"/>'
            switch (data.weather[0]['icon']) {
                case '01d':
                    weatherIcon.innerHTML = '<img src="../assets/icons/amcharts_weather_icons_1.0.0/animated/01d.svg" />'
                    break
                case '02d':
                    weatherIcon.innerHTML = '<img src="../assets/icons/amcharts_weather_icons_1.0.0/animated/02d.svg" />'
                    break
                case '03d':
                    weatherIcon.innerHTML = '<img src="../assets/icons/amcharts_weather_icons_1.0.0/animated/03d.svg" />'
                    break
                case '04d':
                    weatherIcon.innerHTML = '<img src="../assets/icons/amcharts_weather_icons_1.0.0/animated/04d.svg" />'
                    break
                case '09d':
                    weatherIcon.innerHTML = '<img src="../assets/icons/amcharts_weather_icons_1.0.0/animated/09d.svg" />'
                    break
                case '10d':
                    weatherIcon.innerHTML = '<img src="../assets/icons/amcharts_weather_icons_1.0.0/animated/10d.svg" />'
                    break
                case '11d':
                    weatherIcon.innerHTML = '<img src="../assets/icons/amcharts_weather_icons_1.0.0/animated/11d.svg" />'
                    break
                case '13d':
                    weatherIcon.innerHTML = '<img src="../assets/icons/amcharts_weather_icons_1.0.0/animated/13d.svg" />'
                    break
                case '01n':
                    weatherIcon.innerHTML = '<img src="../assets/icons/amcharts_weather_icons_1.0.0/animated/01n.svg" />'
                    break
                case '02n':
                    weatherIcon.innerHTML = '<img src="../assets/icons/amcharts_weather_icons_1.0.0/animated/02n.svg" />'
                    break
                case '03n':
                    weatherIcon.innerHTML = '<img src="../assets/icons/amcharts_weather_icons_1.0.0/animated/03n.svg" />'
                    break
                case '04n':
                    weatherIcon.innerHTML = '<img src="../assets/icons/amcharts_weather_icons_1.0.0/animated/04n.svg" />'
                    break
                case '09n':
                    weatherIcon.innerHTML = '<img src="../assets/icons/amcharts_weather_icons_1.0.0/animated/09n.svg" />'
                    break
                case '10n':
                    weatherIcon.innerHTML = '<img src="../assets/icons/amcharts_weather_icons_1.0.0/animated/10n.svg" />'
                    break
                case '11n':
                    weatherIcon.innerHTML = '<img src="../assets/icons/amcharts_weather_icons_1.0.0/animated/11n.svg" />'
                    break
                case '13n':
                    weatherIcon.innerHTML = '<img src="../assets/icons/amcharts_weather_icons_1.0.0/animated/13n.svg" />'
                    break
            }
            let temperature = Math.round(data.main.temp);
            changeBackgroundColor(temperature);
        })
}

buttonRemember.addEventListener('click', RememberCity);

function RememberCity () {
    localStorage.setItem('User City Name', userCityName.innerHTML);
}

function GetCity () {
        userCityName.innerHTML = localStorage.getItem('User City Name');
        let city = userCityName.innerHTML;
        let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=' + city + '&appid=d07db496d3a14c4144742b427e4dad22';
        getWeather(city);
}

function changeBackgroundColor (temperature) {
    if (temperature < 10) {
        document.body.style.background = 'rgb(255,255,255)'
        document.body.style.background = 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(151,255,249,1) 100%)';
    } else if (temperature >= 10) {
        document.body.style.background = 'rgb(255,244,129)'
        document.body.style.background = 'radial-gradient(circle, rgba(255,244,129,1) 0%, rgba(255,168,132,1) 100%)';
    }
}
