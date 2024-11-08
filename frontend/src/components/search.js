import React, { useState } from 'react';
import axios from 'axios';

function RecipeSearch() {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/recipes/search?q=${query}`);
            setRecipes(response.data);
            console.log(recipes)
        } catch (error) {
            console.error('Error searching recipes:', error);
        }
    };

    return (
        <div>
            <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Search for recipes..."
            />
            <button onClick={handleSearch}>Search</button>
            
            <div>
                <h1>{recipes}</h1>
                {recipes.map((recipe) => (
                    <div key={recipe._id}>
                        <h3>{recipe.title}</h3>
                        <p>Cuisine: {recipe.cuisine}</p>
                        {/* Add other details as needed */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecipeSearch;
