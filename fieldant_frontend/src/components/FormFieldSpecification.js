// components/FormFieldSpecification.js

import React, { useState } from 'react';

const FormFieldSpecification = ({ formId, onFieldSpecified }) => {
  const [newField, setNewField] = useState({ label: '', field_type: 'text' });

  const addField = () => {
    // Ensure that both label and field_type are provided
    if (newField.label && newField.field_type) {
      onFieldSpecified(newField);
      // Optionally clear the input fields after adding a field
      setNewField({ label: '', field_type: 'text' });
    }
  };

  return (
    <div>
      <h3>Add Field to Form</h3>
      <label>Label:</label>
      <input
        type="text"
        value={newField.label}
        onChange={(e) => setNewField({ ...newField, label: e.target.value })}
      />
      <label>Data Type:</label>
      <select
        value={newField.field_type}
        onChange={(e) => setNewField({ ...newField, field_type: e.target.value })}
      >
        <option value="text">Text</option>
        <option value="number">Number</option>
        {/* Add other data types as needed */}
      </select>
      <button type="button" onClick={addField}>
        Add Field
      </button>
    </div>
  );
};

export default FormFieldSpecification;
