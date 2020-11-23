import React, { Component } from 'react'
import '../../css/Homepage.css'
import axios from 'axios'
import Table from '../Table'
import ImageCard from '../ImageCard'
import Spinner from 'react-spinner-material'
import Codeblock from '../Codeblock'



export default class PolynomialRegression extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             trainingData:[],
             baseUrl:'https://ml-visualizer-services.herokuapp.com/regression/poly/',
             columns : ["Level","Position","Salary"],
             degree : 2,
             showSpinnerForTrain : false,
             trainingDone: false,
             showSpinnerForPredict : false,
             level : 0,
             predictedSalary: 0,
             code :`
             from sklearn.linear_model import LinearRegression
             from sklearn.preprocessing import PolynomialFeatures
             dataset: pd.DataFrame = pd.read_csv("Position_Salaries.csv")
             x = dataset.iloc[:, :-1].values
             y = dataset.iloc[:, -1].values
             x = x[:, 1:]
             polynomial_features = PolynomialFeatures(degree=degree)
             x_poly = polynomial_features.fit_transform(x)
             poly_reg.fit(x_poly, y)
             y_pred_poly = poly_reg.predict(x_poly)
             `
        }
    }
    
    componentDidMount(){
        axios.get(this.state.baseUrl+"trainingdata").then((response) => {
           this.constructTrainingData(response.data)
        })
    }

    constructTrainingData(response){
        console.log(response)
        let rowValues = [];
        let row = []
        for(let i=0;i<response.Level.length;i++){
            row.push(response.Level[i]);
            row.push(response.Position[i]);
            row.push(response.Salary[i]);
            rowValues.push(row);
            row = [];
        }
        this.setState({
            trainingData: rowValues
        });    
    }

    handleDegree = (event) => {
        this.setState({
            degree: event.target.value
        })
    }

    train = () => {
        this.setState({
            showSpinnerForTrain : true,
            trainingDone : false
        },() => {
            let body = {
                "degree":+this.state.degree
            }
            axios.post(this.state.baseUrl+"train",body).then((response) => {
                if(response.data.status === "Success"){
                   this.setState({
                       showSpinnerForTrain: false,
                       trainingDone: true
                   })
                }
            })
        })
    }


    handleLevel = (event) => {
        this.setState({
            level : event.target.value
        })
    }

    predict = () => {
        this.setState({
            showSpinnerForPredict : true,
            predictedSalary :0
        }, () => {
            axios.post(this.state.baseUrl+"predict",{
                "level":+this.state.level,
                "degree":+this.state.degree
            }).then((response) => {
                this.setState({
                    showSpinnerForPredict : false,
                    predictedSalary : response.data.predictedSalary
                })
            })
        })
    }

    render() {
        return (
            <div className="container-fluid">
               <div className="card" style={{textAlign:'center',marginTop:'1%'}}>
                   <h4 className="card-title">Polynomial Regression</h4>
                   <div className="card-body card-body-text">
                   Simple and Multiple Linear Regressions work very well when it comes to linear data. But when data follows a non-linear fashion,
                    Polynomial Regression can be used to model such data. 
                    The model can be represented by y = a + bx1 + cx2^2 + dx3^3 + .... + nxn^n, where n is the degree of the polynomial. For degree = 1 the distribution becomes linear.
                   </div>
               </div>
               <hr></hr>
               <div className="row" style={{textAlign:'center'}}>
                <div className="col-md-4">
                    <div className="card" style={{overflow:'scroll',height:'500px'}}>
                        <h6 className="card-title">Training data</h6>
                        <div className="card-body card-body-text">
                        We have different positions and their levels with the respective salaries for that particular level. Using this data we would like to predict newer salaries for different levels
                       <br></br> <a role="button" href={"https://raw.githubusercontent.com/dhruva30/ml-visualiser-assets/main/Position_Salaries.csv"} target="_blank" className="btn btn-primary">Download</a>
                       <div style={{
                        position: 'absolute', left: '50%', top: '30%',
                        transform: 'translate(-50%, -50%)'
                    }}>
                        <Spinner radius={30} color="#ff6f00" visible={this.state.trainingData.length === 0} />
                    </div>
                {this.state.trainingData.length > 0 && <Table columns={this.state.columns} data={this.state.trainingData} /> }
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <h6 className="card-title">Train the Model</h6>
                        <div className="card-body card-body-text">
                            Input a degree for the polynomial and click on the button to train the model.
                            <div className="form-group" style={{ marginRight: '5%', marginLeft: '5%' }}>
                                <label for="degree">Enter a Degree</label>
                                <input type="number" step="1" className="form-control" id="degree" placeholder="Enter Degree" value={this.state.degree} onChange={this.handleDegree} />
                                <br></br>
                            </div>
                            <button className="btn btn-primary" onClick={this.train}>Train</button>
                        </div>
                    </div>
                     <div style={{
                        position: 'absolute', left: '50%', top: '30%',
                        transform: 'translate(-50%, -50%)'
                    }}>
                        <Spinner radius={30} color="#ff6f00" visible={this.state.showSpinnerForTrain} />
                    </div>
                    <br></br>
                    {this.state.trainingDone &&
                    <div className="card">
                        <ImageCard
                            title="Training Result"
                            description="As you can see, the data follows a non linear fashion and the model tries to fit a polynomial through it. Try changing the degree and see the result"
                            imageUrl = {this.state.baseUrl+"result"}
                            />
                    </div>
    }
                </div>
                {this.state.trainingDone && <div className="col-md-4">
                    <div className="card" style={{textAlign:'center'}}>
                        <h6>Predict New Salaries</h6>
                        <div className="card-body card-body-text">
                            Enter a new level to see the predicted Salary
                            <div className="form-group" style={{ marginRight: '5%', marginLeft: '5%' }}>
                                <input type="number" step="0.01" className="form-control" id="level" placeholder="Enter Level" value={this.state.level} onChange={this.handleLevel} />
                                <br></br>
                            </div>
                            <button className="btn btn-primary" onClick={this.predict}>Predict</button>
                            <hr>
                            </hr>
                            <div style={{
                        position: 'absolute', left: '50%', top: '30%',
                        transform: 'translate(-50%, -50%)'
                    }}>
                        <Spinner radius={30} color="#ff6f00" visible={this.state.showSpinnerForPredict} />
                    </div>
                   {this.state.predictedSalary > 0 && <span> Predicted Salary : {this.state.predictedSalary}</span>}
                        </div>
                    </div>
                    <div className="card">
                    <Codeblock
                            language="python"
                            code={this.state.code}
                            />
                        </div>
                </div>
                }
               </div>
            </div>
        )
    }
}
