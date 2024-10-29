import React, { useState, useEffect } from 'react';
import foodImg from "../assets/1729236850430.png"
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/RecipeDetails.css'; // Import the CSS file

const RecipeDetails = () => {
    const { id } = useParams(); // Get the recipe ID from the URL
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
                setRecipe(response.data);
            } catch (error) {
                console.error('Error fetching recipe details:', error);
            }
        };

        fetchRecipe();
    }, [id]);

    if (!recipe) return <div>Loading...</div>;

    return (
        <div className="recipe-details">
            <div className="recipe-card-details">
                <h1 className="recipe-title">{recipe.title}</h1>
                {recipe.image && (
                    <>
                    {/* <img src={`http://localhost:6000/${recipe.image}`} alt={recipe.title} className="recipe-image" /> */}
                    <img src={foodImg} alt={recipe.title} className="recipe-image" />
                    </>
                )}
                <div className="recipe-info">
                    <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
                    <p><strong>Course:</strong> {recipe.course}</p>
                    <p><strong>Meal Type:</strong> {recipe.mealType}</p>
                    <p><strong>Duration:</strong> {recipe.duration} minutes</p>
                    <p><strong>Difficulty:</strong> {recipe.difficulty}</p>

                </div>

                <div className="recipe-ingredients">
                    <h2>Ingredients</h2>
                    <ul>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient.name}: {ingredient.quantity}</li>
                        ))}
                    </ul>
                </div>

                <div className="recipe-instructions">
                    <h2>Cooking Instructions</h2>
                    {recipe.instructions.split('\n').map((step, index) => (
                        <div key={index} className="instruction-step">
                            <h3>Step {index + 1}</h3>
                            <p>{step}</p>
                        </div>
                    ))}
                </div>


                {recipe.youtubeLink && (
                    <div className="youtube-video">
                        <iframe
                            width="560"
                            height="315"
                            src={recipe.youtubeLink}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    </div>
                )}

                <div className="recipe-feedback">
                    <p>Do you like this recipe?</p>
                    <button className="feedback-btn">👍 YES</button>
                    <button className="feedback-btn">👎 NO</button>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;
