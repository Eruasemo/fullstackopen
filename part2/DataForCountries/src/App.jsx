import { useEffect, useState } from 'react'
import './App.css'
import countriesService from './services/countries'


function App() {
  const [countryList, setCountryList] = useState([])
  const [filter, setFilter] = useState('')
  const [error,setError]=useState('')
  const [singleCountry,setSingleCountry] = useState(null)

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
          console.log(countriesToShow[0])         
          countriesToShow.length===1?setSingleCountry(countriesToShow[0]):setSingleCountry(null)
        }
      })
  }, [filter])

  const filterHandler = (event) => setFilter(event.target.value)

  return (
    <>
      <label htmlFor='filter'>Find Countries:</label>
      <input type='text' name='filter' value={filter} onChange={filterHandler} />
      <p>{error}</p>
      <ul>{countryList.map(country => <li key={country.ccn3} >{country.name.common}</li>)}</ul>
      {singleCountry?(
        <div>
        <h3>{singleCountry.name.common}</h3>
        <p>Capital: {singleCountry.capital[0]}</p>
        <p>Area: {singleCountry.area.toLocaleString()} </p>
        <h4>Languages</h4>
        <ul>{Object.entries(singleCountry.languages).map(([key,value]) => <li key={key}>{value} </li> )}</ul>
        <img src={singleCountry.flags.png} />
        </div>
        ):''}
    </>
  )
}

export default App
