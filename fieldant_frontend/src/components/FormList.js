// components/FormList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormList = () => {
  const [forms, setForms] = useState([]);
  const [newForm, setNewForm] = useState({ title: '', description: '' });

  const fetchForms = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/forms/');
      setForms(response.data);
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };

  const createForm = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/forms/', newForm);
      console.log('New form created:', response.data);
      fetchForms(); // Refresh the list of forms after creating a new one
    } catch (error) {
      console.error('Error creating form:', error);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <div>
      <h2>Create Form</h2>
      <form>
        <label>Title:</label>
        <input
          type="text"
          value={newForm.title}
          onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
        />
        <label>Description:</label>
        <textarea
          value={newForm.description}
          onChange={(e) => setNewForm({ ...newForm, description: e.target.value })}
        />
        <button type="button" onClick={createForm}>
          Create Form
        </button>
      </form>

      <h2>Forms</h2>
      <ul>
        {forms.map((form) => (
          <li key={form.id}>{form.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default FormList;
