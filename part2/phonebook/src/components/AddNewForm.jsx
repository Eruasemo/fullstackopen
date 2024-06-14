import Input from "./Input"

const AddNewForm = ({ addPerson, handleNameChange, handleNumberChange, newName }) => {
    return (
        <form onSubmit={addPerson}>
            <Input name='Name' type='text' value={newName.name} handler={handleNameChange} required={true} />
            <Input name='Number' type='number' value={newName.number} handler={handleNumberChange} required={true} />
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default AddNewForm