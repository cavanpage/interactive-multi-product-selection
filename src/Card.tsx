import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid'
import { IUser } from './interfaces';

interface ICardProps{
    imgSource: string,
    name: string,
    increaseClicked(name: string, count: number): boolean,
    decreaseClicked(name: string, count: number): boolean,
    clickCount:number
}

class Card extends Component<ICardProps> {

  private defaultIncrement = 1;

  constructor(props:ICardProps){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.incrementClickCount = this.incrementClickCount.bind(this);
    this.decrementClickCount = this.decrementClickCount.bind(this);
  }

  handleClick(e:any){  
    this.isActive() ? this.props.decreaseClicked(this.props.name, this.props.clickCount) : this.props.increaseClicked(this.props.name, this.defaultIncrement);
  }

  incrementClickCount(e:any){
      e.stopPropagation();
      this.props.increaseClicked(this.props.name, this.defaultIncrement);
  }

  decrementClickCount(e:any){
    e.stopPropagation();
    this.props.decreaseClicked(this.props.name, this.defaultIncrement);
  }

  stopProp(e:any){
    e.stopPropagation();
  }

  isActive(){
    return this.props.clickCount > 0;
  }

  render() {
    return (
      <div className={this.isActive() ? "variant active" : "variant"} onClick={this.handleClick}>
          {/* <img className="variantImage" src={this.props.imgSource} alt=""/> */}
          <div>{this.props.name}</div>
          { this.isActive() ?
          <div className="clickCountDiv" >
            <span className="minus" onClick={this.decrementClickCount}>-</span>
            <span className="clickCount" onClick={this.stopProp}>{this.props.clickCount}</span>
            <span className="plus" onClick={this.incrementClickCount}>+</span>
          </div>
          : null}
      </div>
    );
  }
}

export default Card;
