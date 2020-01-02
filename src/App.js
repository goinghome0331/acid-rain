import React,{Component} from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Game from './component/Game';
import Intro from './component/Intro';
import ScoreList from './component/ScoreList';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component{
  render(){
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Intro}/>
          <Route path='/acid-rain' component={Game}/>
          <Route path='/score-list' component={ScoreList}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
