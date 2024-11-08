import React, { useContext, useState } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("home");

  return (
    <div className="navbar">
      <Link to="/">
        <h2 style={{textAlign:"start"}}>Food</h2>
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="/spoonacular"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Spoonacular
        </a>
        <a
          href="/add-recipe"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Add Recipe
        </a>
        <a
          href="/contact"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
    </div>
  );
};

export default Navbar;