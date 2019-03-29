import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid'
import { IUser } from './interfaces';

interface ICardProps{
    imgSource: string,
    name: string,
    add(name: string): boolean,
    remove(name: string): boolean
}

class Card extends Component<ICardProps> {
  
  state = {
    clickCount:0,
    active: false
  }
  
  constructor(props:ICardProps){
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.incrementClickCount = this.incrementClickCount.bind(this);
    this.decrementClickCount = this.decrementClickCount.bind(this);
  }

  handleClick(e:any){
    
    var currentState = this.state.active;
    var currentClickCount = this.state.clickCount;

    if(currentState){
      this.setState({
        clickCount: 0
      });
      for(var i =0; i < currentClickCount; i++){
        this.props.remove(this.props.name);
      }
      this.setState({
        active: !this.state.active
      })  
      
    }
    else{
      this.setState({
        clickCount:1
      });

      if(this.props.add(this.props.name)){
        this.setState({
          active: !this.state.active
        })  
      }
    }
  }

  incrementClickCount(e:any){
      e.stopPropagation();

      if(this.props.add(this.props.name)){
        this.setState({
          clickCount: this.state.clickCount+1
        });
      }
  }

  decrementClickCount(e:any){
    e.stopPropagation();

    if(this.state.clickCount <= 1) {
      this.setState({
        active: false
      })  
      return;
    }

    if(this.props.remove(this.props.name)){
      this.setState({
        clickCount: this.state.clickCount-1
      })
    }
  }

  stopProp(e:any){
    e.stopPropagation();
  }

  render() {
    return (
      <div className={this.state.active ? "variant active" : "variant"} onClick={this.handleClick}>
          {/* <img className="variantImage" src={this.props.imgSource} alt=""/> */}
          <div>{this.props.name}</div>
          { this.state.active ?
          <div className="clickCountDiv" >
            <span className="minus" onClick={this.decrementClickCount}>-</span>
            <span className="clickCount" onClick={this.stopProp}>{this.state.clickCount}</span>
            <span className="plus" onClick={this.incrementClickCount}>+</span>
          </div>
          : null}

      </div>
    );
  }
}

export default Card;
