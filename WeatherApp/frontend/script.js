document.getElementById("searchButton").addEventListener("click", function() {
    const city = document.getElementById("cityInput").value;
    if (city) {
        fetchWeather(city);
    }
});

function fetchWeather(city) {
    const apiKey = "bfa5bea0c2b5473f5c11514a3782068c"; // Vaihda oma OpenWeather API-avaimesi tähän
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fi&appid=${apiKey}`;


    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Säätiedot:", data);
            document.getElementById("cityName").innerText = data.name;
            document.getElementById("temperature").innerText = `Lämpötila: ${data.main.temp}°C`;
            document.getElementById("weatherDescription").innerText = data.weather[0].description;
            document.getElementById("windSpeed").innerText = `Tuulen nopeus: ${data.wind.speed} m/s`;
        })
        .catch(error => {
            console.error("Virhe haettaessa säätietoja:", error);
        });
}