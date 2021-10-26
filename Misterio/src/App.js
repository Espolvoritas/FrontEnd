import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './components/mainpage';
import CreatingFrom from './components/formcreatingame';
import ListGames from './components/listofgames';
import Lobby from './components/lobby';
import GameBoard from './components/gameboard';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage}></Route>
        <Route exact path="/formcreatingame" component={CreatingFrom}></Route>
        <Route exact path="/lobby" component={Lobby}></Route>
        <Route exact path="/listofgames" component={ListGames}></Route>
        <Route exact path="/gameboard" component={GameBoard}></Route>
      </Switch>
    </Router>
  );
}
export default App;