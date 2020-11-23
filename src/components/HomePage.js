import React from 'react';
import { HashRouter, Link } from 'react-router-dom';
import '../css/Homepage.css'
const HomePage = () => {
    return (
        <div className="container">
            <br></br>
            <div className="card">
                <div className="card-body card-body-text" style={{ textAlign: 'center' }}>
                    <h5>Welcome to ML Visualizer, a place to visualize, understand and play around with your favorite ML Algorithms</h5>
                </div>
            </div>
            <hr></hr>
            <div className="row" style={{ textAlign: 'center' }}>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body card-body-text">
                            <i className="fas fa-chart-bar fa-2x" style={{ color: 'crimson' }}></i><br></br>
        See your favorite Algorithms in action.<br>
                            </br>
        Available Algorithms:
        <ul className="list-group bmd-list-group-sm">
                                <li className="list-group-item">Simple Linear Regression</li>
                                <li className="list-group-item">Multiple Linear Regression</li>
                                <li className="list-group-item">Polynomial Regression</li>
                                <li className="list-group-item">Support Vector Regression</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body card-body-text">
                            <i className="fas fa-code fa-2x" style={{ color: 'darkgoldenrod' }}></i><br></br>
        Ready to run codes available for all Algorithms<br></br>
        <hr></hr>
        Written in Python 3 with all your favorite libraries like Scikit-learn, Numpy, Pandas, Keras etc
                </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body card-body-text">
                            <i className="fas fa-keyboard fa-2x" style={{ color: 'green' }}></i><br></br>
        Test the algorithms with your own data!
        <hr>
        </hr>
        Coming Soon !!
                </div>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className="card">
                <div className="card-body card-body-text">
                    Interested in how the app works? Check out the API documentation <a href={"https://documenter.getpostman.com/view/7414080/TVeqcn2F"} target="_blank">here</a>
                </div>
            </div>
        </div>
    );
}

export default HomePage;