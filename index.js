const express = require("express");

const app = express();

let persons = [
  {
    name: "Arto Hellas ",
    number: " 39-34-33343334",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
];

app.get("/info", (req, res, next) => {
  const date = new Date();
  res.send(`<p>phonebook has info for ${persons.length} persons </p>  ${date}`);
});

app.get("/api/persons", (req, res, next) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).send(`No person found with id ${id}`);
  }
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);

  res.status(204).end();
});

const PORT = 3000;

app.listen(PORT, () => console.log(`listening to the port ${PORT}`));
