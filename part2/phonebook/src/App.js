import { useState, useEffect } from 'react'
import PhonebookList from './components/PhonebookList';
import Input from './components/Input';
import PersonsForm from './components/PersonsForm';
import axios from 'axios';
import PersonsService from './services/PersonsService';

const App = () => {
  const baseUrl = 'http://localhost:3001/persons';
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
    if (repeatingName.length === 0) {
      const newObj = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      PersonsService
        .create(newObj)
        .then(newData => {
          setPersons(persons.concat(newData));
          setFilteredList(persons.concat(newData));
          setNewName('');
          setNewNumber('');
        })
    }
    else {
      alert(`${newName} is already added to phonebook`);
      setNewName('')
      setNewNumber('')
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
      <PhonebookList list={filteredList}/>
    </div>
  )
}

export default App