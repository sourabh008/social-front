import React, { Component } from 'react'

import withStyles from "@material-ui/core/styles/withStyles"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import AppIcon from "../images/monkey.png"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import {Link} from "react-router-dom"
import CircularProgress from "@material-ui/core/CircularProgress"
//Redux
import {connect} from "react-redux";
import {signupUser} from "../redux/actions/userActions"
const styles={
    form:{
        textAlign:"center"
    },
    image:{
     margin:"20px auto 20px auto"
    },
    pageTitle:{
        margin:"20px auto 20px auto"
    },
    Button:{
        margin:"20px auto 20px auto",
        position:"relative"

    },
    customError:{
        color:"red",
        fontSize:"0.8rem",
        marginTop:10
    },
    progress:{
        position:"absolute"
    }
}
class signup extends Component {
    constructor(){
        super()
        this.state={
            email:"",
            password:"",
            confirmPassword:"",
            handle:"",
            errors:{}
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
          this.setState({ errors: nextProps.UI.errors });
        }
      }
    handleSubmit=(event)=>{
        event.preventDefault()
        this.setState({
            loading:true
        })
        const newUserData={
            email:this.state.email,
            password:this.state.password,
            confirmPassword:this.state.confirmPassword,
            handle:this.state.handle

        }
        this.props.signupUser(newUserData,this.props.history)
        // axios.post("https://us-central1-socialmediaapp-d1306.cloudfunctions.net/api/signup",newUserData)
        // .then(res=>{
        //     console.log(res.data)
        //     localStorage.setItem("FBIdToken",`Bearer ${res.data.token}`)
        //     this.setState({
        //         loading:false
        //     });
        //     this.props.history.push("/")
        // })
        // .catch(err=>{
        //     this.setState({
        //         errors:err.response.data,
        //         loading:false
        //     })
        // })
    }
    handleChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    render() {
        const {classes ,UI:{loading}} =this.props
        const {errors}=this.state
        return (
          <Grid container className={classes.form}>
              <Grid item sm></Grid>
              <Grid item sm>
                  <img src={AppIcon} alt="monkeyImage"  className={classes.image}/>
                  <Typography variant="h3" className={classes.pageTitle}>Signup</Typography>
                  <form noValidate onSubmit={this.handleSubmit}>
                      <TextField id="email" name="email" type="email" label="Email" className={classes.textField} value={this.state.email} onChange={this.handleChange} helperText={errors.email} error={errors.email ? true : false} fullWidth/>
                      <TextField id="password" name="password" type="password" label="Password" className={classes.textField} value={this.state.password} helperText={errors.password} error={errors.password ? true : false}  onChange={this.handleChange} fullWidth/>
                      <TextField id="confirmPassword" name="confirmPassword" type="password" label="ConfirmPassword" className={classes.textField} value={this.state.confirmPassword} onChange={this.handleChange} helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false} fullWidth/>
                      <TextField id="handle" name="handle" type="text" label="Handle" className={classes.textField} value={this.state.handle} onChange={this.handleChange} helperText={errors.handle} error={errors.handle ? true : false} fullWidth/>
                      {errors.general && (
                          <Typography variant="body2" className={classes.customError}>{errors.general}</Typography>
                      )}
                      <Button type="submit" variant="contained" color="primary" className={classes.Button}>Signup {loading && (
                          <CircularProgress size={30}className={classes.progress}/>
                      )}</Button>
                      <br />
                      <small>Already have an account? <Link to="/login">here</Link></small>
                </form>
              </Grid>
              <Grid item sm></Grid>

          </Grid>
        )
    }
}
const mapStateToProps=(state)=>({
    user:state.user,
    UI:state.UI
})

export default connect(mapStateToProps,{signupUser})(withStyles(styles)(signup))
