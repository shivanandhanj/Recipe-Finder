import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddRecipe.module.css'
const AddRecipe = () => {
    const [recipeData, setRecipeData] = useState({
        title: '',
        cuisine: '',
        course: '',
        mealType: '',
        duration: '',
        difficulty: '',
        ingredients: [{ name: '', quantity: '' }],
        instructions: '',
        youtubeLink: '',
    });
    const [imageFile, setImageFile] = useState(null);

    const handleChange = (e) => {
        setRecipeData({ ...recipeData, [e.target.name]: e.target.value });
    };

    const handleIngredientChange = (index, e) => {
        const newIngredients = [...recipeData.ingredients];
        newIngredients[index][e.target.name] = e.target.value;
        setRecipeData({ ...recipeData, ingredients: newIngredients });
    };

    const addIngredient = () => {
        setRecipeData({ ...recipeData, ingredients: [...recipeData.ingredients, { name: '', quantity: '' }] });
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);  // Store the image file in state
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', imageFile);  // Append the image file to the FormData
        formData.append('title', recipeData.title);
        formData.append('cuisine', recipeData.cuisine);
        formData.append('course', recipeData.course);
        formData.append('mealType', recipeData.mealType);
        formData.append('duration', recipeData.duration);
        formData.append('difficulty', recipeData.difficulty);
        formData.append('ingredients', JSON.stringify(recipeData.ingredients));  // Convert ingredients to JSON string
        formData.append('instructions', recipeData.instructions);
        formData.append('youtubeLink', recipeData.youtubeLink);

        try {
            const response = await axios.post('http://localhost:5000/api/recipes/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error adding recipe:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add a New Recipe</h2>
            <input type="text" name="title" placeholder="Title" value={recipeData.title} onChange={handleChange} required />
            <input type="text" name="cuisine" placeholder="Cuisine" value={recipeData.cuisine} onChange={handleChange} required />
            <input type="text" name="course" placeholder="Course (e.g., Main Course)" value={recipeData.course} onChange={handleChange} required />
            <input type="text" name="mealType" placeholder="Meal Type (e.g., Breakfast)" value={recipeData.mealType} onChange={handleChange} required />
            <input type="number" name="duration" placeholder="Duration (in minutes)" value={recipeData.duration} onChange={handleChange} required />
            <input type="text" name="difficulty" placeholder="Difficulty (e.g., Easy)" value={recipeData.difficulty} onChange={handleChange} required />
            
            <h3>Ingredients</h3>
            {recipeData.ingredients.map((ingredient, index) => (
                <div key={index}>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Ingredient Name" 
                        value={ingredient.name} 
                        onChange={(e) => handleIngredientChange(index, e)} 
                        required 
                    />
                    <input 
                        type="text" 
                        name="quantity" 
                        placeholder="Quantity" 
                        value={ingredient.quantity} 
                        onChange={(e) => handleIngredientChange(index, e)} 
                        required 
                    />
                </div>
            ))}
            <button type="button" onClick={addIngredient}>Add Ingredient</button>

            <textarea 
                name="instructions" 
                placeholder="Instructions (procedure)" 
                value={recipeData.instructions} 
                onChange={handleChange} 
                required 
            />

            <input type="file" name="image" accept="image/*" onChange={handleImageChange} required />

            <input type="text" name="youtubeLink" placeholder="YouTube Video URL" value={recipeData.youtubeLink} onChange={handleChange} />

            <button type="submit">Add Recipe</button>
        </form>
    );
}

export default AddRecipe;
