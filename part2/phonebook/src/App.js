import { useState, useEffect } from 'react'
import Phonebook from './components/PhoneBook';
import Input from './components/Input';
import PersonsForm from './components/PersonsForm';
import PersonsService from './services/PersonsService';

const App = () => {
  // States
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredList, setFilteredList] = useState(persons);

  //Return data from json server
  useEffect(() => {
  PersonsService
    .getAll()
    .then(returnedData => {
      setPersons(returnedData)
      setFilteredList(returnedData)
    })
  }, [])

  //Posting a new entry
  const handleSubmit = (event) => {
    event.preventDefault();
    const repeatingName = persons.filter(person => newName === person.name);
      const newObj = {
        name: newName,
        number: newNumber
      }
    if (repeatingName.length === 0) {
      PersonsService
        .create(newObj)
        .then(newData => {
          setPersons(persons.concat(newData));
          setFilteredList(persons.concat(newData));
          setNewName('');
          setNewNumber('');
        })
        .catch(err => {alert(err.message)})
    }
    else {
      if(window.confirm(`${newName} is already added to phonebook, replace their number with new one?`))
      {
        const person = persons.find(n => n.name === newName)
        console.log(person);
        const changedPerson = {...person, number: newNumber}

        PersonsService
          .update(person.id, changedPerson)
          .then(newData => {
            console.log(newData);
            setPersons(persons.filter(p => p.id !== person.id).concat(newData))
            setFilteredList(persons.filter(p => p.id !== person.id).concat(newData));
            setNewName('');
            setNewNumber('');
          })
          .catch(err => {alert(err.message)})
      }
    }
  }
  //delete an entry
  const handleDelete = (id, name) => {
    if(window.confirm(`Are you sure you want to delete ${name} from phonebook?`)){
        PersonsService
          .deletePerson(id)
          .then(() => {
            setPersons(persons.filter(n => n.id !== id))
            setFilteredList(persons.filter(n => n.id !== id))
          })
    }
  }
  //Handle inputs' change
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }
  

  const handleFilter = (event) => {
    let filter = (event.target.value);
    if(filter !== ''){
      setFilteredList(persons.filter(person => (person.name).toLowerCase().includes(filter.toLowerCase()))); 
    }else setFilteredList(persons)
    
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Input changeHandler={handleFilter} label="Filter by name: "/>
      <PersonsForm submitHandler={handleSubmit}>
          <Input value={newName} changeHandler={handleNameChange} label="name:"/>
          <Input value={newNumber} changeHandler={handleNumberChange} label="number:"/>
      </PersonsForm>
      <h2>Numbers</h2>
      {filteredList.map(person => 
                <>
                <Phonebook person={person} key={person.id} deleteFunc={() => handleDelete(person.id, person.name)}/>
                </>
            )}
    </div>
  )
}

export default App