import React from 'react';
import{BrowserRouter as Router ,Route,Switch} from "react-router-dom"
import home from "./pages/home.js";
import login from "./pages/login.js"
import signUp from "./pages/signUp.js"
import "./App.css";
import user from "./pages/user"
import Navbar from "./components/layout/navbar";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode"
import AuthRoute from "./util/AuthRoute"

//Redux
import {Provider} from "react-redux"
import store from "./redux/store"
import {SET_AUTHENTICATED} from "./redux/types"
import {logoutUser,getUserData} from "./redux/actions/userActions"
import axios from 'axios';

const token=localStorage.FBIdToken
if(token){
  const decodedToken=jwtDecode(token)
if(decodedToken.exp *1000<Date.now()){
  window.location.href="/login"
  store.dispatch(logoutUser());
}
else{
 
  store.dispatch({ type: SET_AUTHENTICATED });
  axios.defaults.headers.common['Authorization'] = token;
  store.dispatch(getUserData());
}

}
const theme=createMuiTheme({
  palette:{
    primary:{
      light:"#33c9dc",
      main:"#00bcd4",
      dark:"#008394",
      contrastText:"#fff"
    },
    secondary:{
      light:"#ff6333",
      main:"#ff3d00",
      dark:"#b22a00",
      contrastText:"#fff"
    }
  },
  typography:{
    userNextVariants:true
  },
  
})
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
    <Router>
     <Navbar/>
    <div className="container">
    
    <Switch>
      <Route  exact path="/" component={home}/>
      <AuthRoute path="/signup" component={signUp} />
      <AuthRoute path="/login" component={login}  />
      <Route exact path="/user/:handle" component={user}  />
      <Route exact path="/user/:handle/scream/:screamId" component={user}  />


     </Switch>   
    </div>
     </Router>
     
      </Provider>
     
    </MuiThemeProvider>
    
  );
}

export default App;
