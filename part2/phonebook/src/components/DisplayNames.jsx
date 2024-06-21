const DisplayNames = ({ persons, removePerson }) => {
    return (
        <ul>
            {persons.map(person =>
                <li key={person.id}>
                    {person.name} - {person.number}  
                    <button onClick={() => removePerson(person)}>Delete</button>
                </li>
            )}
        </ul>
    )
}

export default DisplayNames