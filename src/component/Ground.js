import React,{Component} from 'react';
import './ground.css';
import Input from './Input'
class Ground extends Component {


    shouldComponentUpdate(nextProps){
        return false;
    }
    render(){
        return (
            <div className='Ground'>
                <Input></Input>
            </div>
        );
    }
}

export default Ground;