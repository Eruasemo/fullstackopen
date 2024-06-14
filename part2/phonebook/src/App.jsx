import { useState } from 'react'
import './App.css'

const DisplayNames = ({ persons }) => persons.map(person => <li key={person.number}>{person.name} - {person.number}</li>)
const Input = ({name,value,handler,type}) =><div>{name}: <input type={type} name={name} value={value} onChange={handler} required /></div>


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: 123456789 }
  ])
  const [newName, setNewName] = useState({name:'',number:''})


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = newName
    //I decided that I should be able to register two numbers for the same person, but I can't register the same number with different names.
    if (persons.some(person => JSON.stringify(person.number) === JSON.stringify(personObject.number))) {
      alert(`${personObject.number} is already on the phonebook.`)
    } else {
      setPersons(persons.concat(personObject));
      setNewName({name:'',number:''})    
    }
  }

  const handleNameChange = (event) => {
    setNewName({...newName,name:event.target.value})
  }

  const handleNumberChange = (event) =>{
    setNewName({...newName,number:event.target.value})    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>        
        <Input name = 'Name' type='text' value = {newName.name} handler={handleNameChange} />
        <Input name='Number' type='number' value = {newName.number} handler={handleNumberChange} />
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