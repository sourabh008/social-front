import React, { Component } from 'react'
//MUI stuff
import withStyles from "@material-ui/core/styles/withStyles"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import Typograpy from "@material-ui/core/Typography"
import MyButton from '../../util/MyButton';
import ChatIcon from "@material-ui/icons/Chat"
import {Link} from "react-router-dom"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
//Redux
import {connect } from "react-redux";


//components
import DeleteScream from "./DeleteScream"
import ScreamDialog from "./ScreamDialog"
import  LikeButton  from './LikeButton';
const styles={
    card:{
        display:"flex",
        marginBottom:20,
    marginLeft:"20%",
    height:150
    },
    image:{
    minWidth:150,
    minHeight:100,
    borderRadius:"10%"
    },
    content:{
        padding:25,
        objectFit:"cover",
    }
}
 class Scream extends Component {
     
    render() {
        dayjs.extend(relativeTime)
        const {classes , scream:{userImage,createdAt,userHandle,screamId,body,commentCount,likeCount},
    user:{
        authenticated,
        credentials:{
            handle
        }
    }
    }=this.props;
        const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteScream screamId={screamId} />
      ) : null;
        return (
          <Card className={classes.card}>
              <CardMedia image={userImage} title="Profile image" className={classes.image}/>
              <CardContent className={classes.details}>
                  <Typograpy variant="h5" component={Link} to={`/user/${userHandle}`} color="primary">{userHandle}</Typograpy>
                  {deleteButton}
                  <Typograpy variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typograpy>
                  <Typograpy variant="body1">{body}</Typograpy>
                   <LikeButton screamId={screamId}/>
                   <span>{likeCount} likes</span>
                   <MyButton tip="comments">
                       <ChatIcon color="primary"/>
                   </MyButton>
                   <span>{commentCount} comments</span>
                   <ScreamDialog userHandle={userHandle} screamId={screamId} openDialog={this.props.openDialog}/>
              </CardContent>

          </Card>
        )
    }
}
const mapStateToProps=state=>({
    user:state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Scream))
