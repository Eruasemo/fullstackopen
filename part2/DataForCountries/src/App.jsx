import { useEffect, useState } from 'react'
import './App.css'
import countriesService from './services/countries'
import weatherService from './services/weather'


function App() {
  const [countryList, setCountryList] = useState([])
  const [filter, setFilter] = useState('')
  const [error, setError] = useState('')
  const [singleCountry, setSingleCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countriesService.getAll()
      .then(initialCountries => {
        const countriesToShow = initialCountries.filter(country => country.name.common.toLocaleLowerCase().includes(filter.toLowerCase()))
        if (countriesToShow.length > 10) {
          setCountryList([])
          setError("Too many matches, specify another filter")
          setSingleCountry(null)
        } else {
          setCountryList(countriesToShow)
          setError('')
          countriesToShow.length === 1 ? setSingleCountry(countriesToShow[0]) : setSingleCountry(null)
        }
      })
  }, [filter])

  useEffect(() => {
    if (singleCountry) {
      weatherService.get(singleCountry).then(response => setWeather(response))      
    }else {
      setWeather(null)
    }
  }, [singleCountry])

  const showOneCountry = ({ country }) => {
    countriesService.getCountry(country.name.common)
      .then(country => {
        setSingleCountry(country)
        setCountryList([])
      })

  }

  const filterHandler = (event) => setFilter(event.target.value)

  return (
    <>
      <label htmlFor='filter'>Find Countries:</label>
      <input type='text' name='filter' value={filter} onChange={filterHandler} />
      <p>{error}</p>
      <ul>{countryList.map(country => <li key={country.ccn3} >{country.name.common} <button onClick={() => showOneCountry({ country })}>show</button></li>)}</ul>
      {singleCountry&&weather ? (
        <div>
          <h3>{singleCountry.name.common}</h3>
          <p>Capital: {singleCountry.capital}</p>
          <p>Area: {singleCountry.area.toLocaleString()} </p>

          <h4>Languages</h4>
          <ul>{Object.entries(singleCountry.languages).map(([key, value]) => <li key={key}>{value} </li>)}</ul>
          <img src={singleCountry.flags.png} alt={singleCountry.flags.alt} />
          <h4>Weather in {singleCountry.name.common}</h4>
            <p>Temperature: {weather.main.temp} Celsius </p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
            <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      ) : ''
      }
      {
        weather ? (
          <div>
           
          </div>
        ) : ''
      }
    </>
  )
}

export default App
