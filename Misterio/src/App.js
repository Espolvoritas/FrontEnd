import './App.css';
import MainPage from './components/mainpage';
import CreatingFrom from './components/formcreatingame';
import Lobby from './components/lobby';
import GameBoard from './components/gameboard.js'
import  { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage}></Route>
        <Route exact path="/formcreatingame" component={CreatingFrom}></Route>
        <Route exact path="/lobby" component={Lobby}></Route>
        <Route exact path="/gameboard" component={GameBoard}></Route>
      </Switch>
    </Router>
  );
}
export default App;