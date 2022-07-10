import logo from "./logo.svg";
import "./App.css";
import Recipe from "./Recipe";
import { useEffect, useRef, useState } from "react";

function App() {
  const APP_ID = "0f52d0b5";
  const APP_KEY = "89a90e823a419fd655bb131108f47126";

  const [recipes, setRecipes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState("veg");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
  };

  const update = e => {
  console.log(e.target.value);
  setSearchText(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(searchText);
    setSearchText("");
  }

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input  className="search-bar" type="text" value={searchText} onChange={update}  />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
      {recipes.map((recipe, index) => (
        <Recipe
          key ={index}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
}

export default App;
