import { useState } from 'react'
import './App.css'

const DisplayNames = ({ persons }) => persons.map(person => <li key={person.name}>{person.name}</li>)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
    }
    if (persons.some(person => JSON.stringify(person) === JSON.stringify(personObject))) {
      alert(`${personObject.name} is already on the phonebook.`)
    } else {
      setPersons(persons.concat(personObject));
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input name='name' value={newName} onChange={handleNameChange} required />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        <DisplayNames persons={persons} />
      </ul>
    </div>
  )
}

export default App