import React, { Component } from 'react';
import Card from './Card';
import Grid from '@material-ui/core/Grid'
//import logo from './logo.svg';
//import myimg from './test.png';
import './App.css';
import { IUser } from './interfaces';
import { settings } from 'cluster';
import Logger from './Logger';
import Product from './Product';

class App extends Component {

  state= {
    product: new Product(),
    logger: new Logger(),
    loggerEnabled: true
  }

  constructor(props:any){
    super(props);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  componentDidMount(){
    //TODO
  };

  private onClick(id:number){
    this.state.logger.write("card clicked: id "+id.toString());
  }

  private add(name:string): boolean{
    var isSuccess = this.state.product.add(name);
    this.state.logger.write(this.constructor.name + ".tsx -> add('" + name + "') -> " + isSuccess);
    this.setState({
      flavors: this.state.product,
      //logger: this.state.logger
    })
    
    return isSuccess
  }

  private remove(name:string): boolean{
    var isSuccess = this.state.product.remove(name);
    this.state.logger.write(this.constructor.name + ".tsx -> remove('" + name + "') -> " + isSuccess);
    this.setState({
      flavors: this.state.product
    })
    
    return isSuccess;
  }

  render() {
    var parent = this;

    var options = this.state.product.options.map(function(flavor, i){
      return(
        <Card key ={"card"+i} remove={parent.remove} add={parent.add} imgSource="" name={flavor.name} clickCount={flavor.count}></Card>
      )
    });

    var selectedOptions = this.state.product.selected.map(function(flavor:any, i){
      return(
        <div key ={"cardList"+ i}>{flavor.name}<b><span onClick={e => parent.remove(flavor.name)}> - </span></b></div>
      )
    });

    var logger = this.state.logger.log.map(function(message, i){
      if(parent.state.loggerEnabled){
        return(      
          <div key = {"debug"+i} className="debugMessage">{message}</div>
        )
      }
    });

    var toggleLogger = <button onClick={e => this.setState({loggerEnabled: !this.state.loggerEnabled})}>Toggle Debugger</button>;

    return (
      <Grid container direction="row">   
        <Grid xs={12} item container >
          {options}
        </Grid>
        <Grid item xs={6}>
          <div>Selected Flavors:</div>
          {selectedOptions}
        </Grid>
        <Grid xs={6} item className="debugger">
          {toggleLogger}
          {logger}
        </Grid>
      </Grid>
     
    );
  }

}

export default App;
