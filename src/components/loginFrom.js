import React, { Component } from 'react'
import { Redirect } from 'react-router'
import cookie from 'react-cookies';
import Axios from 'axios';

class LoginForm extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            userId: 'nil',
            value: '',
            user: [],
            hasVote: false,
            Vredirect: false,
            Hredirect: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        this.setState({ userId: cookie.load('userId') })
        if(this.state.userId === 'nil'){
            //this.createNewUser()
        }
        //console.log(this.state.userId)
    }
    createNewUser(email){
        var fetchString = '/api/voters'
        var hasvote = true
        Axios.post(fetchString,{
          email: email,
          hasvote: hasvote
        })
        .then(response => {
          console.log(response)
          cookie.save('userId', response.data.id, {path: '/'})
          this.setState({ userId: cookie.load('userId') })
          console.log(this.state.userId)
        })
        .catch(error => {
          console.log(error)
        })
      }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        const emailId = this.state.value
        console.log(emailId)
        this.createNewUser(emailId)
        cookie.save('emailId', emailId, {path: '/'})
        alert('A name was submitted: ' + emailId)
        this.setState({Vredirect: true});
        event.preventDefault();
    }

    varifyEmail(emailId){
        console.log(emailId)
        this.getEmail()
        if(this.state.user.email === 'nil'){
            this.setEmail(emailId)
            return true
        }else if(this.state.user.email === emailId){
            return false
        }else if(this.state.user.hasVote){
            return true
        }else {
            return false
        }
        /*
        var sitesplit = emailId.split("@")
        if(sitesplit[1].lenght > 0){
            var websplit = sitesplit[1].split(".")
            if(websplit[1].lenght > 0){
                if(true){
                    return true
                }
            }
        }
        return false
        */
    }
    getEmail(){
        var fetchString = '/api/voters/'+ this.state.userId
        Axios.get(fetchString)
        .then(response => {
            console.log(response)
            this.setState({user: response.data})
        })
        .catch(error => console.log(error))
    }
    setEmail(emailId){
        var fetchString = '/api/voters/'+ this.state.userId
        Axios.put(fetchString, {
            email: emailId,
            hasVote: true
        })
        .then(response=> {
            console.log(response)
        })
        .catch(error => console.log(error))
    }

    render(){
        const { Vredirect, Hredirect } = this.state;
        if (Vredirect) {
            return <Redirect to='/Vote' />
        }
        if (Hredirect) {
            return <Redirect to='/' />
        }
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
export default LoginForm;