import React from 'react' 
import { useParams } from "react-router-dom"; 
import { useQuery } from "@tanstack/react-query"; 
import axios from "axios";

function RecipeInfo() {
    const { id } = useParams(); // Destructuring the 'id' parameter from the URL

    // Function to fetch recipe details from the API
    const fetchRecipeDetail = async () => {
        const response = await axios.get(`http://localhost:8098/posts/id/${id}`); // Axios GET request to fetch recipe data
        return response.data; // Returning the recipe data from the response
    };

    // Using useQuery to fetch data and manage loading, error, and data states
    const { data: recipe, error, isLoading } = useQuery({
        queryKey: ["recipe", id], // Query key to uniquely identify the request
        queryFn: fetchRecipeDetail, // Function to fetch the recipe data
        staleTime: 1000 * 60, // Time before the data is considered stale (1 minute)
        retry: 2, // Retry failed requests up to 2 times
    });

    // Conditional rendering for loading state
    if (isLoading) {
        return <div className="text-center">Loading Recipe...</div>; // Display loading message while fetching data
    }

    // Conditional rendering for error state
    if (error instanceof Error) {
        return <div className="text-center text-red-500">Error loading Recipe: {error.message}</div>; // Display error message if an error occurs
    }

    return (
        <div className="container mx-auto p-4"> {/* Container for the recipe details */}
            <h1 className="text-3xl font-bold text-center mb-8">{recipe.name}</h1> {/* Recipe name */}
            <img
                src={recipe.image || "https://via.placeholder.com/150"} // Display recipe image, with fallback to placeholder
                alt={recipe.name} // Alt text for the image
                className="w-full max-h-96 object-cover rounded-lg mb-4" // Styling for the image
            />
            <p className="text-gray-700 mb-4">{recipe.description}</p> {/* Recipe description */}
            <h2 className="text-xl font-semibold mb-2">Tags:</h2> {/* Tags section header */}
            <p className="text-gray-500 mb-4">
                {recipe.tags ? recipe.tags.join(", ") : "No tags available"} {/* Display tags or a message if no tags */}
            </p>
            <h2 className="text-xl font-semibold mb-2">Ingredients:</h2> {/* Ingredients section header */}
            <ul className="list-disc list-inside mb-4">
                {/* Mapping through recipe ingredients and rendering each one */}
                {recipe.ingredients?.map((ingredient: string, index: number) => (
                    <li key={index}>{ingredient}</li> // List item for each ingredient
                ))}
            </ul>
            <h2 className="text-xl font-semibold mb-2">Instructions:</h2> {/* Instructions section header */}
            <p className="text-gray-700">{recipe.instructions || "No instructions available"}</p> {/* Recipe instructions */}
        </div>
    );
}

export default RecipeInfo; 
