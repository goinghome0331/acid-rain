import React,{Component} from 'react';
import Carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button'
class Intro extends Component {

    render(){
        const style={
            width : '1280px',
            height : '815px'
        }
        
        return (
            
            <Carousel >
                <Carousel.Item>
                    <img
                        className="d-block"
                        style={style}
                        src="/img/Lighthouse.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h1>타자 연습을 위한 산성비 게임입니다.</h1>
                        <Button variant="primary" size="lg" onClick={
                            (e)=>{
                                this.props.history.push({
                                    pathname : '/acid-rain',
                                });
                            }}>
                            시작하기
                        </Button> 
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block"
                        style={style}
                        src="/img/Tulips.jpg"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h1>타자 연습을 위한 산성비 게임입니다.</h1>
                        <Button variant="primary" size="lg" onClick={
                        (e)=>{
                            this.props.history.push({
                                pathname : '/score-list',
                            });
                        }
                        }>
                            기록보기
                        </Button>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        )
        // return (
        //     <div>
        //         <button onClick={
        //             (e)=>{
        //                 this.props.history.push({
        //                     pathname : '/acid-rain',
        //                 });
        //             }
        //         }>시작</button>
        //         <button onClick={
        //             (e)=>{
        //                 this.props.history.push({
        //                     pathname : '/score-list',
        //                 });
        //             }
        //         }>점수표</button>
        //     </div>
        // );
    }

}


export default Intro;