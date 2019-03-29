import React, { Component } from 'react';
import Card from './Card';
import Grid from '@material-ui/core/Grid'
import logo from './logo.svg';
import myimg from './test.png';
import './App.css';
import { IUser } from './interfaces';


class App extends Component {

  private users: IUser[] = [];

  constructor(props:any){
    super(props);

    for(let i = 0; i < 5; i++){
      this.users.push({
        id: i,
        name: "user_" + this.randomString(10),
        description: "description_"+this.randomString(10)
      });
    }
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

  render() {

    return (
      <Grid container>   
          <Card imgSource={myimg} user={this.users[0]} onClick={this.onClick}></Card>
      </Grid>
    );
  }
}

export default App;
