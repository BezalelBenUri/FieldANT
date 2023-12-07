"use client"

import { useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from "next/link";

import Header from '../../components/header.js';
import Footer from '@/components/footer.js';


const SignUp = () => {
    const [formData, setFormData] = useState({
        username: "",
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
        const router = useRouter();
        try {
          const response = await axios.post('http://localhost:8000/api/signup/', formData, {
            headers: {
              'Content-Type': 'application/json',
            },
            data: formData,
          });
    
          if (response.status === 201) {
            const userData = response.data;
            console.log("Signup successful:", userData);
            
            router.push("/login");
          } else {
            //Handle other status code
            console.error("Unexpected status code:", response.status)
          }
        } catch (error) {
          console.error('Signup error:', error);
          // TODO: Handle unexpected error
        }
      };
    
      return (
        <div className = "signup-page min-h-screen flex flex-col justify-between font-sans text-gray-800">
            <Header />
            <main className = "signup-form bg-white flex-grow flex items-center justify-center">
              <section className = "flex flex-col items-center">
                <h2 className =  "text-2xl font-bold">Sign Up</h2>
                <form onSubmit = {handleSubmit}>
                  <div className = "mb-4">
                    <label htmlFor = "username" className = "block mt-4 mb-2 text-sm font-medium text-gray-700">Username</label>
                      <input type = "text"
                      id = "username"
                      name = "username"
                      value = {formData.username}
                      onChange = {handleChange}
                      className = "w-full px-4 py-2 border rounded-md"
                      required
                      /><br/>
                  </div>

                  <div className = "mb-4">
                    <label htmlFor = "email" className = "block text-sm font-medium text-gray-700">Email</label>
                    <input
                    type = "email"
                    id = "email"
                    name = "email"
                    value = {formData.email}
                    onChange = {handleChange}
                    className = "w-full px-4 py-2 border rounded-md"
                    required
                    />
                  </div>

                  <div className = "mb-4">
                    <label htmlFor = "password" className = "block mt-2 mb-4 text-sm font-medium text-gray-700">Password</label>
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

                  <button type = "submit" className = "bg-yellow-500 text-white py-1 px-2 rounded hover:bg-gray-900">Sign Up</button>
                </form>
                <p className = "mt-2">
                  Already have an account? <Link href = "/login" className = "text-yellow-500 hover:text-black">Log In</Link>
                </p>
              </section>
            </main>

            <Footer />
        </div>
      )
}

  export default SignUp;