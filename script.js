const temperatureField = document.querySelector(".temp")
const locationField = document.querySelector(".time_location p")
const dateandTimeField = document.querySelector(".time_location span")
const conditionField = document.querySelector(".condition p")
const weatherIcon = document.querySelector(".weather-icon");
const searchField = document.querySelector(".search_area")
const form = document.querySelector("form")
const container = document.querySelector(".container");


let target = 'Nagpur'

form.addEventListener('submit', searchForLocation)

const fetchResults = async (targetLocation) => {
    try{
    let url = `http://api.weatherapi.com/v1/current.json?key=2737188e4808422ea7d93222240911&q=${targetLocation}}&aqi=no`
    const res = await fetch(url)
    const data = await res.json()  // changing response to json data
    console.log(data)

    let locName = data.location.name
    let locTime = data.location.localtime
    let locTemp = data.current.temp_c
    let locCondition = data.current.condition.text

    updateDetails(locTemp, locName, locTime, locCondition)
    }catch (error){
        console.error("Error fetching data:",error)
    }
};

function updateDetails(locTemp, locName, locTime, locCondition) {

    const [splitDate, splitTime] = locTime.split(' ')
    const currentDay = getDayName(new Date(splitDate).getDay()) 

    temperatureField.innerText = `${locTemp}°`
    locationField.innerText = locName
    dateandTimeField.innerText = `${splitTime} - ${currentDay} ${splitDate}`
    conditionField.innerText = locCondition

    updateWeatherIcon(locCondition)
    updateBackground(locCondition)
}

function updateWeatherIcon(condition) {
    let iconClass = "fas fa-sun";

    if (condition.toLowerCase().includes("cloud")) {
        iconClass = "fas fa-cloud";
    } else if (condition.toLowerCase().includes("rain")) {
        iconClass = "fas fa-cloud-showers-heavy";
    } else if (condition.toLowerCase().includes("mist") || condition.toLowerCase().includes("fog")) {
        iconClass = "fas fa-smog";
    } else if (condition.toLowerCase().includes("snow")) {
        iconClass = "fas fa-snowflake";
    } else if (condition.toLowerCase().includes("thunder")) {
        iconClass = "fas fa-bolt";
    } else if (condition.toLowerCase().includes("overcast")) {
        iconClass = "fas fa-cloud-cast";
    }

    weatherIcon.className = `weather-icon ${iconClass}`;
}
function updateBackground(condition) {
    let backgroundImage = "url('default.jpg')"; 

    if (condition.toLowerCase().includes("cloud")) {
        backgroundImage = "url('cloudy.jpg')";
    } else if (condition.toLowerCase().includes("rain")) {
        backgroundImage = "url('rainy.jpg')";
    } else if (condition.toLowerCase().includes("mist") || condition.toLowerCase().includes("fog")) {
        backgroundImage = "url('mist.jpg')";
    } else if (condition.toLowerCase().includes("snow")) {
        backgroundImage = "url('snow.jpg')";
    } else if (condition.toLowerCase().includes("thunder")) {
        backgroundImage = "url('thunder.jpg')";
    }else if (condition.toLowerCase().includes("overcast")) {
            backgroundImage = "url('overcast.jpg')";
    } else if (condition.toLowerCase().includes("clear") || condition.toLowerCase().includes("sun")) {
        backgroundImage = "url('sunny.jpg')";
    }

    container.style.backgroundImage = backgroundImage;
}

fetchResults(target)

function getDayName(number) {
    switch (number) {
        case 0:
            return 'Sunday'
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wedensday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        case 6:
            return 'Saturday'
    }
}

function searchForLocation(e) {
    e.preventDefault();
    target = searchField.value;
    fetchResults(target);
}


