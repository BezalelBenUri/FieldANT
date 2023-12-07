"use client"
import Header from '../../components/header.js';
import Footer from '@/components/footer.js';

import {useState} from 'react';
import axios from 'axios';

const login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // TODO: Implement login logic and API call to Django backend
        // Replace the URL with your actual Django login endpoint
        try {
          // Make the login API call
          const response = await axios.post('http://localhost:8000/api/login/', formData);
    
          console.log('Login successful:', response.data);
    
          // TODO: Handle successful login (e.g., store user token in cookies or context)
          
          // Redirect to the dashboard page
          router.push('/dashboard');
        } catch (error) {
          console.error('Login error:', error);
          // TODO: Handle login error (e.g., display error message)
        }
      };

    return (
        <div className = "login-page  min-h-screen flex flex-col justify-between font-sans text-gray-800">
            <Header />
              <main className = "login-form bg-white flex-grow flex items-center justify-center">
                  <section className = "flex flex-col items-center h-full px-6 py-12 md:py-32 l ">
                    <h2 className = "text-2xl font-bold">Log In</h2>
                    <form onSubmit = {handleSubmit}>
                      <div className = "mb-5">
                        <label htmlFor = "Username" className = "block text-gray-700">Email</label>
                        <input
                        type = "text"
                        id = "email"
                        name = "email"
                        value = {formData.email}
                        onChange = {handleChange}
                        className = "w-full px-4 py-2 border rounded-md"
                        required
                        />
                      </div>

                      <div>
                        <label htmlFor = "Password" className = "block text-gray-700">Password</label>
                        <input
                        type = "password"
                        id = "password"
                        name = "password"
                        value = {formData.password}
                        onChange = {handleChange}
                        className = "w-full px-4 py-2 border rounded-md"
                        required
                        />
                      </div>
                      
                      <button type = "submit" className = "bg-yellow-500 text-white py-2 px-4 rounded mt-3 hover:bg-gray-700">Log In</button>
                    </form>

                    <p className = "mt-4">
                      Don't have an account? <a href = "/signup"  className = "text-yellow-500 hover:text-black">Sign Up</a>
                    </p>
                  </section>
              </main>
            <Footer />
        </div>)}
        
export default login