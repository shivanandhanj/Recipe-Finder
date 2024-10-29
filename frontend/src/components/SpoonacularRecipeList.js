import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/SpoonacularRecipeList.css';

const SpoonacularRecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState('chicken');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const API_KEY = '4ce8dbfa53264661a4c9eb02cefc9b7c';  // Replace with your API key

    // Function to fetch recipes from Spoonacular
    const fetchRecipes = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(
                `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=${API_KEY}`
            );
            setRecipes(response.data.results);
        } catch (err) {
            setError('Error fetching recipes');
        }
        setLoading(false);
    };

    // Fetch recipes when the component loads or the query changes
    useEffect(() => {
        fetchRecipes();
    }, [query]);

    return (
        <div className="spoonacular-container">
            <h1>Spoonacular Recipe Finder</h1>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for recipes..."
                className="search-input"
            />
            <button onClick={fetchRecipes} className="search-button">Search</button>

            {loading && <p>Loading recipes...</p>}
            {error && <p>{error}</p>}

            <div className="recipe-grid">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="recipe-card">
                        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                        <h3>{recipe.title}</h3>
                        <a href={`https://spoonacular.com/recipes/${recipe.title}-${recipe.id}`} target="_blank" rel="noopener noreferrer">
                            View Recipe
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpoonacularRecipeList;
