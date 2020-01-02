import React,{Component} from 'react';
import Ground from './Ground';
import Sky from './Sky';
import {connect} from 'react-redux';
import { loadLevel } from '../loaders';
import {addDrop,updateDrops,checkDrops,changeMode, storeHealthAndScore,effectDrops,reset} from '../Reducer';
import KeyManager from '../KeyManager';
import {GAME_WIDTH,GAME_HEIGHT,GAME_READY,GAME_RUNNING,GAME_STOP,GAME_SUCCESS,GAME_FAIL,GAME_LEVEL,FRAME_FOR_MILISEC,GAME_LEVEL_LIMIT,GAME_WORD_TIMING,GAME_NO_EFFECT,GAME_SCORES}  from '../GAME_VALUE';
import Timer from './Timer';

class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
          updateCount : 0,
          out : false
        };
        this.eventCount = 0;
        this.renderingData = {
            ready : '',
            score : '',
            health : '',
            event : '',
            drops : [],
        };
        this.update = this.update.bind(this);
        this.gameReady = this.gameReady.bind(this);
        this.gameUpdate = this.gameUpdate.bind(this);
        this.startGame = this.startGame.bind(this);
        this.tomenu = this.tomenu.bind(this);
        this.regame = this.regame.bind(this);
        this.saveScore = this.saveScore.bind(this);


        var level = sessionStorage.getItem(GAME_LEVEL) === null ? {num : 1, score : this.props.score, health : this.props.health} : JSON.parse(sessionStorage.getItem(GAME_LEVEL));
        sessionStorage.setItem(GAME_LEVEL,JSON.stringify(level));
        this.timer = new Timer(FRAME_FOR_MILISEC);
        this.timer.update = this.update;
        this.startGame(level);
    }
    startGame(level){
        
        loadLevel(`/levels/${level.num}.json`,this.props.dispatch)
        .then(()=>{
            
            this.props.dispatch(storeHealthAndScore(level.health,level.score));
            this.eventCount = 0;
            this.timer.start();
        })
    }
    regame(){
        this.startGame(JSON.parse(sessionStorage.getItem(GAME_LEVEL)));
    }
    nextgame(){
        var level = JSON.parse(sessionStorage.getItem(GAME_LEVEL));
        var _num = parseInt(level.num);
        if(_num >= GAME_LEVEL_LIMIT){
            alert('더 이상 레벨은 없습니다.');
            return ;
        }
        sessionStorage.setItem(GAME_LEVEL, JSON.stringify(Object.assign({},level,{num : _num+1,score:this.props.score,health:this.props.health})));
        this.startGame(JSON.parse(sessionStorage.getItem(GAME_LEVEL)));
    }
    tomenu(){
        this.setState({
            out : true
        });
    }
    saveScore(){
        if(window.confirm('저장하시겠습니까?')){
            var username = window.prompt('등록할 이름을 입력하세요');
            if(username !== null){
                var data = JSON.parse(localStorage.getItem(GAME_SCORES));
                if(data === null){
                    data = {
                        scores : [
                            {
                                username : username,
                                score : this.props.score
                            }
                        ]
                    }
                    localStorage.setItem(GAME_SCORES,JSON.stringify(data));
                }else{
                    var new_scores = data.scores.concat({username : username,score : this.props.score});
                    new_scores.sort((a,b)=>{
                        return b.score - a.score;
                    });

                    localStorage.setItem(GAME_SCORES,JSON.stringify(Object.assign({},data,{scores : new_scores})));;
                }
                alert('저장이 완료되었습니다.');
            }
        }
    }
    update(){
        this.gameUpdate();
        if(this.props.mode === GAME_STOP || this.props.mode === GAME_SUCCESS || this.props.mode === GAME_FAIL) return ;
        if(this.props.mode === GAME_READY) this.gameReady();
        if(this.props.mode === GAME_RUNNING) this.gameRunning();  
    }
    
    render(){
        const style = {
            width: GAME_WIDTH,
            height: GAME_HEIGHT
        }
        
        return (
            <div style={style}>
                <Sky saveScore={this.saveScore} 
                     tomenu={function(e){
                        this.tomenu();
                     }.bind(this)}
                     regame = {this.regame}
                     nextgame={(e)=>{
                        this.nextgame();
                     }}mode = {this.props.mode} updateCount={this.state.updateCount} renderingData={this.renderingData}></Sky>
                <Ground></Ground>
            </div>
        );
    }
    
    gameReady(){
        
        this.eventCount++;
        if(this.eventCount >= 1){
            this.renderingData = Object.assign({},this.renderingData,{ready:'Ready~~~'});
        }
        if(this.eventCount >= 150){
            this.renderingData = Object.assign({},this.renderingData,{ready:'Go!!!'});
        }
        if(this.eventCount >= 200){
            this.eventCount = 0;
            this.renderingData = Object.assign({},this.renderingData,{ready:''});
            this.props.dispatch(changeMode(GAME_RUNNING));
        }

    }
    gameRunning(){
        this.eventCount++;
        if(this.props.effect !== GAME_NO_EFFECT){
            this.props.dispatch(effectDrops());
        }
        this.props.dispatch(checkDrops());
        if(this.eventCount % GAME_WORD_TIMING === 0){
            this.props.dispatch(addDrop());
        }
        
        this.props.dispatch(updateDrops());
    }
    gameUpdate(){
        if(this.state.out){
            this.setState({
                out : false
            })
            sessionStorage.removeItem(GAME_LEVEL);
            this.timer.stop();
            this.props.dispatch(reset());
            this.props.history.push('/');
            
        }else{
            if (KeyManager.justPressed(27)) {
                if (this.props.mode !== GAME_READY && this.props.mode !== GAME_SUCCESS && this.props.mode !== GAME_FAIL) {
                    this.props.dispatch(changeMode(this.props.mode === GAME_RUNNING ? GAME_STOP : GAME_RUNNING));
                }
            }
            KeyManager.update();
            this.renderingData = Object.assign({}, this.renderingData, { score: this.props.score, health: this.props.health, drops: this.props.drops, event: this.props.effect });
            this.setState({
                updateCount: this.state.updateCount + 1
            });
        }
    }
}
let mapStateToProps = (state)=>{
    return {
        mode : state.mode,
        effect : state.effect,
        drops : state.drops,
        score : state.score,
        health : state.health
    };
}

export default connect(mapStateToProps)(Game);