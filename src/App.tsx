import React, { Component } from 'react';
import Card from './Card';
import Grid from '@material-ui/core/Grid'
//import logo from './logo.svg';
//import myimg from './test.png';
import './App.css';
import { IUser } from './interfaces';

class Flavors{
  public Options: string[] = ["French Roast", "Vanilla Nut", "Cherry", "Oak", "Mango"];
  public Selected: string[] = [];
  public Count: number = 0;

  public Choose = 3;

  private Flavors(){
    this.Count = this.Options.length;
  }

  public add(option: string): boolean{
    var success = true;

    if(this.Selected.length >= this.Choose){
      alert("You may only choose "+ this.Choose + " flavor(s). Please unselect a flavor to choose another.")
      success =  false;
    }
    else{
      this.Selected.push(option);
      success =  true;
    }
    console.log("Flavor.add("+option+") - "+this.Selected.toString());
    return success;
  }

  public remove(option: string): boolean{
    var success = true;
    if(this.Selected.length <= 0){
      success =  false;
    }
    else{   
      var index = this.Selected.indexOf(option);
      this.Selected.splice(index, 1);
      
      if(index == -1)success =  false;
      else success = true;
    }
    console.log("Flavor.remove("+option+") - "+this.Selected.toString());
    return success;
  }
}

class App extends Component {

  public Flavors: Flavors = new Flavors();

  state= {
    flavors: Flavors
  }

  constructor(props:any){
    super(props);
    
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  private randomString(length: number): string {
    let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  componentDidMount(){
    //TODO
  };

  private onClick(id:number){
    console.log("card clicked: id "+id.toString());
  }

  private add(name:string): boolean{
    var isSuccess = this.Flavors.add(name);
    this.setState({
      flavors: Flavors
    })

    return isSuccess
  }

  private remove(name:string): boolean{
    var isSuccess = this.Flavors.remove(name);
    this.setState({
      flavors: Flavors
    })
    return isSuccess;
  }

  render() {
    var parent = this;

    var options = this.Flavors.Options.map(function(flavor){
      return(
        <Card remove={parent.remove} add={parent.add} imgSource="" name={flavor} ></Card>
      )
    });

    var selectedOptions = this.Flavors.Selected.map(function(flavor:string){
      return(
        <div>{flavor}<b><span onClick={e => parent.remove(flavor)}> - </span></b></div>
      )
    });

    return (
      <Grid container direction="row">   
        <Grid xs={12} container >
          {options}
        </Grid>
        <Grid>
          <div>Selected Flavors:</div>
          {selectedOptions}
        </Grid>
      </Grid>
     
    );
  }

}

export default App;
