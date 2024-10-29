import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/RecipeList.css';
import { Link } from 'react-router-dom';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [chatInput, setChatInput] = useState("");
    const [chatResponse, setChatResponse] = useState("");

    useEffect(() => {
        axios.get('http://localhost:5000/api/recipes')
            .then(response => setRecipes(response.data))
            .catch(error => console.error('Error fetching recipes:', error));
    }, []);

    const handleChatSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:7000/query', { query: chatInput });
            setChatResponse(response.data.answer);
        } catch (error) {
            console.error('Error fetching chatbot response:', error);
        }
    };

    return (
        <div className="parent">
            <div><h1>Recipe List</h1></div>

            <div className="recipe-container">
                {recipes.map(recipe => {
                    const imageUrl = `http://localhost:5000${recipe.image}`;
                    return (
                        <Link to={`/recipes/${recipe._id}`} key={recipe._id} className="recipe-card">
                            {recipe.image && (
                                <div className='image-field'>
                                    <img src={imageUrl} alt={recipe.title} className="recipe-image" />
                                </div>
                            )}
                            <div className="recipe-info">
                                <h3>{recipe.title}</h3>
                                <div className="recipe-meta">
                                    <p><strong>Duration:</strong> {recipe.duration} minutes</p>
                                    <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="chatbot">
                <h2>Ask the Recipe Chatbot</h2>
                <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask a question about recipes..."
                />
                <button onClick={handleChatSubmit}>Submit</button>
                {chatResponse && <p className="chat-response">Answer: {chatResponse}</p>}
            </div>
        </div>
    );
};

export default RecipeList;
