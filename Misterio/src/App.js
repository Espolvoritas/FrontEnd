import './App.css';
import MainPage from './components/mainpage';
import CreatingFrom from './components/formcreatingame';
import  { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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