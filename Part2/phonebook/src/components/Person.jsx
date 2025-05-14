import React from "react";

function Person({ name, number, deletePerson }) {
  return (
    <>
      <p>{`${name} ${number}`} </p>
      <button onClick={deletePerson}>delete</button>
    </>
  );
}

export default Person;
