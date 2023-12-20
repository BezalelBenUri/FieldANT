// ThankYou.js
import React from 'react';
import Link from 'next/link';

const ThankYou = () => {
  return (
    <div className = "container mx-auto my-8 bg flex flex-col justify-center items-center font-sans text-gray-800">
      <h1 className = "text-3xl font-bold mb-4 text-indigo-700">Thank You!</h1>
      <p className = "mb-8 text-center text-yellow-500">
        Your form has been submitted successfully. We appreciate your response.
      </p>
      <Link href = "/">
        <div className = "bg-blue-500 text-white py-2 px-4 rounded hover:bg-yellow-500">
          Return to Home
        </div>
      </Link>
    </div>
  );
};

export default ThankYou;
