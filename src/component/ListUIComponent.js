import {Component} from 'react';
import KeyManager from '../KeyManager';
class ListUIComponent extends Component {

    constructor(props){
        super(props);
        this.index = 0;
        this.length = 0;
        this.register = false;
        this.onClick = this.onClick.bind(this);
        this.setIndex = this.setIndex.bind(this);
    }
    onClick(){}
    setIndex(e){
        this.index = parseInt(e.target.id);
    }
    componentDidUpdate(){
        
        
        if (!this.register) {
            var items = document.getElementsByClassName('item');
            for (var i = 0; i < items.length; i++) {

                items[i].addEventListener('mouseover', this.setIndex);

                items[i].addEventListener('click', this.onClick);
            }
            this.register = true;
        } 

        if(KeyManager.justPressed(37) || KeyManager.justPressed(38)){
            this.index = this.index - 1 < 0 ? this.length - 1 : this.index - 1;
        }

        if(KeyManager.justPressed(39) || KeyManager.justPressed(40)){
            this.index = this.index + 1 === this.length ? 0 : this.index + 1;
        }
    }
    
}

export default ListUIComponent;