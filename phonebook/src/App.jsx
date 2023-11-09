import { useState, useEffect } from 'react'

import personService from './services/persons'


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


const Person = ({person, onDeleteClick}) => {
  return (
    <p>{person.name} - {person.number} <button onClick={() => onDeleteClick(person.id)}>delete</button></p>
  )
}


const Notification = ({ message, type }) => {
  const className = type
  if (message === null) {
    return null
  }

  return (
    <div className={className}>
      {message}
    </div>
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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [confirmationMessage, setConfirmationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
    })
  }, [])
  console.log('render', persons.length, 'persons')


  const addPerson = (event) => {
    event.preventDefault()

    if (persons.every(person => person.name !== newName)) {
      const personObject = {name: newName, number: newNumber}

      personService
      .create(personObject)
      .then(response => {
        setConfirmationMessage(`${response.data.name} was successfully added to the phonebook`)
        setTimeout(() => {
          setConfirmationMessage(null)
        }, 5000);
        setPersons(persons.concat(response.data))
        setFilter('')
        setNewName('')
        setNewNumber('')
      })

    } else {
      const person = persons.find(p => p.name === newName)
      if (window.confirm(`${newName} is already added to phonebook with ${person.number}! Would you like to update their number?`)) {
        updateNumber(person.id, newNumber)
      }
    }
  }


  const updateNumber = (id, number) => {
    const person = persons.find(p => p.id === id)
    const updatedPerson = {...person, number: number }

    personService
    .update(id, updatedPerson)
    .then(response => {
      setPersons(persons.map(p => p.id !== id ? p : response.data))
      setConfirmationMessage(`${response.data.name}'s number was successfully updated to ${response.data.number}`)
        setTimeout(() => {
          setConfirmationMessage(null)
        }, 5000);
    })
    .catch(error => {
      console.log(error)
      setErrorMessage(`The information of ${person.name} is no longer in the phonebook`);
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      personService.getAll().then(response => setPersons(response.data))
    })
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

  const onDeleteClick = (id) => {
    const person = persons.find(p => p.id === id)

    if (person && window.confirm(`Do you really want to delete ${person.name}?`)) {
      personService
      .deletePerson(id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== id))
        console.log(response)
      })

    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={confirmationMessage} type={'confirmation'} />
      <Notification message={errorMessage} type={'error'} />
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Add new person</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <div>
        {persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase())).map((person) => {
          return(<Person key={person.id} person={person} onDeleteClick={onDeleteClick}/>)
        })}
      </div>
    </div>
  )
}

export default App
