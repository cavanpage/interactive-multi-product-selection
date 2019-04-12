import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { IUser } from './interfaces';
import Icon from '@material-ui/core/Icon';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';

import red from '@material-ui/core/colors/red';
import {createMuiTheme, WithStyles, createStyles, Theme, withStyles, MuiThemeProvider } from "@material-ui/core/styles";

import { css, ClassNames } from '@emotion/core'
import classes from '*.module.sass';
import Paper  from '@material-ui/core/Paper';
import Typography  from '@material-ui/core/Typography';

import {RedTheme, PurpleTheme} from './Themes';

const styles = (theme: Theme) => createStyles({
  red: { 
    color: red[500]
   },
  card:{
    cursor: 'pointer',
    position: 'relative',
    margin:'10px',

    '&:hover': {
      backgroundColor: PurpleTheme.palette.primary.light
   }
   
  },
  cardImage: { 
    padding: '1rem',
  },
  cardTitle: {
    paddingTop: '5px',
    fontSize: '20px'
  },
  active: { 
    backgroundColor: PurpleTheme.palette.secondary.main + '!important',
    color:"white"
  },
  counter: {
    color:"white",

    '&:hover': {
      color:"black"
   }
  },
  clickCount:{
    position: "absolute",
    bottom: 0,
    right: 0,
    fontSize: '30px',
    color: "white"
  }
  
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

    activeCard(): string{
      return this.isActive() ? this.props.classes.active: "";
    }

    render() {
      const classes = this.props.classes;
      return (
        <MuiThemeProvider theme={PurpleTheme}>     
        <Grid item className={ classes.card + " " + this.activeCard() } onClick={this.handleClick}>       
            <div className={ classes.cardTitle}> {this.props.name} </div> 
            <img className={ classes.cardImage} src="https://via.placeholder.com/175" data-src="https://via.placeholder.com/150" alt=""></img>
            { this.isActive() ?
           
            <Grid container className={classes.clickCount  + " " + this.activeCard() } >
              <Grid item xs={5} className={classes.counter}  onClick={this.decrementClickCount}>
                  <RemoveCircleOutline  style={{ fontSize: 30 }} ></RemoveCircleOutline>          
              </Grid>
              <Grid item xs={2} className={classes.counter} onClick={this.stopProp}>
                  <span> {this.props.clickCount} </span>
              </Grid>
              <Grid item xs={5} className={classes.counter}  onClick={this.incrementClickCount}>
                  <AddCircleOutline  style={{ fontSize: 30 }}  ></AddCircleOutline>
              </Grid>
            </Grid>
            : null }
        </Grid>
        
        </MuiThemeProvider>
      );
    }
  })

export default DecoratedCard;
