import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState(""); // State to store the email input
  const [password, setPassword] = useState(""); // State to store the password input

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault(); // Prevents the default form submission behavior

    try {
      // Sending login credentials to the server
      const response = await fetch("http://localhost:8098/login", {
        method: "POST", // HTTP method for login
        headers: {
          "Content-Type": "application/json", // Specifies the content type of the request
        },
        body: JSON.stringify({ email, password }), // Converts the email and password into a JSON string
      });

      if (response.ok) {
        const data = await response.json(); // Parsing the response JSON
        // Save token to localStorage
        localStorage.setItem("authToken", data.token); // Storing the authentication token in localStorage
        alert("Login successful!"); // Notifying the user about successful login
        window.location.href = "/addrecipe"; // Redirecting to the Add Recipe page
      } else {
        const error = await response.json(); // Parsing error response JSON
        alert(`Login failed: ${error.message}`); // Displaying the error message to the user
      }
    } catch (err) {
      console.error("Error during login:", err); // Logging any errors that occur during the fetch request
      alert("An error occurred while logging in."); // Notifying the user about a network or unexpected error
    }
  };

  return (
    <div className="login-container flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit} // Attaching the form submission handler
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2> {/* Form title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label> {/* Email label */}
          <input
            type="email" // Input type for email
            value={email} // Binding input value to email state
            onChange={(e) => setEmail(e.target.value)} // Updating email state on change
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required // Making the field mandatory
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Password</label> {/* Password label */}
          <input
            type="password" // Input type for password
            value={password} // Binding input value to password state
            onChange={(e) => setPassword(e.target.value)} // Updating password state on change
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required // Making the field mandatory
          />
        </div>
        <button
          type="submit" // Button type set to submit
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Login {/* Button text */}
        </button>
      </form>
    </div>
  );
}

export default Login; 