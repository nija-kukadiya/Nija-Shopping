import { Component } from "react";
import {Link} from "react-router-dom";
import axios from "axios";


class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
    }
    handleClick(event){
        event.preventDefault()
        const apiBaseUrl = "https://reqres.in/api/";
        let self = this;
        let payload={
        "email":this.state.username,
        "password":this.state.password
        }
        axios.post(apiBaseUrl+'login', payload)
        .then(function (response) {
        console.log(response);
        if(response.data.code ===200){
        console.log("Login successfull");
        let uploadScreen=[];
        // uploadScreen.push(<UploadScreen appContext={self.props.appContext}/>)
        self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
        }
        else if(response.data.code === 204){
        console.log("Username password do not match");
        alert("username password do not match")
        }
        else{
        console.log("Username does not exists");
        alert("Username does not exist");
        }
        })
        .catch(function (error) {
        console.log(error);
        });
        }
    render(){
        return(
            <form>
                <h3>Login</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input type= "email" 
                        className="form-control" 
                        placeholder="Enter email" 
                        onChange = {(event) => this.setState({username:event.target.value})} />
                </div>
                <div className="form-group">
                    <label>password</label>
                    <input type="password" 
                        className="form-control" 
                        placeholder="Enter password" 
                        onChange = {(event) => this.setState({password:event.target.value})} />
                </div>
                <div className="form-group">
                    <div className="custom-control  custom-checkbox">
                        <input type="checkbox" 
                            className="custom-control-input" 
                            id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <button type="submit" 
                    className="btn btn-primary btn-block" 
                    onClick={(event) => this.handleClick(event)} >Submit</button>
                    <p className="forgot-password text-right"> Forgot <Link to="#">password?</Link></p>
            </form>
        )
    }
}
export default LoginForm;