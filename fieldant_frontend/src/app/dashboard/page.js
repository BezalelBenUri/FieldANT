"use client"
import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    // Fetch the list of forms from the Django backend
    axios.get('http://localhost:8000/api/forms/list/')
      .then(response => {
        setForms(response.data);
      })
      .catch(error => {
        console.error('Error fetching forms:', error);
      });
  }, []);

  return (
    <div className = "container mx-auto my-8">
      <h1 className = "text-3xl font-bold mb-4 text-indigo-700">Dashboard</h1>

      <Link href = "/dashboard/formpage/" >
        <div className = "bg-yellow-500 text-white py-2 px-4 rounded mb-4 inline-block hover:bg-indigo-700">
          Create Form
        </div>
      </Link>

      <div className = "grid grid-cols-3 gap-4">
        {forms.map(form => (
          <Link key = {form.link} href = {`/dashboard/formpage/${form.link}`} as = {`/dashboard/formpage/${form.link}`}>
            <div className = "bg-white border p-4 rounded cursor-pointer hover:bg-gray-100">
              <h2 className = "text-lg font-bold mb-2 text-black">{form.name}</h2>
              <p className = "text-gray-600">{form.description}</p>
              {/* Add more details or statistics as needed */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
