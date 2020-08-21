window.addEventListener(`load`, () => {
    let long;
    let lat;
    let temperatrureSection = document.querySelector(`.degreesection`)
    let temperatureDescription = document.querySelector(`.temperature-description`);
    let temperatureDegree = document.querySelector(`.temperature-degree`);
    let locationTimezone = document.querySelector(`.timezone`);
    let temperatrureUnit = document.querySelector(`.temperature-unit`);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            //const proxy = `https://cors-anywhere.herokuapp.com/`;
            let api = `/*${proxy}*/api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&appid=c6e1c6a1b1d5c50aa30efa50ff543300`;
            //
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    const apiTemperature = data.current.temp;
                    const { main } = data.current.weather[0];
                    const apiTimezone = data.timezone;
                    temperatureDegree.textContent = apiTemperature;
                    temperatureDescription.textContent = main.toUpperCase();
                    locationTimezone.textContent = apiTimezone;
                    setIcons(main, document.querySelector(`.icon-display`));
                    temperatrureSection.addEventListener(`click`, () => {
                        if (temperatrureUnit.textContent === "C") {
                            api = `${proxy}api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&appid=c6e1c6a1b1d5c50aa30efa50ff543300`;
                            fetch(api)
                                .then(response => {
                                    return response.json();
                                })
                                .then(newdata => {
                                    let tempdata = newdata.current.temp;
                                    temperatureDegree.textContent = tempdata;
                                    temperatrureUnit.textContent = "F";
                                })
                        } else {
                            api = `${proxy}api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=c6e1c6a1b1d5c50aa30efa50ff543300`;
                            fetch(api)
                                .then(response => {
                                    return response.json();
                                })
                                .then(newdata => {
                                    let tempdata = newdata.current.temp;
                                    temperatureDegree.textContent = tempdata;
                                    temperatrureUnit.textContent = "C";
                                })
                        }
                    })
                })
        })

        function setIcons(main, iconID) {
            let skycons = new Skycons({ "color": "#22ff55" });
            const currentIcon = `"` + main.toUpperCase + `"`;
            skycons.play();
            return skycons.set(iconID, skycons[currentIcon]);
        }
    }
});
