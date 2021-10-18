import './App.css';
import MainPage from './components/mainpage';
import CreatingFrom from './components/formcreatingame';
import ListGames from './components/listofgames';
import  { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage}></Route>
        <Route exact path="/formcreatingame" component={CreatingFrom}></Route>
        <Route exact path="/listofgames" component={ListGames}></Route>
      </Switch>
    </Router>
  );
}
export default App;