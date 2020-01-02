import React,{Component} from 'react';
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import {GAME_SCORES} from '../GAME_VALUE';
class ScoreList extends Component {
    constructor(props){
        super(props);
        var data = JSON.parse(localStorage.getItem(GAME_SCORES));
        this.state = {
            list :  data === null ? null : data.scores
        }
    }
    render(){
        console.log(this.state.list);
        var rs;
        if(this.state.list === null) {
            rs = <td colSpan='3'><h3 style={{color:'red'}}>등록된 점수가 없습니다.</h3></td>
        }else{
            rs = this.state.list.map((info,index)=>{
                return (<tr key={index}>
                            <td>{index+1}</td>
                            <td>{info.username}</td>
                            <td>{info.score}</td>
                        </tr>);
            });
        }
        
        return (
            <Card>
                <Card.Header>
                    <h1>
                        점수 기록
                        <Button className='float-right' variant="outline-success" size="lg" onClick={
                            (e) => {
                                this.props.history.push({
                                    pathname: '/',
                                });
                            }
                        }>홈으로</Button>    
                        <Button className='float-right' variant="outline-primary" size="lg" onClick={
                            (e) => {
                                localStorage.removeItem(GAME_SCORES);
                                this.setState({
                                    list: null
                                })

                            }                
                        }>초기화</Button>
                    </h1>
                    
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <th>순위</th>
                            <th>유저명</th>
                            <th>점수</th>
                        </thead>
                        <tbody>
                            {rs}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            // <div>
            //     <button onClick={
            //         (e)=>{
            //             this.props.history.push({
            //                 pathname : '/',
            //             });
            //         }
            //     }>홈으로</button>
            //     <button onClick={
            //         (e)=>{
            //             localStorage.removeItem(GAME_SCORES);
            //             this.setState({
            //                 list : null
            //             })
                        
            //         }
            //     }>초기화</button>
            //     <ul>
            //         {rs}
            //     </ul>
            // </div>
        )
    }
}

export default ScoreList;