import React from 'react';
import './App.css';

class Chess extends React.Component {   
  render(){
    if (this.props.value === 'B') {
      return <div className="chess black"></div>
    } else if (this.props.value === 'W') {
      return <div className="chess white"></div>
    } else {
      return  <div></div>
    }
  }
}

class Square extends React.Component {
  render() {
    return (
      <div className="square_bg">
        <button className="square block"  onClick={this.props.onClick}>
          <Chess value={this.props.value}/>
        </button>
      </div>
    );
  }
}

class Gomoku extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(19*19).fill(null),
      stepNumber: 0,
      blackIsNext: false,
      winner: false,
      times: 0,
      record:[]
    };
    /* state 狀態變化
    squares：盤面狀態 handleClick(i) 後改變，handleStart() 還原
    stepNumber：handleClick(i) 後加一，handleStart() 還原
    blackIsNext: handleClick(i) 後改變，handleStart() 還原
    winner: handleClick後改為 checkwinner()，handleStart 還原
    times: handleStart() 後加一
    record: checkwinner() 輸贏出現後寫入，或 handleStart()後寫入
    */
    this.handleStart = this.handleStart.bind(this);
    this.showRecord = this.showRecord.bind(this);
  }

  renderSquare(type){
    const box = this.state.squares.map(
      (squares, index) =>
      <Square type={type} key={index} value={this.state.squares[index]}   
              onClick={()=>this.handleClick(index)}  
      />
    );
    return box
  }
  renderBoard(){
    const block = Array(18*18).fill(null).map(
      (squares, index) =>
      <div className="board_bg" key={index}>
        <div className="board block"></div> 
      </div>
    
    );
    return block
  }

  handleClick(i){
    const current = this.state.squares.slice();//copy現在state的狀態
    const stepNumber = this.state.stepNumber + 1
    if (current[i] || this.state.winner) {//避免重複落子、勝後落子
      return
    }
    current[i] = this.state.blackIsNext ? 'W' : 'B';
    this.setState({
      squares: current,
      stepNumber: stepNumber,
      blackIsNext: !this.state.blackIsNext,
      winner: this.checkWinner(current)
    })
  }

  checkWinner(current){
    const winlines = [] //計算勝利組合
    for (let i = 0; i < 19*19; i++) {
      winlines.push([i, i+1, i+2, i+3, i+4])    //橫的
      winlines.push([i, i+19, i+38, i+57, i+76])//直的
      winlines.push([i, i+20, i+40, i+60, i+80])//斜率 1 or -1
      winlines.push([i, i+18, i+36, i+54, i+72])
    } 
    for (let i = 0; i < winlines.length; i++) {
      const [a, b, c, d, e] = winlines[i]; //核對盤面是否吻合
      if (current[a] && current[a]  === current[b] && current[a]  === current[c] &&
        current[a]  === current[d] && current[a]  === current[e]){
          const record = this.state.record
          console.log('original',record)
          record[this.state.times] = current[a]
          console.log('after change',record)
          this.setState({
            record: record
          })
          return (current[a] === 'B' ? 'BLACK': 'WHITE')
      }
    }return null
  }

  handleStart(){
    const times = this.state.times + 1
    if (!this.state.winner) {
      const record = this.state.record
      record[this.state.times] = '平'
      this.setState({
        record: record,
      })
    }
    this.setState({
      squares: Array(19*19).fill(null),
      stepNumber: 0,
      blackIsNext: false,
      winner: false,
      times: times
    })
  }

  showRecord(){
    const total = this.state.record.length
    let blackwin = 0
    let whitewin = 0
    for (let i = 0; i < total; i++){
      if (this.state.record[i] === 'B') {
        blackwin += 1
      } else if (this.state.record[i] === 'W') {
        whitewin += 1
      }
    }
    alert(
      'BLACK wins '+ blackwin + ' times !\nWHITE wins '+ whitewin + ' times !'
      )
  }

  render() {
    let status
    let now = this.state.blackIsNext?  'WHITE' : 'BLACK'
    if (this.state.winner) {
      status = 'Winner is '+ this.state.winner + ' !'
    } else {
      status = 'Now, player is ' + now
    }
    
    return (
        <div className="game">
          <h1>Gomoku</h1>
          <header>
            <button onClick={this.showRecord} className="btn btn-outline-dark ">
              Record
            </button>
            <div className="status">{status}</div>   
            <button onClick={this.handleStart} className="btn btn-outline-dark ">
              Restart
            </button> 
          </header>  
          <div className="container">
            {this.renderSquare()}
            {this.renderBoard()}
          </div>
        </div>
    );
  }
}

export default Gomoku;
