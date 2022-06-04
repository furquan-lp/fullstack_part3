const express = require('express');
const app = express();

app.use(express.json());

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
];

const generateId = () => {
  let currentId = Math.floor(Math.random() * 99);
  while (persons.find(p => p.id === currentId))
    currentId = Math.floor(Math.random() * 99);
  return currentId;
}

app.get('/info', (request, response) => {
  const info = `Phonebook has info for ${persons.length} people
    <p>${new Date()}</p>`;
  response.send(info);
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(p => p.id === id);
  if (person)
    response.json(person);
  else
    response.status(404).send(
      `Resource ${Object.keys({ person })[0]} with id ${id} couldn't be found`
    );
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(p => p.id !== id);
  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  if (!request.body) {
    return response.status(400).json({
      error: 'body missing or sent incorrectly'
    });
  }
  const person = {
    name: request.body.name,
    number: request.body.number,
    id: generateId(),
  };
  persons = persons.concat(person);
  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});