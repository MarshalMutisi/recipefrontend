import React from 'react';


import './App.css';
import NavBar from './NavBar';
import Home from './Home';
import About from './About';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddRecipe from './AddRecipe';
import Register from './Register';
import Login from './Login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RecipeInfo from './RecipeInfo';

function App() {
  const client = new QueryClient();
  return (
    <div className="App">
      <   QueryClientProvider client={client}>
      
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element ={<Home/>}/>
          <Route path="/addRecipe" element={<AddRecipe/>}/>
          <Route path="/register" element ={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/about" element ={<About/>}/>
          <Route path="//recipeinfo/:id" element ={<RecipeInfo/>}/>
        </Routes>
        
      </Router>
      </QueryClientProvider>
      
      
   
    </div>
  );
}

export default App;
