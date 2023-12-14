import React, { useState } from 'react';
import Field from './Field';
import axios from 'axios';

const FormCreation = () => {
  const [name, setName] = useState('');
  const [fields, setFields] = useState([]);

  const handleAddField = () => {
    setFields([...fields, { name: '', type: 'text' }]);
  };

  const handleFieldChange = (fieldData) => {
    const updatedFields = fields.map((field) => {
      if (field.name === fieldData.name) {
        return { ...field, ...fieldData };
      }
      return field;
    });
    setFields(updatedFields);
  };

  const handleRemoveField = (fieldToRemove) => {
    setFields(fields.filter((field) => field !== fieldToRemove));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/forms/', {
        name,
        fields: fields.map((field) => ({
          name: field.name,
          data_type: field.type === 'text' ? 'CHAR' : 'INTEGER',
        })),
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-4 bg-gray-100 rounded shadow-md">
      <h1 className="text-xl font-bold mb-4">Create Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mr-4 text-gray-700">Form Name:</label>
          <input
            className="border rounded p-2 w-full"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        {fields.map((field, index) => (
          <Field
            key={index}
            name={field.name}
            type={field.type}
            onChange={(fieldData) => handleFieldChange(fieldData, index)}
            onRemove={() => handleRemoveField(index)}
          />
        ))}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          onClick={handleAddField}
        >
          Add Field
        </button>
        <button type="submit" className="ml-4 bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-700">
          Create Form
        </button>
      </form>
    </div>
  );
};

export default FormCreation;
