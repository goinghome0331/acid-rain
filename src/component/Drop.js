import React,{Component} from 'react';
import './drop.css';
class Drop extends Component {

    render(){
        const style={
            top : this.props.drop.top,
            left : this.props.drop.left,
            color : this.props.drop.item === true ? 'blue' : 'black',
            
        }
        var word = this.props.drop.word;
        if(this.props.drop.effect === 'hidden'){
            word = '';
        }
        // console.log(this.props.word,this.props.item);
        return (
            <div className='Drop' style={style}>
                <div className='drop-img'>
                    {word}
                </div>
            </div>
        );
    }
}

export default Drop;