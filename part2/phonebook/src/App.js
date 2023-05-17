import { useState, useEffect } from 'react'
import PhonebookList from './components/PhonebookList';
import Input from './components/Input';
import PersonsForm from './components/PersonsForm';
import axios from 'axios'

const App = () => {

  // States
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredList, setFilteredList] = useState(persons);

  // Effect
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        setFilteredList(response.data)
      })
  }, [])

  console.log('render', persons.length, 'people')
  console.log(persons);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const repeatingName = persons.filter(person => newName === person.name);
    if (repeatingName.length === 0) {
      const newObj = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(newObj));
      setFilteredList(filteredList.concat(newObj));
      setNewName('')
      setNewNumber('')
    }else {
      alert(`${newName} is already added to phonebook`);
      setNewName('')
      setNewNumber('')
    }
  }

  const handleFilter = (event) => {
    let filter = (event.target.value);
    if(filter != ''){
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