import React from "react";
import { InputGroup, Form } from "react-bootstrap"

const SearchBox = ({ value, onChange, placeholder = "Search..." }) => (
  <InputGroup className="mb-3">
    <InputGroup.Text id="search">🔎</InputGroup.Text>
    <Form.Control
      placeholder={placeholder}
      aria-label="search"
      aria-describedby="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </InputGroup>
);

export default SearchBox
