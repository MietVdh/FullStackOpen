import { useState } from 'react'


const Filter = ({filter, handleFilterChange}) => {
  return (
  <div>
    filter shown with <input value={filter} onChange={handleFilterChange} />
  </div>
  )
}


const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}


const Person = ({person}) => {
  return (
    <p>{person.name} - {person.number}</p>
  )
}


// const Persons = ({personsShown}) => {
//   return (
//     <div>
//       {personsShown.map((person) => {
//         return <p key={person.id}>{person.name} - {person.number}</p>
//       })}
//     </div>
//   )
// }

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    if (persons.every(person => person.name !== newName)) {
      const newPerson = {name: newName, number: newNumber, id: persons.length + 1}
      setPersons(persons.concat(newPerson))
      setFilter('')
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook!`)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  const handleFilterChange = (event) => {
    const newFilter = event.target.value
    setFilter(newFilter)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Add new person</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <div>
        {persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase())).map((person) => {
          return(<Person key={person.id} person={person}/>)
        })}
      </div>
    </div>
  )
}

export default App
