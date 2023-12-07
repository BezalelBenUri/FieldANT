// components/FormFieldList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FormFieldList = () => {
  const [formFields, setFormFields] = useState([]);

  useEffect(() => {
    const fetchFormFields = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/formfields/');
        setFormFields(response.data);
      } catch (error) {
        console.error('Error fetching form fields:', error);
      }
    };

    fetchFormFields();
  }, []);

  return (
    <div>
      <h2>Form Fields</h2>
      <ul>
        {formFields.map((field) => (
          <li key={field.id}>{field.label}</li>
        ))}
      </ul>
    </div>
  );
};

export default FormFieldList;
