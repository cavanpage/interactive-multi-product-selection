import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid'
import { IUser } from './interfaces';
import Icon from '@material-ui/core/Icon';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';


import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import { WithStyles, createStyles, Theme, withStyles } from "@material-ui/core/styles";

import { css } from '@emotion/core'
import classes from '*.module.sass';
import Paper  from '@material-ui/core/Paper';

const styles = (theme: Theme) => createStyles({
  red: { 
    color: red[500]
   },
  card:{
    cursor: 'pointer',
    position: 'relative',
    margin:'10px',

    '&:hover': {
      backgroundColor: green[200]
   }
   
  },
  cardImage: { 
    padding: '1rem',// 1rem 0px 1rem'
  },
  active: { 
    backgroundColor: green[500] + '!important'
    //boxShadow: "5px 10px " + green[500]
    //margin:'-4px',
    //border: "solid 4px "+ green[500],
    
  },
});


interface ICardProps extends WithStyles<typeof styles>{
    imgSource: string,
    name: string,
    increaseClicked(name: string, count: number): void,
    decreaseClicked(name: string, count: number): void,
    clickCount:number
}

const DecoratedCard = withStyles(styles)(
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

    activeClass(): string{
      return this.isActive() ? this.props.classes.active: "";
    }

    render() {
      return (
        <Grid item className={ this.props.classes.card + " " + this.activeClass() } onClick={this.handleClick}>       
           <div className={this.isActive() ? "white cardTitle": "cardTitle"} > {this.props.name} </div>
            <img className={this.props.classes.cardImage} src="https://via.placeholder.com/175" data-src="https://via.placeholder.com/150" alt=""></img>
            { this.isActive() ?
            <Grid container className="clickCountDiv" >
              <Grid item xs={5} className="plus" onClick={this.decrementClickCount}>
                  <RemoveCircleOutline  style={{ fontSize: 30 }} ></RemoveCircleOutline>          
              </Grid>
              <Grid item xs={2} className="c" onClick={this.stopProp}>
                  <span> {this.props.clickCount} </span>
              </Grid>
              <Grid item xs={5} className="plus" onClick={this.incrementClickCount}>
                  <AddCircleOutline  style={{ fontSize: 30 }}  ></AddCircleOutline>
              </Grid>
            </Grid>
            : null }
        </Grid>
      );
    }
  })

export default DecoratedCard;
