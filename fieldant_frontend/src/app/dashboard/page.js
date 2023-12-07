"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';

const dashboard = () => {
    const [userData, setUserData] = useState({
        username: 'admin', // rep with act
        formsCreated: 0,
        responsesRecieved: 0,
        projects: [],
    });

    // Simulate fetching user data from the backend
    useEffect(() => {
        fetch('https://your-django-backend.com/api/user/dashboard', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer yourAuthToken', // Replace with actual authentication token
            },
        })
        .then(response => response.json())
        .then(data => setUserData(data))
        .catch(error => console.error('Error fetching user data:', error));
    }, []);
    
    return (
        <div className = "dashboard-page font-sans text-gray-800">
            <section className = "dashboard-content">
                <h2 className = "text-2x1 font-bold mb-6">Welcome, {userData.username}!</h2>
                <div className = "grid grid-cols-2 gap-4">
                    <div className = "bg-white rounded-lg shadow-md p-6">
                        <h3 className = "text-lg font-semibold mb-4">Forms Created</h3>
                        <p className = "text-4xl font-bold">{userData.formsCreated}</p>
                    </div>
                    <div className = "bg-white p-6 rounded-lg shadow-md">
                        <h3 className = "text-lg font-semibold mb-4">Responses Recieved</h3>
                        <p className = "text-4xl font-bold">{userData.responsesRecieved}</p>
                    </div>
                </div>

                <div className = "mt-8">
                    <h3 className = "text-xl font-bold mb-4">Projects</h3>
                    {userData.projects.length === 0 ? (
                        <p>No projects created yet.</p>
                    ) : (
                        <ul className = "list-disc pl-8">
                        {userData.projects.map(project => (
                            <li key = {project.id}>{project.name}</li>
                        ))}
                        </ul>
                    )}
                </div>

                <div className = "mt-8">
                    <Link href = "/dashboard/formpage" className = "bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                        Create New Project
                    </Link>
                </div>

            </section>
        </div>
        )
}

export default dashboard