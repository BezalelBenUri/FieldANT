"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';

const FormFill = () => {
  const router = useRouter();
  const params = useParams();
  const { link } = params;
  const [formData, setFormData] = useState(null);
  const [formResponses, setFormResponses] = useState({});

  useEffect(() => {
    if (link) {
      // Fetch form data based on the link from the Django backend
      axios.get(`http://localhost:8000/api/forms/link/${link}/`)
        .then(response => {
          setFormData(response.data);
        })
        .catch(error => {
          console.error('Error fetching form data:', error);
        });
    }
  }, [link]);

  const handleFieldChange = (fieldName, value) => {
    setFormResponses(prevResponses => ({
      ...prevResponses,
      [fieldName]: value,
    }));
  };

  const handleFormSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/forms/submit/${link}/`,
        {
          name: formData.name,
          fields: formData.fields.map((field) => ({
            name: field.name,
            data_type: field.data_type,
            value: formResponses[field.name] || '',
          })),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      // Redirect to a thank you page or any other desired location
      router.push('/dashboard/formpage/thankYou/');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (!formData) {
    // Handle the case when form data is not yet fetched
    return <div>Loading...</div>;
  }

  return (
    <div className = "container mx-auto my-8 bg flex flex-col justify-between font-sans text-gray-800">
      <h1 className = "text-3xl font-bold mb-4 text-indigo-700">Fill out the Form</h1>
      <form>
        {formData.fields.map((field, index) => (
          <div key = {index} className = "mb-4">
            <label htmlFor = {`field-${index}`} className = " text-stone-50">
              {field.name}
            </label>
            <input
              type = {field.data_type === 'BOOLEAN' ? 'checkbox' : 'text'}
              id = {`field-${index}`}
              name = {`field-${index}`}
              value = {formResponses[field.name] || ''}
              onChange = {(e) => handleFieldChange(field.name, e.target.value)}
              className = "w-full px-4 py-2 border rounded-md mb-2"
              required = {field.data_type !== 'BOOLEAN'}
            />
          </div>
        ))}

        <button
          type = "button"
          onClick = {handleFormSubmit}
          className = "bg-blue-500 text-white py-2 px-4 rounded hover:bg-yellow-500"
        >
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default FormFill;
