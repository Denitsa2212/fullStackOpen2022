import { useState } from 'react'
import PhonebookList from './components/PhonebookList';
import Input from './components/Input';
import PersonsForm from './components/PersonsForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredList, setFilteredList] = useState(persons);

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