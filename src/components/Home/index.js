import React from 'react';
import { Link } from "react-router-dom";

import logo from './logo.png';
import './style.css';

const Home = () => (
  <div className="Home">
    <Link to="/play">
      <h1><img alt="Orthello" src={logo}/></h1>
      Play
    </Link>
  </div>
);

export default Home;
