import React from 'react';

const Filter = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Search..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default Filter;
