export default class Timer {
    constructor(deltaTime = 1/60) {
        let accumulatedTime = 0;
        let lastTime = 0;
        this.requestId = undefined;
        this.stoped = false;
        this.updateProxy = (time) => {
            console.log(1);
            
            accumulatedTime += (time - lastTime) / 1000;

            if (accumulatedTime > 1) {
                accumulatedTime = 1;
            }

            while (accumulatedTime > deltaTime) {
                this.update(deltaTime);
                accumulatedTime -= deltaTime;
            }
            
            lastTime = time;

            this.enqueue();
        }
    }

    enqueue() {
        if(!this.stoped){
            this.requestId = window.requestAnimationFrame(this.updateProxy);
        }
    }

    start() {
        this.enqueue();
    }
    stop(){
        if(this.requestId){
            console.log(2);
            window.cancelAnimationFrame(this.requestId);
            this.requestId = undefined;
            this.stoped = true;
        }
    }
}
