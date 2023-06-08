import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

const WeatherData = ({info}) => {
  const [weather, setWeather] = useState([]);
  const api_key = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${info.latlng[0]}&lon=${info.latlng[1]}&appid=${api_key}`)
    .then((res) => setWeather(res.data))
  }, [])
  return (
    <>
      <h3>Weather in {info.capital}</h3>
      <p>Temperature {Math.round((weather.main.temp - 272.15) * 100)/100}°C</p>
      <p>Wind {weather.wind.speed} m/s</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon"/>
    </>
  )
}
const SingularCountry = ({ info }) => {
  const picStyle = {
    width: 200
  }
  return (
    <>
      <h3>{info.name.common}</h3>
      <p>Capital: {info.capital}</p>
      <p>Area: {info.area}</p>
      <p>Languages:</p>
      <ul>
        {Object.values(info.languages).map((lang) => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={info.flags.png} alt="flag" style={picStyle}/>
      <WeatherData info={info} />
    </>
  );
}

const App = () => {
  const [country, setCountry] = useState(null)
  const [showList, setShowList] = useState([])
  const [countryToShow, setCountryToShow] = useState([])

  useEffect(() => {
    if (country) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then((res) => {
          const data = res.data;
          const resultList = data.filter(data => (data.name.common).toLowerCase().includes(country.toLowerCase()));
          setShowList(resultList)
        })
        .catch(error => console.log(error))
    }
  }, [showList, country])

  const inputChange = (event) => {
    event.preventDefault();
    setCountry(event.target.value)
    setCountryToShow([])
  }
  return (
    <div>
        find countries: <input type="text" onChange={inputChange}/>
         
          {countryToShow.length !== 0 ? 
          (<SingularCountry info={countryToShow}/>) 
          : 
          (showList.length === 1 ? 
            (<><SingularCountry info={showList[0]}/></>)
            : 
          (showList.length > 10 ? 
            (<p>Too many results</p>) 
            : 
            (showList.map((country) => 
            <>
              <p>{country.name.common}</p>
              <button onClick={() => setCountryToShow(country)}>show</button> 
            </>))
          ))
          }
    </div>
  );
};

export default App;