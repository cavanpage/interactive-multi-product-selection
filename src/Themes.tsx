import {createMuiTheme, WithStyles, createStyles, Theme, withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import green from '@material-ui/core/colors/green';
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';


const PurpleTheme = createMuiTheme({
    palette: {
      primary: 
      { 
        main: green[500],
        light: green[200] 
      }, 
      secondary: 
      { 
        main: purple[500],
        light: purple[200]
      }, // This is just green.A700 as hex.
    },
    typography: { useNextVariants: true }
  });

  const RedTheme = createMuiTheme({
    palette: {
      primary: 
      { 
        main: red[500],
        light: red[200] 
      }, 
      secondary: 
      { 
        main: orange[500],
        light: orange[200]
      }, // This is just green.A700 as hex.
    },
    typography: { useNextVariants: true },
  });


  
  
  export {PurpleTheme, RedTheme};
