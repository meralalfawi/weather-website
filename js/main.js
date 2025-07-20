const apiKey = "7f4e77b3763e4781b2b102221252106";
const forecastContainer = document.getElementById("forecastContainer");
const input = document.getElementById("locationInput");

input.addEventListener("input", () => {
    const city = input.value.trim();
    if (city.length > 0) {
        getForecast(city);
    }
    else{
        getForecast()
    }
});

async function getForecast(city = 'london') {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`
        );
        const data = await response.json();
        displayForecast(data.forecast.forecastday, data.location.name);
    } catch (error) {
        forecastContainer.innerHTML = `<div class="text-danger text-center">⚠️ ${error.message}</div>`;
    }
}

function displayForecast(days, cityName) {
    forecastContainer.innerHTML = "";
    days.forEach((day) => {
        const date = new Date(day.date);
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
        const card = `
    <div class="col-md-4">
        <div class="card p-4 text-center">
        <h5>${dayName}</h5>
        <p>${cityName}</p>
        <div class="temp">${day.day.avgtemp_c}°C</div>
        <p class=" text-white">${day.day.mintemp_c}°C - ${day.day.maxtemp_c}°C</p>
        <p class="text-info">${day.day.condition.text}</p>
        </div>
    </div>
    `;
        forecastContainer.innerHTML += card;
    });
}
getForecast()
