const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

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

app.use(bodyParser.json());

app.use(cors());

morgan.token("type", function(req, res) {
  return ` ${JSON.stringify(req.body)} `;
});

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

app.use(morgan("tiny"));
app.use(morgan("Type: :type"));

app.post("/api/persons", (req, res, next) => {
  const person = req.body;
  const id = Math.floor(Math.random() * 100 + 1);
  const duplicatePerson = persons.find(p => p.name === person.name);

  person.id = id;

  if (!person.name || !person.number) {
    return res.status(400).json({
      error: "name or number missing"
    });
  }

  if (duplicatePerson) {
    return res.status(400).json({ error: "name must be unique" });
  }

  persons = persons.concat(person);

  res.json(person);
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);

  res.status(204).end();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`listening to the port ${PORT}`));
