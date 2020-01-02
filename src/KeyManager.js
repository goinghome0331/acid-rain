class KeyManager {
    constructor(){
        this.length = 256;
        this.keys = [];
        this.cantPress = [];
        this.justPress = [];


        document.body.addEventListener('keydown',(e)=>{
            this.keys[e.keyCode || e.charCode || 0] = true;
        });

        document.body.addEventListener('keyup',(e)=>{
            this.keys[e.keyCode || e.charCode || 0] = false;
        });
    }
    update(){
        for(var i =0 ; i < this.length; i++) {
			if(this.cantPress[i] && !this.keys[i]) {
				this.cantPress[i] = false;
				this.justPress[i] = false;
			}else if(this.justPress[i]) {
				this.cantPress[i] = true;
				this.justPress[i] = false;
			}else if(!this.cantPress[i] && this.keys[i]) {
				this.justPress[i] = true;
			}
		}
    }
    justPressed(keyCode){
        return this.justPress[keyCode];
    }
}


export default new KeyManager();