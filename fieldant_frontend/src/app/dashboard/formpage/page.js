'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const CreateForm = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    description: '',
    fields: [],
  });

  const addField = () => {
    setForm((prevForm) => ({
      ...prevForm,
      fields: [
        ...prevForm.fields,
        {
          name: '',
          data_type: 'CHAR',
        },
      ],
    }));
  };

  const removeField = (index) => {
    setForm((prevForm) => {
      const newFields = [...prevForm.fields];
      newFields.splice(index, 1);
      return { ...prevForm, fields: newFields };
    });
  };

  const handleFieldChange = (index, field) => {
    setForm((prevForm) => {
      const newFields = [...prevForm.fields];
      newFields[index] = { ...newFields[index], ...field };
      return { ...prevForm, fields: newFields };
    });
  };

  const handleFormSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/forms/', form, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Form created successfully:', response.data);

      router.push('/dashboard')
    } catch (error) {
      console.error('Error creating form:', error);
    }
  };

  return (
    <div className = "container min-w-full  min-h-screen flex-grow justify-between bg-white font-sans text-black">
      <main className = "flex flex-col items-center">
      <h1 className = "text-3xl fontbold mb-4">Create your form</h1>
      <form>
        <div className = "mb-4"> 
          <label htmlFor = "name" className = "block text-gray-700">
            Name of Form
          </label>
          <br />
          <input
            type = "text"
            id = "name"
            name = "name"
            value = {form.name}
            onChange = {(e) => setForm({ ...form, name: e.target.value })}
            className = "w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        <div className = "mb-4">
          <label htmlFor = "description" className = "block text-gray-700">
            Description
          </label>
          <textarea
            id = "description"
            name = "description"
            value = {form.description}
            onChange = {(e) => setForm({ ...form, description: e.target.value })}
            className = "w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        {form.fields.map((field, index) => (
          <div key = {index} className = "mb-4">
            <label htmlFor = {`field-${index}`} className = "block text-gray-700">
              Field {index + 1}
            </label>
            <input
              type = "text"
              id = {`field-${index}`}
              name = {`field-${index}`}
              placeholder = "Field Name"
              value = {field.name}
              onChange = {(e) => handleFieldChange(index, { name: e.target.value })}
              className = "w-full px-4 py-2 border rounded-md mb-2"
              required
            />
            <select
              id = {`type-${index}`}
              name = {`type-${index}`}
              value = {field.data_type}
              onChange = {(e) => handleFieldChange(index, { data_type: e.target.value })}
              className = "w-full px-4 py-2 border rounded-md"
            >
              <option value = "CHAR">Text</option>
              <option value = "INTEGER">Number</option>
              <option value = "FLOAT">Float</option>
              <option value = "BOOLEAN">Checkbox</option>
            </select>
            <button
              type = "button"
              onClick = {() => removeField(index)}
              className = "bg-red-500 text-white py-2 px-1 rounded ml-2"
            >
              Remove Field
            </button>
          </div>
        ))}

        <button
          type = "button"
          onClick = {addField}
          className = "bg-blue-500 text-white py-2 px-4 rounded hover:bg-yellow-500"
        >
          Add Field
        </button>

        <button
          type = "button"
          onClick = {handleFormSubmit}
          className = "bg-green-500 text-white py-2 px-4 rounded mt-4 hover:bg-yellow-500"
        >
          Create Form
        </button>
      </form>
      </main>
      
    </div>
  );
};

export default CreateForm;
