import { useState } from 'react'
import './App.css'

const DisplayNames = ({ persons }) => persons.map(person => <li key={person.number}>{person.name} - {person.number}</li>)
const Input = ({ name, value, handler, type }) => <div>{name}: <input type={type} name={name} value={value} onChange={handler} required /></div>


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState({ name: '', number: '' })
  const [filter,setFilter]= useState('')

  const personsToShow = filter == '' ? persons : persons.filter(person=>person.name.toLocaleLowerCase().includes(filter.toLowerCase()) )

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

  const handleFilterChange= (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Input name='Search' type='text' value={filter} handler={handleFilterChange} />
      <h3>Add a new:</h3>
      <form onSubmit={addPerson}>
        <Input name='Name' type='text' value={newName.name} handler={handleNameChange} />
        <Input name='Number' type='number' value={newName.number} handler={handleNumberChange} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      <ul>
        <DisplayNames persons={personsToShow} />
      </ul>
    </div>
  )
}

export default App