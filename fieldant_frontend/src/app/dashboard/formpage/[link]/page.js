'use client'
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

const FormDetails = () => {
  const router = useRouter();
  const params = useParams();
  const { link } = params;
  const [formData, setFormData] = useState(null);

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
  }, [link]); // Make sure to include link in the dependency array

  if (!link) {
    // Handle the case when link is not defined
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8">
      {/* Render form details based on formData */}
      <h1 className="text-3xl font-bold mb-4 text-indigo-700">Form Details</h1>
      {formData ? (
        <div>
          {/* Render form details here */}
          <p>Form Name: {formData.name}</p>
          <p>Form Description: {formData.description}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <div>
          Loading...
        </div>
      )}
    </div>
  );
};

export default FormDetails;
