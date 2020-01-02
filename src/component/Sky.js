import React,{Component} from 'react';
import './sky.css';
import './menu.css';
import Drop from './Drop';
import Menu from './Menu';
import Result from './Result';
import {GAME_HIDE_WORD_EFFECT, GAME_MORE_SPEED_EFFECT,GAME_STOP,GAME_SUCCESS, GAME_FAIL}  from '../GAME_VALUE';
class Sky extends Component {
    constructor(props){
        super(props)
        this.me = React.createRef();
    }

    shouldComponentUpdate(nextProps){
        return this.props.updateCount !== nextProps.updateCount;
    }

    render(){
        var rd = this.props.renderingData;
        // console.log(rd);
        var drops = rd.drops.map((drop,index)=>{
            return <Drop key={index} drop={drop}/>
        });
        const effect={
            style : {
                color : 'red'
            },
            message : ''
        }
        switch(rd.event){
            case GAME_HIDE_WORD_EFFECT:
                effect.message='hide';
                break;
            case GAME_MORE_SPEED_EFFECT:
                effect.message='speed up';
                break;
            default:
                effect.message = 'no';
                effect.style = {
                    color : 'black'
                }
                break;
        }
        var listUI = '';
        if(this.props.mode === GAME_STOP){
            listUI = <Menu tomenu={this.props.tomenu} updateCount ={this.props.updateCount} regame={this.props.regame} mode={this.props.mode}/>;
        }else if(this.props.mode === GAME_SUCCESS || this.props.mode === GAME_FAIL){
            listUI = <Result saveScore={this.props.saveScore} tomenu={this.props.tomenu} updateCount ={this.props.updateCount} regame={this.props.regame} nextgame={this.props.nextgame} mode={this.props.mode} score={rd.score}/>;
        }
        return (
            <div className='Sky' ref={this.me}>
                {listUI}
                <div className='game-info'>score : {rd.score}, health : {rd.health}</div>
                <div className='game-info'style={effect.style}>event : {effect.message}</div>
                <div className='ready'>{rd.ready}</div>
                {drops}
            </div>
        );
    }

}


export default Sky;