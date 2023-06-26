const express = require('express')
const app = express()
app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => {
    res.send('<h1>phonebook</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const date = new Date();
    res.send(`<h4>The phonebook has info for ${persons.length} people</h4><h5>${date}</h5>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    if (!person){
        res.status(404).end()
    }else res.json(person)
})

app.post('/api/persons/', (req, res) => {
    const body = req.body
    const repeatedName = persons.find(p => p.name === body.name)
    const new_entry = {
        id : Math.floor(Math.random() * (100000 - 10) + 10),
        name : body.name || 'unknown',
        number : body.number || ''
    }
    if(!body.name){
        return res.status(400).json({ 
            error: 'name missing' 
        })
    }else if(!body.number){
        return res.status(400).json({ 
            error: 'number missing' 
        })
    }else if(repeatedName){
        return res.status(400).json({ 
            error: 'name must be unique' 
        })
    }else {
        persons = persons.concat(new_entry)
        res.json(new_entry) 
    }
    
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);
    res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})