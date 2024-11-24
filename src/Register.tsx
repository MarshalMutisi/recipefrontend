import React, { useState } from "react"; 

function Register() {
  const [email, setEmail] = useState(""); // State for storing the email input
  const [password, setPassword] = useState(""); // State for storing the password input
  
  // handleSubmit function to handle the form submission
  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Making a POST request to the server for registration
      const response = await fetch("http://localhost:8098/register", {
        method: "POST", // HTTP POST request to register the user
        headers: {
          "Content-Type": "application/json", // Setting the content type as JSON
        },
        body: JSON.stringify({ email, password }), // Sending email and password in the request body
      });

      if (response.ok) {
        // If registration is successful, show success message and redirect to login page
        alert("Registration successful! Please log in.");
        window.location.href = "/login"; 
      } else {
        // If registration fails, show error message with response error
        const error = await response.text();
        alert(`Registration failed: ${error}`);
      }
    } catch (err) {
      // Handle any errors that occur during the fetch request
      console.error("Error during registration:", err);
      alert("An error occurred while registering.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-orange-500">
      {/* Centering the form within a flex container with background color */}
      <form
        onSubmit={handleSubmit} // Calling handleSubmit on form submission
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Register</h2>
        {/* Title of the form */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          {/* Email input field */}
          <input
            type="email"
            value={email} // Binding value to email state
            onChange={(e) => setEmail(e.target.value)} // Updating state on input change
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          {/* Password input field */}
          <input
            type="password"
            value={password} // Binding value to password state
            onChange={(e) => setPassword(e.target.value)} // Updating state on input change
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit" // Button to submit the form
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register; 
