import './App.css';
import Appbar from './components/Appbar';
import HomePage from './components/HomePage';
import { SimpleLinearRegression } from './components/regression/SimpleLinearRegression';
import{	BrowserRouter as Router, 
	Route, 
	Switch, 
  HashRouter
} from 'react-router-dom'; 
import MultipleLinearRegression from './components/regression/MultipleLinearRegression';
import PolynomialRegression from './components/regression/PolynomialRegression';
import SupportVectorRegression from './components/regression/SupportVectorRegression';
 

function App() {
  return (
      <div>
        <Appbar />
        <HashRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/simple-linear-regression" component={SimpleLinearRegression} />
          <Route exact path="/multiple-linear-regression" component={MultipleLinearRegression} />
          <Route exact path="/polynomial-regression" component={PolynomialRegression} />
          <Route exact path="/support-vector-regression" component={SupportVectorRegression} />
        </Switch>
        </HashRouter>
    </div>
  );
}

export default App;
