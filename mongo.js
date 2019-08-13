const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0-xhohp.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log("phonebook:");
    result.forEach(person => console.log(`${person.name} ${person.number}`));
    mongoose.connection.close();
  });
}
if (process.argv.length > 3) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  });

  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number}`);
    mongoose.connection.close();
  });
}
