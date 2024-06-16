import { useEffect, useState } from 'react'
import './App.css'
import DisplayNames from './components/DisplayNames'
import Input from './components/Input'
import AddNewForm from './components/AddNewForm'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState({ name: '', number: '' })
  const [filter, setFilter] = useState('')

  useEffect(()=>{
    axios.get('http://localhost:3001/persons')
    .then(response=>{
      setPersons(response.data)
    })
  },[])

  const personsToShow = filter == '' ? persons : persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = newName
    //I decided that I should be able to register two numbers for the same person, but I can't register the same number with different names.
    if (persons.some(person => JSON.stringify(person.number) === JSON.stringify(personObject.number))) {
      alert(`${personObject.number} is already on the phonebook.`)
    } else {
      setPersons(persons.concat(personObject));
      setNewName({ name: '', number: '' })
    }
  }

  const handleNameChange = (event) => {
    setNewName({ ...newName, name: event.target.value })
  }

  const handleNumberChange = (event) => {
    setNewName({ ...newName, number: event.target.value })
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Input name='Search' type='text' value={filter} handler={handleFilterChange} required={false} />
      <h3>Add a new:</h3>
      <AddNewForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} />
      <h3>Numbers</h3>
      <DisplayNames persons={personsToShow} />
    </div>
  )
}

export default App