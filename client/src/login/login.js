import React, { Component } from 'react';
import {Link,Redirect} from 'react-router-dom';
import './login.css'
import Axios from 'axios';
export default class Login extends Component {
    state={
        username: '',
        password: '',
        loginFailed: false,
        toStudentDashboard: false,
        toAdminDashboard: false,
    }
    changeUsername(event){
        this.setState({[event.target.name]: event.target.value});
    }
    login(){
        const auth = {
            username: this.state.username,
            password: this.state.password,
        }
        Axios.post('http://localhost:4100/users/login', {auth}).then(apiResponse=>{
            if(!apiResponse.data.bearer || !apiResponse.data.user){
                this.setState({loginFailed: true})
            }
            else{
                console.log(apiResponse.data.user)
                localStorage.setItem('jwt', apiResponse.data.bearer);
                localStorage.setItem('user',apiResponse.data.user[0]._id);
                this.renderDashboard(apiResponse.data.user)
            }
            
        })
    }
    renderDashboard(user){
        this.setState({loginFailed: false});
        if(user[0]){
           if(user[0].role){
               if(user[0].role=='Admin'){
                this.setState({toAdminDashboard: true});
               }
               if(user[0].role == 'Student'){
                this.setState({toStudentDashboard: true});
            } 
           }
           
        }
    }
    render() {

        if(this.state.toAdminDashboard){
            console.log(this.state.toAdminDashboard)
            return <Redirect to='/admin'/>
        }
        if(this.state.toStudentDashboard){
            return <Redirect to='/student'/>
        }

        return (
            <>
            <img
          style={{
            position: "absolute",
            width: "100%",
            marginTop: "230px",
            zIndex: "0",
            opacity: '40%'
          }}
          src={require("../resources/splash.png")}
        ></img>
            <div className="loginbox">
            <img src={require('../resources/user.png')}className="avatar"/>
                <h1>Login Here</h1>
                <form>
                    <p>Username</p>
                    <input type="text" name="username" placeholder="Enter Username" onChange={event=>{this.changeUsername(event);}}/>
                    <p>Password</p>
                    <input type="password" name="password" placeholder="Enter Password" onChange={event=>{this.changeUsername(event);}}/>
                   
                    <Link style={{textDecoration: 'none'}}>
                    <input type="submit" name="" value="Login" href='/admin/home' onClick={(event)=>{this.login(event)}}/>
                    </Link>
                    <a style={{color: 'red', visibility: this.state.loginFailed? 'visible':'hidden'}}>Login unsuccessful</a><br/>
                    <a href="#">Lost your password?</a><br/>
                    <a href="#">Don't have an account?</a>
                </form>
            </div>
            </>
        )
    }
}
