import React from 'react';
import ListUIComponent from './ListUIComponent';
import KeyManager from '../KeyManager';
import {GAME_SUCCESS,GAME_FAIL} from '../GAME_VALUE';

class Result extends ListUIComponent{
    constructor(props){
        super(props);
        this.options1 = ['다음 단계','메뉴','기록 저장'];
        this.options2 = ['다시 하기','메뉴','기록 저장'];
        this.renderMenuItem = this.renderMenuItem.bind(this);        
    }
    shouldComponentUpdate(nextProps){
        return this.props.updateCount !== nextProps.updateCount;
    }

    renderMenuItem(option,_index){
        if (this.index === _index) {
            var style = {
                color : 'red',
                cursor : 'pointer'
            };
            return <div className='item result-item' id={_index} key={_index} style={style}>{option}</div>
        } else {
            return <div className='item result-item' id={_index} key={_index}>{option}</div>
        }
    }
    onClick(){
        if(this.index === 0){
            if(this.props.mode === GAME_SUCCESS){
                this.props.nextgame();
            }else{
                this.props.regame();
            }
        }else if(this.index === 1){
            this.props.tomenu();
        }else if(this.index === 2){
            this.props.saveScore();
        }
    }
    render(){
        if(this.props.mode !== GAME_SUCCESS && this.props.mode !== GAME_FAIL) {
            this.index = 0;
            return '';
        }
        var result = {
            style : {
                color : ''
            },
            message : ''
        };
        var ro;
        if(this.props.mode === GAME_SUCCESS){
            result.style = {color:'green'};
            result.message = 'Clear!!!';
            ro = this.options1.map(this.renderMenuItem);
            this.length = this.options1.length;
        }else{
            result.style = {color:'red'};
            result.message = 'Fail...';
            ro = this.options2.map(this.renderMenuItem);
            this.length = this.options2.length;
        }


        if(KeyManager.justPressed(13)){
            this.onClick();
        }

        return (
            <div className='Result'>
                <div className='mention' style={result.style}>{result.message}</div>
                <div className='score'>점수 : {this.props.score}</div>
                {ro}
            </div>
        )
    }
}
export default Result;