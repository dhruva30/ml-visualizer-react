import React from 'react';
import { HashRouter, Link } from 'react-router-dom';

const Appbar = () => {
  return <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:'#3d5afe'}}>
    <a className="navbar-brand" href="#">ML Visualizer</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Regression
        </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <HashRouter>
            <Link to="/simple-linear-regression" className="dropdown-item">Simple Linear Regression</Link>
            <Link to="/simple-linear-regression" className="dropdown-item">Multiple Linear Regression</Link>
            <Link to="/simple-linear-regression" className="dropdown-item">Polynomial Regression</Link>
            <Link to="/simple-linear-regression" className="dropdown-item">Support Vector Regression</Link>
            </HashRouter>
          </div>
        </li>
      </ul>
  </div>
</nav>
}

export default Appbar;
