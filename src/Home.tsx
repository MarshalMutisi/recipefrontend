import { useQuery } from '@tanstack/react-query';
import axios from 'axios'; 
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

function Home() {
    const [searchQuery, setSearchQuery] = useState(""); // State to manage the search input value

    // Function to fetch recipes based on the search query
    const fetchPosts = async () => {
        const url = searchQuery
            ? `http://localhost:8098/posts/${searchQuery}` // Fetch filtered posts if a search query is provided
            : `http://localhost:8098/posts`; // Fetch all posts if no search query is provided

        try {
            const response = await axios.get(url); // Make a GET request to the API
            return response.data; // Return the response data
        } catch (error) {
            console.error("Error fetching data:", error); // Log any errors encountered
            throw error; // Throw error to be handled by useQuery
        }
    };

    // Use React Query's useQuery to handle data fetching, caching, and error handling
    const { data = [], error, isLoading } = useQuery({
        queryKey: ["posts", searchQuery], // The query key includes the search query for caching purposes
        queryFn: fetchPosts, // The function responsible for fetching data
        staleTime: 1000 * 60, // Data will be considered fresh for 1 minute
        retry: 2, // Retry the query twice before throwing an error
    });

    if (isLoading) {
        return <div className="text-center">Loading Recipes...</div>; // Display a loading message while data is being fetched
    }

    // Error handling if the query fails
    if (error instanceof Error) {
        return <div className="text-center text-red-500">Error loading Recipes: {error.message}</div>;
    }

    return (
        <div className="bg-lime-500 min-h-screen p-4">
            <h1 className="text-3xl font-bold text-center mb-8">All Recipes</h1>

            {/* Input field for searching recipes */}
            <input
                type="text"
                placeholder="Search Recipes..."
                className="mb-4 p-2 border border-gray-300 rounded-md w-full"
                value={searchQuery} // Binds the input value to the searchQuery state
                onChange={(e) => setSearchQuery(e.target.value)} // Updates the state when the input changes
            />

            {/* Display recipes in a grid format */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.length === 0 ? (
                    // Show a message if no recipes are found
                    <div className="col-span-full text-center">
                        No recipes found for "{searchQuery}"
                    </div>
                ) : (
                    // Map through the fetched recipes and display them
                    data.map((post: any) => (
                        <div
                            key={post.id} // Unique key for each recipe card
                            className="border border-gray-300 rounded-lg p-4 shadow-md transform transition-transform duration-300 hover:scale-105"
                        >
                            {/* Display the recipe image */}
                            <img
                                src={post.image || 'https://via.placeholder.com/150'} // Default placeholder image if no image is available
                                alt={post.name} // Alt text for the image
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            {/* Display the recipe name */}
                            <h2 className="text-xl font-semibold mb-2">{post.name}</h2>
                            {/* Display the recipe description */}
                            <p className="text-gray-700 mb-2">{post.description}</p>
                            <div className="flex justify-between items-center">
                                {/* Display the tags associated with the recipe */}
                                <span className="text-sm text-gray-500">
                                    Tags: {post.tags ? post.tags.join(', ') : 'No tags available'}
                                </span>
                                {/* Link to view more details about the recipe */}
                                <Link
                                    to={`/recipeinfo/${post.id}`} // Dynamic routing to the recipe info page
                                    className="text-blue-500 hover:underline text-sm"
                                >
                                    View Recipe
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Home; // Export the Home component
