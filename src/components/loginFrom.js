import React, { Component } from 'react'
import { Redirect } from 'react-router'
import Axios from 'axios';

class LoginForm extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            userId: 'nil',
            value: '',
            mailList: [],
            Vredirect: false,
            Hredirect: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.redirectHome = this.redirectHome.bind(this);
        this.redirectVote = this.redirectVote.bind(this);
    }
    componentDidMount(){
        this.setEmailList()
    }
    createNewUser(email){
        var fetchString = 'https://framework-react-api.herokuapp.com/api/voters'
        var hasvote = false
        Axios.post(fetchString,{
          email: email,
          hasvote: hasvote
        })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
    setEmailList(){
        var fetchString = 'https://framework-react-api.herokuapp.com/api/voters/'
        Axios.get(fetchString)
        .then(response => {
            console.log(response)
            this.setState({mailList: response.data})
        })
        .catch(error => console.log(error))
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const emailId = this.state.value
        var check = 0;
        this.state.mailList.forEach(item => {
            if(item.email == emailId){
                if(!item.hasvote){
                    check = check + 1
                }
            }
        })
        if(check > 0){
            alert('Email ' + emailId +' has already been used')
            this.redirectHome();
        } else{
            this.createNewUser(emailId)
            alert('An email was submitted: ' + emailId)
            this.redirectVote();
        }
    }
    redirectHome(){
        this.setState({Hredirect: true});
    }
    redirectVote(){
        this.setState({Vredirect: true});
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