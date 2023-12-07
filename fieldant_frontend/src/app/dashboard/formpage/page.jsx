// pages/dashboard/formpage.js
"use client"
import React, { useState } from 'react';
import FormList from '@/components/FormList';
import FormFieldSpecification from '@/components/FormFieldSpecification';

const FormPage = () => {
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [formFields, setFormFields] = useState([]);

  const handleFormSelected = (formId) => {
    setSelectedFormId(formId);
    setFormFields([]); // Clear existing form fields when a new form is selected
  };

  const handleFieldSpecified = (newField) => {
    setFormFields((prevFields) => [...prevFields, newField]);
  };

  return (
    <div>
      <h1>Form Page</h1>
      <FormList onFormSelected={handleFormSelected} />
      {selectedFormId && (
        <>
          <FormFieldSpecification
            formId={selectedFormId}
            onFieldSpecified={handleFieldSpecified}
          />
          <div>
            <h2>Form Fields</h2>
            <ul>
              {formFields.map((field, index) => (
                <li key={index}>{field.label} - {field.field_type}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default FormPage;
