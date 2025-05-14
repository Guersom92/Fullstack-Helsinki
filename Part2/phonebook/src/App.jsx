import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [style, setSyle] = useState("");

  useEffect(() => {
    personService.getAll().then((data) => setPersons(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one`
        )
      ) {
        const person = persons.find((person) => person.name === newName);
        const changedPerson = { ...person, number: newNumber };

        personService
          .update(person.id, changedPerson)
          .then((data) => {
            setPersons(
              persons.map((person) => (person.name === newName ? data : person))
            ),
              setSyle("success");
            setMessage(`Added ${newName}`);
            setTimeout(() => setMessage(null), 3000);
          })
          .catch(() => {
            setMessage(
              `Information of ${newName} has already been removed from server`
            );
            setTimeout(() => setMessage(null), 3000);
            setSyle("error");
            setPersons(persons.filter((p) => p.id !== person.id));
          });
        setNewName("");
        setNewNumber("");
      }
      return;
    }

    const newPerson = { name: newName, number: newNumber };
    personService
      .create(newPerson)
      .then((data) => setPersons(persons.concat(data)));

    setSyle("success");
    setMessage(`Added ${newName}`);
    setTimeout(() => setMessage(null), 3000);
    setNewName("");
    setNewNumber("");
  };

  const handleFilterChange = (e) => setFilter(e.target.value);

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(id)
        .then(() => setPersons(persons.filter((p) => p.id !== id)));
    }
  };

  const filteredPersons = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification style={style} message={message} />
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
