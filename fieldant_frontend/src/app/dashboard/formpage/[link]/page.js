// FormDetails.js
'use client';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

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
  }, [link]);

  if (!link) {
    // Handle the case when link is not defined
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div className = "container mx-auto my-8">
      {/* Render form details based on formData */}
      <h1 className = "text-3xl font-bold mb-4 text-indigo-700">Form Details</h1>
      {formData ? (
        <div>
          <p>Form Name: {formData.name}</p>
          <p>Form Description: {formData.description}</p>
          {/* Render other details as needed */}
          
          {/* Link to fill out the form */}
          <Link href = {`/dashboard/formpage/${formData.link}/fillForm/`} as = {`/dashboard/formpage/${formData.link}/fillForm/`}>
            <div className = "bg-yellow-500 text-white py-2 px-4 rounded hover:bg-indigo-700">
              Fill Form
            </div>
          </Link>
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
