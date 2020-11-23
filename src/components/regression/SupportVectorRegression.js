import React, { Component } from 'react'
import '../../css/Homepage.css'
import axios from 'axios'
import Table from '../Table'
import ImageCard from '../ImageCard'
import Spinner from 'react-spinner-material'
import Codeblock from '../Codeblock'



export default class SupportVectorRegression extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
             trainingData: [],
             baseUrl :'https://ml-visualizer-services.herokuapp.com/regression/svr/',
             baseUrlForTrain :'https://ml-visualizer-services.herokuapp.com/regression/poly/',
             columns : ["Level","Position","Salary"],
             kernel: 'rbf',
             showSpinnerForTrain : false,
             showSpinnerForPredict : false,
             trainingDone : false,
             level : 0,
             code : `
             from sklearn.svm import SVR
             dataset: pd.DataFrame = pd.read_csv("training_data/Position_Salaries.csv")
             scaler = StandardScaler()
             scaler_y = StandardScaler()
             x = dataset.iloc[:, :-1].values
             y = dataset.iloc[:, -1].values
             x = x[:, 1:]
             regressor = SVR(kernel=kernel)
            x = scaler.fit_transform(x)
            y = scaler_y.fit_transform(y)
            regressor.fit(x, y)
            y_pred = regressor.predict(x)
             `
        }
    }
    
    componentDidMount(){
        axios.get(this.state.baseUrlForTrain+"trainingdata").then((response) => {
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

    handleKernel = (event) => {
        this.setState({
            kernel:event.target.value
        })
    }

    handleLevel = (event) => {
        this.setState({
            level:event.target.value
        })
    }

    train = () => {
        this.setState({
            showSpinnerForTrain:true,
            trainingDone: false
        },() => {
            axios.post(this.state.baseUrl+"train",{
                "kernel":this.state.kernel
            }).then((response) => {
                    if(response.data.status === "Success"){
                        this.setState({
                            trainingDone: true,
                            showSpinnerForTrain : false
                        })
                    }
            })
        })
       
    }

    predict = () => {
        this.setState({
            showSpinnerForPredict : true,
            predictedSalary :0
        }, () => {
            axios.post(this.state.baseUrl+"predict",{
                "level":+this.state.level
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
                   <h4 className="card-title">Support Vector Regression</h4>
                   <div className="card-body card-body-text">
                   Support Vector Regression uses Support Vector Machines (SVM) to perform regression. We can model both linear as well as non linear models with SVR
                   </div>
               </div>
               <hr></hr>
               <div className="row">
                <div className="col-md-4" style={{textAlign:'center'}}>
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
                <div className="col-md-4" style={{textAlign:'center'}}>
                    <div className="card card-body-text">
                        <h6>Train the Model</h6>
                       <div className="card-body">
                           Select a kernel and click on the button to train the model
                       <div className="form-group" style={{ marginRight: '5%', marginLeft: '5%' }}>
                                <select className="form-control" value={this.state.kernel} onChange={this.handleKernel} id="kernel-select">
                                    <option value="linear">Linear</option>
                                    <option value="rbf">RBF</option>
                                    <option value="poly">Polynomial</option>
                                    <option value="sigmoid">Sigmoid</option>
                                </select>
                            </div>
                            <button className="btn btn-primary" onClick={this.train}>Train</button>
                       </div>
                       <div style={{
                        position: 'absolute', left: '50%', top: '30%',
                        transform: 'translate(-50%, -50%)'
                    }}>
                        <Spinner radius={30} color="#ff6f00" visible={this.state.showSpinnerForTrain} />
                    </div>
                    </div>
                    <br>
                    </br>
                    {this.state.trainingDone && <div className="card">
                    <ImageCard
                            title="Training Result"
                            description="As you can see, the data follows a non linear fashion and the model tries to fit a curve with respect to the kernel. Try changing the kernel and see the result"
                            imageUrl = {this.state.baseUrl+"result"}
                            />
                        </div>}
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
                    <br></br>
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
