import './App.css';
import Appbar from './components/Appbar';
import HomePage from './components/HomePage';
import { SimpleLinearRegression } from './components/regression/SimpleLinearRegression';
import{	BrowserRouter as Router, 
	Route, 
	Link, 
	Switch, 
  HashRouter
} from 'react-router-dom'; 
import Table from './components/Table';

function App() {
  return (
      <div>
        <Appbar />
        <HashRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/simple-linear-regression" component={SimpleLinearRegression} />
        </Switch>
        </HashRouter>
    </div>
  );
}

export default App;
