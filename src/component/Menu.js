import React from 'react';
import ListUIComponent from './ListUIComponent';
import KeyManager from '../KeyManager';
import { connect } from 'react-redux';
import {changeMode} from '../Reducer';
import {GAME_RUNNING}  from '../GAME_VALUE';
class Menu extends ListUIComponent {

    constructor(props){
        super(props);
        this.options = ['계속하기','다시 시작하기','그만하기'];
        this.length = this.options.length;
    }
    shouldComponentUpdate(nextProps){
        return this.props.updateCount !== nextProps.updateCount;
    }
    onClick(){        
        if(this.index === 0){
            this.props.dispatch(changeMode(GAME_RUNNING));
        }else if(this.index === 1){
            this.props.regame();
        }else if(this.index === 2){
            this.props.tomenu();
        }
    }
    render(){
        if(KeyManager.justPressed(13)){
            this.onClick();
        }
        var ro = this.options.map((option,_index)=>{
            if(this.index === _index){
                var style = {
                    color : 'red',
                    cursor : 'pointer'
                };
                return <div className='item' id={_index} key={_index} style={style}>{option}</div>
            }else{
                return <div className='item' id={_index} key={_index}>{option}</div>
            }
            
        });

        return (
            <div className='Menu'>
                {ro}
            </div>
        );
    }
}

export default connect()(Menu);