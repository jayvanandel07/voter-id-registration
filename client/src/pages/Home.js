import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styles from "./Home.css";
const Home = () => {
  return (
    <div>
      <h1>Voter registration</h1>
      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>

  )
}

export default Home