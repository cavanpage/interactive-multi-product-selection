import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid'
import { IUser } from './interfaces';



interface ICardProps{
    imgSource: string,
    user: IUser,
    onClick(id:number): void;
}
class Card extends Component<ICardProps> {
  
  max:number = 3;
  min:number = 0;

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
    this.setState({
      active: !this.state.active
    })  

    if(!this.state.active){
      this.setState({
        clickCount: 0
      })
    }
    else{
      this.setState({
        clickCount:1
      })
    }
  }

  incrementClickCount(e:any){
    e.stopPropagation();
    if(this.state.clickCount >= this.max) {
      alert("you may only have "+this.max +" selections");
      return;
    }

      this.setState({
        clickCount: this.state.clickCount+1
      });
  }

  decrementClickCount(e:any){
    e.stopPropagation();
    if(this.state.clickCount <= this.min+1) {
      this.setState({
        active: false
      })  
  
      return;
    }

    this.setState({
      clickCount: this.state.clickCount-1
    })
  }

  stopProp(e:any){
    e.stopPropagation();
  }

  render() {
    let user: IUser = this.props.user;
    return (
      <div className={this.state.active ? "variant active" : "variant"} onClick={this.handleClick}>
          {/* <img className="variantImage" src={this.props.imgSource} alt=""/> */}
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
