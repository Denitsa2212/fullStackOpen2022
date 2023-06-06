import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

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
        {Object.values(info.languages).map((lang, ind) => <li key={ind}>{lang}</li>)}
      </ul>
      <img src={info.flags.png} alt="flag" style={picStyle}/>
    </>
  );
}

const App = () => {
  const [country, setCountry] = useState(null)
  const [showList, setShowList] = useState([])
  useEffect(() => {
    console.log("in effect");
    if (country) {
      // console.log("get countries");
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then((res) => {
          const data = res.data;
          const resultList = data.filter(data => (data.name.common).toLowerCase().includes(country.toLowerCase()));
          // setShowList(resultList.map(result => result.name.common))
          setShowList(resultList)
        })
        .catch(error => console.log(error))
    }
  }, [showList, country])

  const inputChange = (event) => {
    event.preventDefault();
    setCountry(event.target.value)
  }
  
  return (
    <div>
        find countries: <input type="text" onChange={inputChange}/>
         
        {showList.length === 1 ? <SingularCountry info={showList[0]}/> 
          : 
        (showList.length > 10 ? (<p>Too many results</p>) : (showList.map((country, ind) => <p key={ind}>{country.name.common}</p>)))}
    </div>
  );
};

export default App;