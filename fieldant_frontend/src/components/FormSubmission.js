// components/FormSubmission.js

import React, { useState } from 'react';
import axios from 'axios';

const FormSubmission = ({ formId, formFields }) => {
  const [formData, setFormData] = useState({});

  const submitForm = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/forms/${formId}/submit/`, formData);
      console.log('Form submitted:', response.data);
      // Implement any necessary logic for real-time visualization
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h2>Form Submission</h2>
      {formFields.map((field) => (
        <div key={field.id}>
          <label>{field.label}:</label>
          <input
            type={field.field_type === 'number' ? 'number' : 'text'}
            value={formData[field.id] || ''}
            onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
          />
        </div>
      ))}
      <button type="button" onClick={submitForm}>
        Submit Form
      </button>
    </div>
  );
};

export default FormSubmission;
