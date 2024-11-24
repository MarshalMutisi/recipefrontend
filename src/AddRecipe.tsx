import React, { useState, useEffect } from "react";
import './App.css';


const AddRecipe = () => {
  // State for form data inputs
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ingredients: "",
    directions: "",
    image: "",
    tags: "",
  });

  // State for user authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State to manage loading state during recipe submission
  const [isLoading, setIsLoading] = useState(false);

  // State to handle error messages
  const [error, setError] = useState<string | null>(null);

  // Effect to check if the user is logged in by looking for an authentication token in local storage
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // Set `isLoggedIn` based on token presence
  }, []);

  // Handler for input and textarea field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // Update form data dynamically based on input field name
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to validate the form fields before submission
  const validateForm = () => {
    if (!formData.name.trim()) return "Recipe name is required.";
    if (!formData.description.trim()) return "Description is required.";
    if (!formData.ingredients.trim()) return "At least one ingredient is required.";
    if (!formData.directions.trim()) return "At least one direction is required.";
    return null; // Return null if validation passes
  };

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(null); // Clear previous errors

    // Alert if the user is not logged in
    if (!isLoggedIn) {
      alert("You must be logged in to add a recipe!");
      return;
    }

    // Validate form data
    const validationError = validateForm();
    if (validationError) {
      setError(validationError); // Set error if validation fails
      return;
    }

    // Retrieve authentication token from local storage
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("No token found. Please log in again."); // Alert if token is missing
      return;
    }

    setIsLoading(true); // Set loading state during async operation

    try {
      // Prepare the payload for the API request
      const payload = {
        name: formData.name,
        description: formData.description,
        ingredients: formData.ingredients.split(",").map((i) => i.trim()), // Split and trim ingredients
        directions: formData.directions.split(",").map((d) => d.trim()), // Split and trim directions
        image: formData.image,
        tags: formData.tags.split(",").map((t) => t.trim()), // Split and trim tags
      };

      // Send the payload to the server
      const response = await fetch("http://localhost:8098/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
        body: JSON.stringify(payload), // Convert payload to JSON
      });

      const responseData = await response.json(); // Parse the response data

      if (response.ok) {
        // Reset the form on successful submission
        alert("Recipe added successfully!");
        setFormData({
          name: "",
          description: "",
          ingredients: "",
          directions: "",
          image: "",
          tags: "",
        });
      } else {
        // Set error message if the response is not OK
        setError(
          responseData.message || responseData.error || "Failed to add the recipe."
        );
      }
    } catch (err) {
      // Handle unexpected errors
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="add-recipe-container">
      <h2>Add a New Recipe</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
      <form onSubmit={handleSubmit} noValidate className="recipe-form">
        <div className="form-group">
          <label htmlFor="name">Recipe Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea-field"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients (comma-separated):</label>
          <input
            type="text"
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="directions">Directions (comma-separated):</label>
          <textarea
            id="directions"
            name="directions"
            value={formData.directions}
            onChange={handleChange}
            className="textarea-field"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated):</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <button type="submit" disabled={isLoading} className="submit-button">
          {isLoading ? "Adding Recipe..." : "Add Recipe"} {/* Show loading text if submitting */}
        </button>
      </form>
    </div>
  );
};

export default AddRecipe; 
