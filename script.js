const apiKey = "1e8cec04691626e97e7212033e86aadc";
let search_input = document.getElementById("search-input");
let details = document.getElementById("details");
let coord = document.getElementById("coord");
let temp_info = document.getElementById("temp-info");

document.getElementById("location-form").addEventListener("submit", getWeather);


function convert(value) {
  return Math.round(value - 273.15);
}



// Function to fetch weather data
async function getWeather(e) {
  try {
    e.preventDefault();
    const city = search_input.value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();

    console.log(data);
    let date =  new Date(data.dt * 1000).toLocaleString();
    

    coord.innerHTML = `
    <h3>${data.name} , ${data.sys.country}</h3>
    <small>${date}</small>

    <div class="mt-3">
    <div class="d-flex justify-content-between">
    <p>Longitude</p>
    <p>34</p>
    </div>
    <hr>
    <div class="d-flex justify-content-between">
    <p>Latitude</p>
    <p>45</p>
    </div>
    <hr>

    <div class="d-flex justify-content-between">
    <p>Sunrise</p> 
    <p> ${data.sys.sunrise}</p>
    </div>
    <hr>
    <div class="d-flex justify-content-between">
    <p>Sunset</p> 
    <p> ${data.sys.sunset} </p>
    </div>
    </div>
    `;


    let celcius = convert(data.main.temp)
    let feel = convert(data.main.feels_like)
    temp_info.innerHTML = `
      <h1 class="text-center fs-1">${celcius} <sup>o</sup> C</h1>
      <p class=""><b>feels like ${feel} . ${data.weather[0].main}</b></p>
      <p>Humidity: <b>${data.main.humidity} </b></p>
      <p>Visibility: <b>${data.visibility} </b> m </p>


      <div class="mt-3 ">
        <h3>Wind</h3>
        <p>Speed: <b> ${data.wind.speed}</b> m/s</p>
        <p>Direction: <b> ${data.wind.deg} </b> degrees</p>
      </div>
    `;

    search_input.value = "";
    
  } catch (error) {
    console.error("Error fetching weather data:", error);
    details.innerHTML = `<h3>Error: City Not Found</h3>`;
  }
}

// Error should be very specific
// Error: Failed to fetch weather data,   should always fetch this error in case of any failure otherwise you test cases will get failed.
