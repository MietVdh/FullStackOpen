import { useState, useEffect } from 'react'

import axios from 'axios'


const Country = ({country, weather}) => {

  const capital = country.capital[0]
  const area = country.area
  const languages = Object.values(country.languages) // object!
  const flag = country.flags.png
  const flagAlt = country.flags.alt

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {capital}</p>
      <p> Area: {area}</p>
      <h3>Languages:</h3>
      <ul>
        {languages.map((l) => {
          return (<li key={l}>{l}</li>)
        })
      }
      </ul>
      <img src={flag} alt={flagAlt}></img>
      {weather ? (
        <div>
        <h3>Weather in {capital}</h3>
        <p>Temperature: {weather.current.temp_c} Celsius</p>
        <img src={weather.current.condition.icon}></img>
        <p>Wind {weather.current.wind_kph} km/hr</p>
        </div>
      ) : <></> }



    </div>
  )
}

function App() {

  const countriesUrl = `https://studies.cs.helsinki.fi/restcountries/api`
  // const weatherUrl = `https://weatherapi-com.p.rapidapi.com/current.json`
  const [countries, setCountries] = useState([])
  const [shownCountries, setShownCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios.get(`${countriesUrl}/all`)
    .then(response => {
      setCountries(response.data.map(c => c.name.common))
      console.log(response.data)
    })
  }, [countriesUrl])

  useEffect(() => {
    if (shownCountries.length === 1) {
      const selectedCountry = shownCountries[0]
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${selectedCountry}`)
      .then(response => {
        setCountry(response.data)
        console.log(response.data)
        // const options = {
        //   method: 'GET',
        //   url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        //   params: {q: response.data.capital[0]},
        //   headers: {
        //     'X-RapidAPI-Key': import.meta.env.VITE_RAPID_KEY,
        //     'X-RapidAPI-Host': import.meta.env.VITE_RAPID_HOST
        //   }
        // };

        // return axios.request(options)
        // .then(response => {
        //   console.log(response.data);
        //   setWeather(response.data);
        // })
        // .catch(error => console.log(error))
      })

    } else {
      setCountry(null)
      setWeather(null)
    }
  }, [shownCountries])


  useEffect(() => {
    if (!country) {
      return
    }

    const capital = country.capital[0]
    console.log(`Capital: ${capital}`)
    const options = {
      method: 'GET',
      url: `https://weatherapi-com.p.rapidapi.com/current.json?q=${capital}`,
      // params: {q: capital},
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_RAPID_HOST
      }
    };


    axios.request(options)
    .then(response => {
      console.log(response.data);
      setWeather(response.data);
    })

  }, [country])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setShownCountries(countries.filter(c => c.toLowerCase().includes(filter.toLowerCase())));
  }

  const handleShowClick = (name) => {
    setFilter(name)
    setShownCountries([countries.find(c => c.toLowerCase() === name.toLowerCase())]);
  }



  return (
    <>
      <p>Find countries: <input value={filter} onChange={handleFilterChange}/></p>

      {
        country ?
          <Country country={country} weather={weather}/> :
         <>
         { shownCountries.length < 10 ?
            (<ul>
              {shownCountries.sort().map((c) => {
              return (<li key={c}> {c} <button onClick={() => {handleShowClick(c)}}>Show</button></li> )})}
            </ul>)
            : <p>Too many matches, specify another filter</p>
        }
        </>
      }




    </>
  )
}

export default App
