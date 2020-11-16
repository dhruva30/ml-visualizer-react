import React, { Component } from 'react'
import Table from '../Table';
import axios from 'axios';
import '../../css/Homepage.css'
import Spinner from 'react-spinner-material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
export class SimpleLinearRegression extends Component {

    constructor(props) {
        super(props)

        this.state = {
            trainingData: [],
            baseUrl: 'https://ml-visualizer-services.herokuapp.com',
            columns: ["Years of Experience", "Salary"],
            rowValues: [],
            trainingDone: false,
            yearToPredict: 0,
            predictedSalary: 0,
            showSpinner : false,
            showSpinnerForPredict : false,
            code:`
            dataset: pd.DataFrame = pd.read_csv("Salary_Data.csv")
            x = dataset.iloc[:, :-1].values
            y = dataset.iloc[:, -1].values
            x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2)
            from sklearn.linear_model import LinearRegression
            linearRegression = LinearRegression()
            linearRegression.fit(x_train, y_train)
            y_pred = linearRegression.predict(x_test)
            `
        }
    }

    componentDidMount() {
        axios.get(this.state.baseUrl + "/regression/simple/trainingdata")
            .then((response) => {
                this.setState({
                    trainingData: response.data.data
                })
                this.constructTableData();
            })
    }

    constructTableData = () => {
        let row = []
        let values = []
        for (let i = 0; i < this.state.trainingData.length; i++) {
            row.push(this.state.trainingData[i]["years"])
            row.push(this.state.trainingData[i]["salary"])
            values.push(row);
            row = []
        }
        this.setState({
            rowValues: values
        })
    }

    train = () => {
        this.setState({
            showSpinner: true
        })
        axios.get(this.state.baseUrl + "/regression/simple/train")
            .then((response) => {
                if (response.data.status === "Success") {
                    this.setState({
                        trainingDone: true,
                        showSpinner: false
                    })
                }
            })
    }

    yearToPredictHandler = (event) => {
        this.setState({
            yearToPredict: event.target.value
        })
    }

    predict = () => {
        this.setState({
            predictedSalary: 0,
            showSpinnerForPredict: true
        }, () => {
            axios.post(this.state.baseUrl + "/regression/simple/predict", {
                "year": this.state.yearToPredict
            })
                .then((response) => {
                    this.setState({
                        predictedSalary: response.data.predictedSalary,
                        showSpinnerForPredict: false
                    })
                })
        })

    }

    render() {
        return (
            <div className="container-fluid">
                <div className="card" style={{textAlign:'center',marginTop:'1%'}}>
                    <h3 className="card-title">Simple Linear Regression</h3>
                    <div className="card-body card-body-text">
                        Simple Linear Regression is the simplest of all ML algorithms. In this model we have a dependant variable which depends only on one
                        independent variable or feature. This model is used to predict continuous data which follow a linear distribution. The model can be represented by
                        y = ax + b
                    </div>
                </div>
                <hr></hr>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card" style={{ overflow: 'scroll', height: '500px' }}>
                            <h5 className="card-title" style={{ textAlign: 'center' }}>
                                Training Data
                            </h5>
                            <div style={{
                                position: 'absolute', left: '50%', top: '50%',
                                transform: 'translate(-50%, -50%)'
                            }}>
                                <Spinner radius={30} color="#ff6f00" visible={this.state.trainingData.length == 0} />
                            </div>
                            {this.state.trainingData.length > 0 &&
                                <div className="card-body">
                                    <h6>We have years of Experience versus the salary you get for that many years of experience. Lets train the model on this
                                    data and try to predict future salaries
                            </h6>
                                    <Table columns={this.state.columns} data={this.state.rowValues} />
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card" style={{ textAlign: 'center' }}>
                            <h6 className="card-title">Train the model</h6>
                            <div className="card-body">
                                Upon clicking on this button, the Simple Linear Regression model will be trained with the training data
                                <br></br>
                                <button className="btn btn-primary" onClick={this.train}>Train</button>
                                <div style={{
                                    position: 'absolute', left: '50%',top:'90%',
                                    transform: 'translate(-50%, -50%)'
                                }}>
                                    <Spinner radius={30} color="#ff6f00" visible={this.state.showSpinner} />
                                </div>
                            </div>
                        </div>
                        <br></br>
                        {this.state.trainingDone && <div className="card" style={{ textAlign: 'center' }}>
                            <h5 className="card-title">Training result</h5>
                            <span className="card-body-text">
                                As you can see, the Simple Linear Regression model tries to fit a straight line through the given
                            </span>
                            <img src={this.state.baseUrl + "/regression/simple/result"} alt="training_result" height="400px" />
                        </div>
                        }
                    </div>
                    {this.state.trainingDone && <div className="col-md-4">
                        <div className="card" style={{ textAlign: 'center' }}>
                            <h6 className="card-title">Predicting New Salaries</h6>
                            <div className="card-body">
                                <div class="form-group">
                                    <label for="year">Enter a Year of Experience</label>
                                    <input type="number" step="0.01" class="form-control" id="year" placeholder="Enter a year" value={this.state.yearToPredict} onChange={this.yearToPredictHandler} />
                                    <br></br>
                                    <button className="btn btn-primary" onClick={this.predict}>Predict</button>
                                </div>
                            </div>
                            <hr></hr>
                            <div style={{
                                position: 'absolute', left: '50%',top:'80%',
                                transform: 'translate(-50%, -50%)'
                            }}>
                                <Spinner radius={30} color="#ff6f00" visible={this.state.showSpinnerForPredict} />
                            </div>
                            {this.state.predictedSalary > 0 && <h6 style={{ textAlign: 'center' }}>Predicted Salary: {this.state.predictedSalary}</h6>}
                        </div>
                        <br></br>
                        <div className="card">
                            <h6 className="card-title" style={{textAlign:'center'}}>Code</h6>
                            <SyntaxHighlighter language="python" style={dracula}>
                              {this.state.code}
                            </SyntaxHighlighter>
                            </div>
                    </div>
                    }
                </div>
            </div>
        )
    }
}

export default SimpleLinearRegression
