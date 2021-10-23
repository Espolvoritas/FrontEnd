import './App.css';
import MainPage from './components/mainpage';
import ListGames from './components/listofgames';
import Lobby from './components/lobby';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage}></Route>
        <Route exact path="/listofgames" component={ListGames}></Route>
        <Route exact path="/lobby" component={Lobby}></Route>
      </Switch>
    </Router>
  );
}

export default App;

/*
import CreatingFrom from './components/formcreatingame';
<Route exact path="/formcreatingame" component={CreatingFrom}></Route>
*/