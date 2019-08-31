import React, { Component } from 'react'
import Grid from "@material-ui/core/Grid"
import Scream from "../components/scream/Scream"
import Profile from "../components/profile/Profile"
import {connect } from "react-redux";
import {getScreams} from "../redux/actions/dataActions"
 class home extends Component {
     
     componentDidMount(){
         this.props.getScreams()
     }
    render() {
        const {screams,loading} =this.props.data
        let resentScreamsMarkup=!loading?(
            screams.map(scream=>
                <Scream key={scream.screamId} scream={scream}/>
            )
        ):
        <p>Loading...</p>
        return (
           <Grid container  className="grid" spacing={3}>
               <Grid item sm={8} xs={12}>
                   {resentScreamsMarkup}
               </Grid>
               <Grid item  sm={3} xs={1}>
                   <Profile />
               </Grid>
           </Grid>
        )
    }
}
const mapStateToProps=(state)=>({
    data:state.data
})
export default connect(mapStateToProps,{getScreams})(home)
