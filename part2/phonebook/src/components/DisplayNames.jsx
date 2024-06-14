const DisplayNames = ({ persons }) => {
    return (
        <ul>
            {persons.map(person => <li key={person.number}>{person.name} - {person.number}</li>)}
        </ul>
    )
}

export default DisplayNames