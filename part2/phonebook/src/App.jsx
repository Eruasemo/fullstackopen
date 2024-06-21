import { useEffect, useState } from 'react'
import './App.css'
import DisplayNames from './components/DisplayNames'
import Input from './components/Input'
import AddNewForm from './components/AddNewForm'
import personsService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState({ name: '', number: '' })
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personsService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const personsToShow = filter == '' ? persons : persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = newName
    const personDup = persons.find(person => JSON.stringify(person.name) === JSON.stringify(personObject.name))
    //I decided that I should be able to register two numbers for the same person, but I can't register the same number with different names.
    if (persons.some(person => JSON.stringify(person.number) === JSON.stringify(personObject.number))) {
      alert(`${personObject.number} is already on the phonebook.`)
    } else if (personDup) {
      if (window.confirm(`${personObject.name} is already added to the phonebook, replace the old number with a new one? `)) {
        personsService.update(personDup.id, personObject)
          .then(numberChanged => setPersons(persons.map(person => person.id !== personDup.id ? person : numberChanged)))
      }
    } else {
      personsService.create(personObject).then(personsChanged => {
        setPersons(persons.concat(personsChanged));
      })
    }
    setNewName({ name: '', number: '' })
  }

  const removePerson = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name}`)) {
      personsService.remove(personToDelete.id)
        .then(deletedPerson => setPersons(persons.filter(person => person.id !== deletedPerson.id)))
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
      <DisplayNames persons={personsToShow} removePerson={removePerson} />
    </div>
  )
}

export default App