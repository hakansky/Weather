let input = document.querySelector('.input-user-city');
let userCityName = document.querySelector('.user-city-name');
let weatherDegree = document.querySelector('.weather-degree');
let weatherDescription = document.querySelector('.weather-description');
let weatherIcon = document.querySelector('.weather-icon');
let weatherFeelsLike = document.querySelector('.weather-feels-like');
let weatherWind = document.querySelector('.weather-wind');
let buttonRemember = document.querySelector('.button-remember');
let leftSection = document.querySelector('.left-section');

let arrow = document.querySelector('.arrow');
let aside = document.querySelector('aside');
let firstDay = document.querySelector('#firstDay');
let secondDay = document.querySelector('#secondDay');
let thirdDay = document.querySelector('#thirdDay');
let fourthDay = document.querySelector('#fourthDay');
let firstIMG = document.querySelector('.first-img');
let secondIMG = document.querySelector('.second-img');
let thirdIMG = document.querySelector('.third-img');
let fourthIMG = document.querySelector('.fourth-img');
let firstTemperature = document.querySelector('#max-min-4-1');
let secondTemperature = document.querySelector('#max-min-4-2');
let thirdTemperature = document.querySelector('#max-min-4-3');
let fourthTemperature = document.querySelector('#max-min-4-4');
let dateText1 = document.querySelector('.date1');
let dateText2 = document.querySelector('.date2');
let dateText3 = document.querySelector('.date3');
let dateText4 = document.querySelector('.date4');

let maxLabel = document.querySelector('.max');
let minLabel = document.querySelector('.min');
let feelsLikeLabel = document.querySelector('.feels-like');
let windLabel = document.querySelector('.wind');
let rememberLabel = document.querySelector('.button-remember');

const iconMapping = {
    '01d': '01d.svg',
    '02d': '02d.svg',
    '03d': '03d.svg',
    '04d': '04d.svg',
    '09d': '09d.svg',
    '10d': '10d.svg',
    '11d': '11d.svg',
    '13d': '13d.svg',
    '01n': '01n.svg',
    '02n': '02n.svg',
    '03n': '03n.svg',
    '04n': '04n.svg',
    '09n': '09n.svg',
    '10n': '10n.svg',
    '11n': '11n.svg',
    '13n': '13n.svg',
};

aside.style.display = 'none';

input.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        if (input.value !== '') {
            getWeather(input.value);
            getWeatherForNextDays(input.value);
            maxLabel.style.display = 'block';
            minLabel.style.display = 'block';
            feelsLikeLabel.style.display = 'block';
            windLabel.style.display = 'block';
            rememberLabel.style.display = 'block';
            userCityName.style.display = 'block';
            arrow.style.display = 'block';
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
        aside.style.display = 'none';
        arrow.style.display = 'none';
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

            let iconCode = data.weather[0]['icon'];
            let iconFileName = iconMapping[iconCode];
            let imagePath = `../assets/icons/amcharts_weather_icons_1.0.0/animated/${iconFileName}`;
            weatherIcon.innerHTML = `<img src="${imagePath}" />`;

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

function getWeatherForNextDays (city) {
    let url = 'https://api.openweathermap.org/data/2.5/forecast?q='+ city + '&cnt=32&appid=d07db496d3a14c4144742b427e4dad22&units=metric&mode=json';
    ;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let weatherFirstDay = data.list[7];
            let weatherSecondDay = data.list[15];
            let weatherThirdDay = data.list[23];
            let weatherFourthDay = data.list[31];
            firstTemperature.innerHTML = `Temp: ${weatherFirstDay.main.temp_max.toFixed(0)}&deg`;
            secondTemperature.innerHTML = `Temp: ${weatherSecondDay.main.temp_max.toFixed(0)}&deg`;
            thirdTemperature.innerHTML = `Temp: ${weatherThirdDay.main.temp_max.toFixed(0)}&deg`;
            fourthTemperature.innerHTML = `Temp: ${weatherFourthDay.main.temp_max.toFixed(0)}&deg`;

            let iconCodeFirst = weatherFirstDay.weather[0]['icon'];
            let iconCodeSecond = weatherSecondDay.weather[0]['icon'];
            let iconCodeThird = weatherThirdDay.weather[0]['icon'];
            let iconCodeFourth = weatherFourthDay.weather[0]['icon'];
            let firstIconFileName = iconMapping[iconCodeFirst];
            let secondIconFileName = iconMapping[iconCodeSecond];
            let thirdIconFileName = iconMapping[iconCodeThird];
            let fourthIconFileName = iconMapping[iconCodeFourth];
            let firstImagePath = `../assets/icons/amcharts_weather_icons_1.0.0/animated/${firstIconFileName}`;
            let secondImagePath = `../assets/icons/amcharts_weather_icons_1.0.0/animated/${secondIconFileName}`;
            let thirdImagePath = `../assets/icons/amcharts_weather_icons_1.0.0/animated/${thirdIconFileName}`;
            let fourthImagePath = `../assets/icons/amcharts_weather_icons_1.0.0/animated/${fourthIconFileName}`;
            firstIMG.innerHTML = `<img src="${firstImagePath}" />`;
            secondIMG.innerHTML = `<img src="${secondImagePath}" />`;
            thirdIMG.innerHTML = `<img src="${thirdImagePath}" />`;
            fourthIMG.innerHTML = `<img src="${fourthImagePath}" />`;

            let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            let dateFromJson1 = weatherFirstDay.dt_txt;
            let dateFromJson2 = weatherSecondDay.dt_txt;
            let dateFromJson3 = weatherThirdDay.dt_txt;
            let dateFromJson4 = weatherFourthDay.dt_txt;

            let date1 = new Date(dateFromJson1);
            let dayOfWeek1 = date1.getDay();
            let dayName1 = days[dayOfWeek1];

            let date2 = new Date(dateFromJson2);
            let dayOfWeek2 = date2.getDay();
            let dayName2 = days[dayOfWeek2];

            let date3 = new Date(dateFromJson3);
            let dayOfWeek3 = date3.getDay();
            let dayName3 = days[dayOfWeek3];

            let date4 = new Date(dateFromJson4);
            let dayOfWeek4 = date4.getDay();
            let dayName4 = days[dayOfWeek4];

            firstDay.innerHTML = dayName1;
            secondDay.innerHTML = dayName2;
            thirdDay.innerHTML = dayName3;
            fourthDay.innerHTML = dayName4;

            let fullDate1 = `${date1.getDate()}.${date1.getMonth() + 1}`;
            let fullDate2 = `${date2.getDate()}.${date2.getMonth() + 1}`;
            let fullDate3 = `${date3.getDate()}.${date3.getMonth() + 1}`;
            let fullDate4 = `${date4.getDate()}.${date4.getMonth() + 1}`;

            dateText1.innerHTML = fullDate1;
            dateText2.innerHTML = fullDate2;
            dateText3.innerHTML = fullDate3;
            dateText4.innerHTML = fullDate4;
        })
}

arrow.addEventListener('click', function () {
    switch (arrow.innerHTML) {
        case '⇲':
            aside.style.display = 'flex';
            leftSection.classList.add('animation');
            getWeatherForNextDays(userCityName.innerHTML);
            arrow.innerHTML = '⇱';
            break;
        case '⇱':
            aside.style.display = 'none';
            leftSection.classList.remove('animation');
            arrow.innerHTML = '⇲';
            break;
        }
})
