import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './components/mainpage';
import CreatingFrom from './components/formcreatingame';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage}></Route>
        <Route exact path="/formcreatingame" component={CreatingFrom}></Route>
      </Switch>
    </Router>
  );
}
export default App;