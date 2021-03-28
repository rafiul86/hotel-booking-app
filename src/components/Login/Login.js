import React, {useState, useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import {Button,AppBar,Toolbar,IconButton,Typography,Container} from "@material-ui/core"
import firebaseConfig from '../firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); 
 }
const Login = () => {
  const [loggedUser, setLoggedUser] = useContext(UserContext)
  const history = useHistory();
        const location = useLocation();
        let { from } = location.state || { from: { pathname: "/" } };

    var googleProvider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleIn = () => {
        firebase.auth()
  .signInWithPopup(googleProvider)
  .then(result => {
    const {displayName, email,photoURL} = result.user;
    console.log(result.user)
    const signedInUser = { name : displayName, email ,photo :photoURL}
    setUser(signedInUser)
    setLoggedUser(signedInUser)
    history.replace(from);

  }).catch((error) => {
    console.log(error)
  });
    }
    const handleGoogleOut = () =>{
        firebase.auth().signOut().then((res) => {
          }).catch((error) => {
          }); 
    }
        
        const [newUser , setNewUser] = useState(false);
        const [user,setUser] = useState({
          isSignedIn : false,
          name : '',
          email : '',
          password : '',
          photo : '',
          error : '',
          success :false
        })
          const handleBlur = (e) => {
            let isFieldValid = true ;
              if (e.target.name === "email"){
                isFieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)
              }
              if (e.target.name === "password"){
                const isPasswordValid  =  e.target.value.length > 7 ;
                const hasPasswordNumber =  /\d{1}/.test(e.target.value)
                isFieldValid = isPasswordValid && hasPasswordNumber ;
              }
              if(isFieldValid){
                  let newUserInfo = {...user};
                  newUserInfo[e.target.name] = e.target.value ;
                  setUser(newUserInfo)
              }
          }
       
          const handleSubmit = (e) => {
            if(newUser && user.email && user.password){
              firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
              .then(result => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setNewUser(newUserInfo);
                const {displayName,email,photoURL} = result.user;
    const signedInUser = {name : displayName,email,photoURL}
        setLoggedUser(signedInUser);
        history.replace(from);
               
              })
              .catch(error => {
                const newUserInfo = {...user};
                newUserInfo.error = error.message;
                newUserInfo.success = true
                setNewUser(newUserInfo)
              });
            if (!newUser && user.email && user.password){
              firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(result => {
          const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setNewUser(newUserInfo);
                const {displayName,email} = result.user;
    const signedInUser = {displayName,email}
        setLoggedUser(signedInUser);
        history.replace(from);

        })
        .catch(error => {
          const newUserInfo = {...user};
                newUserInfo.error = error.message;
                newUserInfo.success = false
                setNewUser(newUserInfo)
        });
            }
            }
            e.preventDefault();
          }
            
      
        return (
            <Container align="justify" maxWidth="md">
              
              <div className="App">
          <input type="checkbox" onChange = {()=> setNewUser(!newUser)} name ="newUser"/>
        <label htmlFor="newUser">New User Sign up</label>
      <form onSubmit = {handleSubmit}>
        { newUser &&<input name = "name" type="text" onBlur={handleBlur} placeholder="Your Name"/>}
        <br/>
        <input type="text" name = "email"  placeholder="Write Your Email" onBlur={handleBlur} required/>
        <br/>
         <input type="password" name = "password" placeholder="Password" onBlur={handleBlur} required/>
         <br/>
         <input type="submit" value ={newUser ? 'Sign up' : 'Log in'}/>
      </form>
      <p style={{color : 'red'}}>{user.error}</p>
      {user.success && <p style={{color : 'green'}}>Congratulations !! User {newUser ? 'Created' : 'Logged in'} Successfully !!</p>}
    </div>
                <br/>
                <Button onClick={handleGoogleIn} variant="contained" color="primary">  Google Sign In</Button>
    <Button onClick = {handleGoogleOut} variant="contained" color="secondary">Google Sign Out</Button>
    <br/>
    <br/>
    </Container>
    );
};

export default Login;