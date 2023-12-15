import { useState, useEffect } from 'react';
import axios from 'axios';

const FillForm = ({ link }) => {
  const [formData, setFormData] = useState({});
  const [formFields, setFormFields] = useState([]);

  useEffect(() => {
    // Fetch form data including fields based on the provided link
    axios.get(`https://your-django-backend.com/api/forms/data/${link}/`)
      .then(response => {
        setFormData(response.data);
        setFormFields(response.data.fields);
      })
      .catch(error => {
        console.error('Error fetching form data:', error);
      });
  }, [link]);

  const handleFieldChange = (fieldName, value) => {
    setFormData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = () => {
    // Send the filled-out form data to the backend
    axios.post(`https://your-django-backend.com/api/forms/data/${link}/`, formData)
      .then(response => {
        console.log('Form submitted successfully:', response.data);
        // Handle success (e.g., redirect or show a success message)
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        // Handle error (e.g., display an error message)
      });
  };

  return (
    <div>
      <h1>{formData.name}</h1>
      <form>
        {formFields.map(field => (
          <div key={field.name}>
            <label htmlFor={field.name}>{field.name}</label>
            <input
              type="text"  // You may need to adjust this based on the field type
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={e => handleFieldChange(field.name, e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export async function getServerSideProps(context) {
  // Fetch the form link from the URL parameters
  const { link } = context.query;
  return {
    props: { link },
  };
}

export default FillForm;
