import React from "react";

// Functional component of this "About" page of the application
function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300">
      {/* Center the content vertically and horizontally, with a gradient background */}
      <div className="bg-white p-8 rounded shadow-md w-full max-w-3xl">
        {/* Container for the content with padding, rounded corners, and shadow */}
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
          About MelloyTech
        </h1>
     
        <p className="text-gray-700 text-lg mb-4">
          Welcome to <span className="font-semibold text-blue-600">MelloTechy</span>, your trusted partner in digital innovation and culinary creativity
        </p>
       
        <p className="text-gray-700 text-lg mb-4">
          At MelloyTech, we specialize in building modern, user-friendly platforms that bring people closer to what they love. Our recipe-sharing platform is one such initiative, designed to empower home cooks, professional chefs, and food enthusiasts to share their favorite recipes with the world.
        </p>
        
        <p className="text-gray-700 text-lg mb-4">
          Whether you're here to find inspiration for your next meal, share your culinary masterpieces, or connect with like-minded food lovers, MelloyTech is the perfect space for you.
        </p>
       
        <p className="text-gray-700 text-lg">
          Join us on this exciting journey, where technology meets flavor, and innovation fuels creativity. Together, let's make cooking more accessible, fun, and collaborative!
        </p>
       
      </div>
    </div>
  );
}

export default About;

