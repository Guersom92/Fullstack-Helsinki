import React from "react";

function PersonForm({
  handleSubmit,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{" "}
        <input
          required
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <div>
        number:{" "}
        <input
          required
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default PersonForm;
