import React from "react";
import Person from "./Person";

function Persons({ filteredPersons, deletePerson }) {
  return filteredPersons.map((person) => {
    return (
      <Person
        key={person.id}
        name={person.name}
        number={person.number}
        deletePerson={() => deletePerson(person.id)}
      />
    );
  });
}

export default Persons;
