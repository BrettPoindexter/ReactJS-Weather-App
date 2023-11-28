import { useState } from 'react';
import './App.css';

//apiKey= cb2da307cd614326ae0230219230111
//apiURL= https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no

function App() {  

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const apiKey = 'cb2da307cd614326ae0230219230111';
  const apiURL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`

  const fetchData = async () => {
    try {
      const response = await fetch(apiURL);
      const data = await response.json();

      console.log(data);
      setWeather(data);
    } catch (error) {
      console.log('Error fetching data from API', error);
    }
  }

  const handleSearch = () => {
    if (city !== '') {
      fetchData();
    }
  }

  document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById('search').click();
    }
  })

  return (
    <div className="App">
      <div className='search-container'>
        <input id='searchField' type='text' placeholder='Enter City and State' value={city} onChange={((e) => setCity(e.target.value))} />
        <button id='search' onClick={handleSearch}>Search</button>
      </div>
      <div className='weather-container'>
        {weather && (
          <>
            <h1 className='location'>{weather.location.name}, {weather.location.region}</h1>
            <img className='condition-icon' src={weather.current.condition.icon} alt='icon representing current weather condition' />
            <h2 className='condition'>{weather.current.condition.text}</h2>
            <div className='data-container'>
              <p className='data'><span id='head'>Temp: </span>{weather.current.temp_f}<sup>°F</sup> (Feels Like: {weather.current.feelslike_f}<sup>°F</sup>)</p>
              <p className='data'><span id='head'>Humidity: </span>{weather.current.humidity}<sup>%</sup></p>
              <p className='data'><span id='head'>Wind: </span>{weather.current.wind_mph}<sup>mph</sup> @ {weather.current.wind_dir}</p>
              <p className='data'><span id='head'>Cloud Cover: </span>{weather.current.cloud}<sup>%</sup></p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
