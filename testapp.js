let todayValue;
let forcastHeader = document.querySelectorAll(`.forcastHeader`);
let currentWeekday = todayValue;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        //const proxy = `https://cors-anywhere.herokuapp.com/`;
        let api = /*${proxy}*/ `api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&appid=c6e1c6a1b1d5c50aa30efa50ff543300`;
        //
        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                for (let i = 0; i < 4; i++) {
                    forcastHeader[i].textContent = `${weekdayArray[i]}`
                    forcastTemperature.push = data.daily[i].temp.day;
                    forcastPrecipitation.push = data.daily[i].rain
                }
            })
    })
};

function getDay() {
    todayValue = new Date().getDay();
    return todayValue;
}
getDay();
let forcastTemperature = [];
let forcastPrecipitation = [];
let weekdays = [
    [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`],
    [`Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`],
    [`Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`],
    [`Wednesday`, `Thursday`, `Friday`, `Saturday`, `Sunday`],
    [`Thursday`, `Friday`, `Saturday`, `Sunday`, `Monday`],
    [`Friday`, `Saturday`, `Sunday`, `Monday`, `Tuesday`],
    [`Saturday`, `Sunday`, `Monday`, `Tuesday`, `Wednesday`]
];
let weekdayArray = [`${weekdays[todayValue][0]}`, `${weekdays[todayValue][1]}`, `${weekdays[todayValue][2]}`, `${weekdays[todayValue][3]}`, `${weekdays[todayValue][4]}`];