let req, response;


let today = document.getElementById("today-day"),
    todayDate = document.getElementById("today-date"),
    todayCity = document.querySelector(".city"),
    todayDegree = document.querySelector(".today-degree"),
    todayIcon = document.getElementById("today-icon"),
    todayDescription = document.querySelector(".today-desc"),
    rainy = document.querySelector(".rainy"),
    windy = document.querySelector(".windy"),
    direction = document.querySelector(".direction"),
    searchCity = document.getElementById("searchCity");




let nextDay = document.getElementsByClassName("nextDay-day"),
    nextDayIcon = document.getElementsByClassName("nextDay-icon"),
    maxDegree = document.getElementsByClassName("maxdegree"),
    minDegree = document.getElementsByClassName("mindegree"),
    nextDayDescription = document.getElementsByClassName("desc"),





months = ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'];
days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


//To get the data
async function getWeatherData( currentCity = 'cairo' ){
    apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`)
    response = await apiResponse.json();
    // console.log(responseData)
    displayWeatherToday();
    displayWeatherNextDay();
  }

// getWeatherData();


function displayWeatherToday(){

    let date = new Date();
    today.innerHTML= days[date.getDay()];
    todayDate.innerHTML = `${date.getDate()} ${ months[date.getMonth()]}`;
    todayCity.innerHTML =  response.location.name;
    todayDegree.innerHTML = response.current.temp_c;
    todayIcon.setAttribute('src' ,`https:${response.current.condition.icon}`);
    todayDescription.innerHTML = response.current.condition.text;
    rainy.innerHTML = response.current.humidity;
    windy.innerHTML = response.current.wind_kph;
    direction.innerHTML = response.current.wind_dir;
   
}


function displayWeatherNextDay(){
    for(let i=0 ; i<nextDay.length ; i++){
        nextDay[i].innerHTML= days[new Date(response.forecast.forecastday[i+1].date).getDay()];
        nextDayIcon[i].setAttribute('src',`https:${response.forecast.forecastday[i+1].day.condition.icon}`)
        maxDegree[i].innerHTML = response.forecast.forecastday[i+1].day.maxtemp_c;
        minDegree[i].innerHTML = response.forecast.forecastday[i+1].day.mintemp_c;
        nextDayDescription[i].innerHTML = response.forecast.forecastday[i+1].day.condition.text;
    }
}

document.querySelector('#searchCity').addEventListener('keyup' , function(){
    currentCity = document.querySelector('#searchCity').value;
    getWeatherData();
})

searchCity.addEventListener('keyup' , function(){
    currentCity= searchCity.value;
//    console.log( currentCity );
    getWeatherData( currentCity );
  });