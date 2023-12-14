import React from 'react';

const AddFieldButton = ({ onClick }) => (
    <button
    type = "button"
    onClick = {onClick}
    className = "inline-flex items-center px-4 py-2 bg-indigo-500 text-white font-bold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        + Add Field
    </button>
);

export default AddFieldButton;