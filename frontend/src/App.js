import React from 'react';
import Header from './components/Header';

import RecipeList from './components/RecipeList';
import AddRecipe from './components/AddRecipe';
import RecipeDetails from './components/RecipeDetails';
import SpoonacularRecipeList from './components/SpoonacularRecipeList'; // Import the new component
import Login from './components/Login';
import Signup from './components/SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';  // Optional if you want general styles for your app
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
     
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<RecipeList />} />  {/* Use 'element' instead of 'component' */}
          <Route path="/add-recipe" element={<AddRecipe />} />  {/* Use 'element' instead of 'component' */}
          <Route path="/recipes/:id" element={<RecipeDetails />} /> {/* Use 'element' instead of 'component' */}
          <Route path="/spoonacular" element={<SpoonacularRecipeList />} /> {/* Route for Spoonacular */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
     
    </Router>
  );
}

export default App;
