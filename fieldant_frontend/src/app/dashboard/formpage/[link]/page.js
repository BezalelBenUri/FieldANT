'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const FormDetails = () => {
  const router = useRouter();
  const { link } = router.query;
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (link) {
      // Fetch form data using the link from the Django backend
      axios.get(`http://localhost:8000/api/forms/data/${link}`)
        .then(response => {
          setFormData(response.data);
        })
        .catch(error => {
          console.error('Error fetching form data:', error);
        });
    }
  }, [link]);

  if (!formData) {
    // Render loading state or handle error
    return <div>Loading...</div>;
  }

  return (
    <div className = "container mx-auto my-8">
      <h1 className = "text-3xl font-bold mb-4 text-indigo-700">{formData.name} Details</h1>

      <p>Description: {formData.description}</p>

      {/* Render other form details or statistics as needed */}
    </div>
  );
};

export default FormDetails;
