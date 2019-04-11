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
    product: new Product(["French Roast", "Vanilla Nut", "Cherry", "Oak", "Mango"], 3),
    logger: new Logger()
  }

  constructor(props:any){
    super(props);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.toggleLogger = this.toggleLogger.bind(this);
  }

  private updateProduct(){
    this.setState({
      product: this.state.product
    })
  }

  private toggleLogger(){
    this.state.logger.enabled = !this.state.logger.enabled;
    this.setState({
      logger: this.state.logger
    })
  }

  private add(name:string, count: number): void{
    var isSuccess = this.state.product.add(name, count);
    this.state.logger.write(this.constructor.name + ".tsx -> add('" + name + "') -> " + isSuccess);
    this.updateProduct();
  }

  private remove(name:string, count: number): void{
    var isSuccess = this.state.product.remove(name, count);
    this.state.logger.write(this.constructor.name + ".tsx -> remove('" + name + "') -> " + isSuccess);
    this.updateProduct();
  }

  render() {

    var options = this.state.product.options.map((flavor, i) => {
      return(
        <Card key ={"card"+i} increaseClicked={this.add} decreaseClicked={this.remove} imgSource="" name={flavor.name} clickCount={flavor.count}></Card>
        )
      });

    var selectedOptions = this.state.product.selected.map((flavor:any, i) => {
      return(
        <div key ={"cardList"+ i}>{flavor.name}<b><span onClick={e => this.remove(flavor.name, 1)}> - </span></b></div>
      )
    });

    var logger = this.state.logger.log.map((message, i) => {
      if(this.state.logger.enabled){
        return(      
          <div key = {"debug"+i} className="debugMessage">{message}</div>
        )
      }
    });

    var toggleLogger = <Grid item xs={12}><button onClick={this.toggleLogger}>Toggle Debugger</button></Grid>;

    return (
        <Grid item xs={12} container direction="row" className="myApp" spacing={32} justify="center">   
          <Grid item xs={12} container justify="center">
            {options}
          </Grid>
          <Grid item xs={6} justify="flex-start" style={{textAlign:"right"}}>
            <div >Selected Flavors:</div>
            {selectedOptions}
          </Grid>
          <Grid item xs={6} className="debugger" style={{textAlign:"left"}}>
            {toggleLogger}
            {logger}
          </Grid>
        </Grid>   
    );
  }
}

export default App;
