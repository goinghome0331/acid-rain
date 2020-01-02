import React,{Component} from 'react';
import { connect } from 'react-redux';
import {contentInput} from '../Reducer';
import './input.css'
class Input extends Component {
    constructor(props){
        super(props);
        this.state={
            input : ''
        }        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    handleKeyPress(e){
        if(e.key === 'Enter'){
            this.props.dispatch(contentInput(this.state.input));
            this.setState({
                input : ''
            })
        }
    }
    handleInputChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    render(){
        return (
            <input className='input-style' name='input' onKeyPress={this.handleKeyPress} value={this.state.input} onChange={this.handleInputChange}/>
        );
    }
}

export default connect()(Input);