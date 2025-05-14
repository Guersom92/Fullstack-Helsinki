import React from "react";

function Filter({ onChange, value }) {
  return <input value={value} onChange={onChange} />;
}

export default Filter;
