import React, { Component } from 'react'
import Table from '../Table'
import axios from 'axios'
import Spinner from 'react-spinner-material'
import ImageCard from '../ImageCard'
import '../../css/Homepage.css'
import Codeblock from '../Codeblock'

export default class MultipleLinearRegression extends Component {

    constructor(props) {
        super(props)

        this.state = {
            trainingData: [],
            baseUrl: "https://ml-visualizer-services.herokuapp.com/regression/multiple",
            showSpinnerForTrain: false,
            trainingDone: false,
            rdSpend: 0,
            admin: 0,
            marketSpend: 0,
            state: "New York",
            predictedProfit:0,
            showSpinnerForPrediction: false,
            code:`
            dataset: pd.DataFrame = pd.read_csv("training_data/50_Startups.csv")
            x = dataset.iloc[:, :-1].values
            y = dataset.iloc[:, -1].values
            x = np.array(columnTransformer.fit_transform(x))
            x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2)
            regressor = LinearRegression()
            regressor.fit(x_train, y_train)
            y_pred = regressor.predict(x_test)
            `
        }
    }

    componentDidMount() {
        axios.get(this.state.baseUrl + "/trainingdata").then((response) => {
            this.constructTrainingData(response.data);
        })
    }

    constructTrainingData(response) {
        console.log(response)
        let row = []
        let rows = []
        for (let i = 0; i < response["Administration"].length; i++) {
            row.push(response["R&D Spend"][i]);
            row.push(response["Administration"][i]);
            row.push(response["Marketing Spend"][i]);
            row.push(response["State"][i]);
            row.push(response["Profit"][i]);
            rows.push(row);
            row = [];
        }
        this.setState({
            trainingData: rows
        })
    }

    train = () => {
        this.setState({
            showSpinnerForTrain: true
        })
        axios.get(this.state.baseUrl + "/train").then((response) => {
            if (response.data.status === "Success") {
                this.setState({
                    showSpinnerForTrain: false,
                    trainingDone: true
                })
            }
        })
    }

    handleRdSpend = (event) => {
        this.setState({
            rdSpend: event.target.value
        })
    }

    handleAdminSpend = (event) => {
        this.setState({
            admin: event.target.value
        })
    }

    handleMarketSpend = (event) => {
        this.setState({
            marketSpend: event.target.value
        })
    }

    handleState = (event) => {
        this.setState({
            state: event.target.value
        })
    }

    predict = () => {
        let body = {
            "rdSpend":+this.state.rdSpend,
            "admin":+this.state.admin,
            "manufacturing":+this.state.marketSpend,
            "state":this.state.state
        }

        this.setState({
            predictedProfit:0,
            showSpinnerForPrediction:true
        },() => {
           axios.post(this.state.baseUrl+"/predict",body)
           .then((response) => {
               this.setState({
                   predictedProfit: response.data.predictedProfit,
                   showSpinnerForPrediction:false
               })
           })
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="card" style={{ textAlign: 'center', marginTop: '1%' }}>
                    <h3 className="card-title">Multiple Linear Regression</h3>
                    <div className="card-body card-body-text">
                        Multiple Linear Regression is an extension of Simple Linear regression. Here the dependant variable is dependant upon 2 or more features.
                        The equation can be represented as y = ax + bz + c
                        <br></br>
                        In Scikit-Learn we dont separately have a MultipleLinearRegression class , but we use the same SimpleLinearRegression class to implement it.
                    </div>
                </div>
                <hr>
                </hr>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card card-body-text" style={{ overflow: 'scroll', height: '500px', textAlign: 'center' }}>
                            <h5 className="card-title">Training Data</h5>
                            <a href={"https://raw.githubusercontent.com/dhruva30/ml-visualiser-assets/main/50_Startups.csv"} role="button" className="btn btn-primary" target="_blank">Download</a>
                            We have a list of 50 startups and the information of different spends and the profit they got for these.
                            We need to see which startup is more profitable and also in the future for different values should we invest in the startup.
                            As it is evident, profit is now dependant on 4 features hence, Multiple
                            <div style={{
                                position: 'absolute', left: '50%', top: '50%',
                                transform: 'translate(-50%, -50%)'
                            }}>
                                <Spinner radius={30} color="#ff6f00" visible={this.state.trainingData.length === 0} />
                            </div>
                            {this.state.trainingData.length > 0 && <Table columns={["R&D Spend", "Administration", "Marketing Spend", "State", "Profit"]} data={this.state.trainingData} />}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card card-body-text" style={{ textAlign: 'center' }}>
                            <h5 className="card-title">Train the model</h5>
                            Upon clicking this button, the model will be trained with the training data.
                            <button className="btn btn-primary" onClick={this.train}>Train</button>
                            <div style={{
                                position: 'absolute', left: '50%', top: '100%',
                                transform: 'translate(-50%, -50%)'
                            }}>
                                <Spinner radius={30} color="#ff6f00" visible={this.state.showSpinnerForTrain} />
                            </div>
                        </div>
                        <br></br>
                        {this.state.trainingDone && <div>
                            <ImageCard
                                title="Actual Profits VS Predicted Profits"
                                description="Since we cannot represent multiple features in 2D, lets see how the model predicted the profits"
                                imageUrl={this.state.baseUrl + "/result"}
                            />
                        </div>
                        }
                    </div>
                    <div className="col-md-4">
                        {this.state.trainingDone && <div className="card card-body-text" style={{ textAlign: 'center', marginLeft: '1%', marginRight: '1%' }}>
                            <h5 className="card-title">Predict New Profits</h5>
                            Now that the model is trained, input some new values to see the expected profits
                            <div className="form-group" style={{ marginRight: '5%', marginLeft: '5%' }}>
                                <label for="rdSpend">Enter R and D Spend</label>
                                <input type="number" step="0.01" className="form-control" id="rdSpend" placeholder="Enter R and D Spend" value={this.state.rdSpend} onChange={this.handleRdSpend} />
                                <br></br>
                            </div>
                            <div className="form-group" style={{ marginRight: '5%', marginLeft: '5%' }}>
                                <label for="admin">Enter Administration Spend</label>
                                <input type="number" step="0.01" className="form-control" id="admin" placeholder="" value={this.state.admin} onChange={this.handleAdminSpend} />
                                <br></br>

                            </div>
                            <div className="form-group" style={{ marginRight: '5%', marginLeft: '5%' }}>
                                <label for="market">Enter Marketing Spend</label>
                                <input type="number" step="0.01" className="form-control" id="market" placeholder="Enter Marketing Spend" value={this.state.marketSpend} onChange={this.handleMarketSpend} />
                                <br></br>
                            </div>
                            <div className="form-group" style={{ marginRight: '5%', marginLeft: '5%' }}>
                                <label for="stateSelect">Select a State</label>
                                <select className="form-control" value={this.state.state} onChange={this.handleState} id="stateSelect">
                                    <option value="New York">New York</option>
                                    <option value="California">California</option>
                                </select>
                            </div>
                            <button className="btn btn-primary" onClick={this.predict}>Predict</button>
                            <div style={{
                                position: 'absolute', left: '50%',top:'50%',
                                transform: 'translate(-50%, -50%)'
                            }}>
                                <Spinner radius={30} color="#ff6f00" visible={this.state.showSpinnerForPrediction} />
                            </div>
                            {this.state.predictedProfit > 0 && <h6 style={{ textAlign: 'center' }}>Predicted Profit: {this.state.predictedProfit}</h6>}
                        </div>
                        }
                        <br></br>
                        {this.state.trainingDone && 
                        <div className="card">
                            <Codeblock
                            language="python"
                            code={this.state.code}
                            />
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
