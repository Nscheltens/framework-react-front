import React, { Component } from 'react';
import { Redirect } from 'react-router'
import axios from 'axios';
//import cookie from 'react-cookies';

const TableBody = props => {
    const rows = props.voteData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.name}</td>
                <td>{row.vote}</td>
                <td>
                    <button onClick={() => props.addVote(index+1, row.name, row.vote)}>Vote</button>
                </td>
            </tr>
        )
    })

    return <tbody>{rows}</tbody>
}

class Votes extends Component {
    constructor(props){
        super(props);
        this.state = {
            votes: [],
            redirect: false,
        }
    }

    componentDidMount(){
        this.getVotes();
    }

    getVotes = () => {
        fetch('/api/frameworks')
        .then(res => res.json())
        .then(json => this.setState({ votes: json }))
        .catch(error => console.log(error))
    }
    addVote = (id, name, vote) => {
        var newVote = vote + 1;
        var fetchString = '/api/frameworks/'+id;
        axios.put(fetchString, {
            name: name,
            vote: newVote
        })
        .then(response => {
            console.log(response);
            this.getVotes();
            this.setState({redirect: true})
        })
        .catch(error => console.log(error))
    }

    render() {
        const { votes, redirect } = this.state;
        if(redirect) {
            return <Redirect to='/' />
        }
        return (
            <div className="App">
                <h1>Voteing Block</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Framework Name</th>
                            <th>Votes</th>
                            <th>Vote Now</th>
                        </tr>
                    </thead>
                    <TableBody voteData={votes} addVote={this.addVote}/>
                </table>
            </div>
        )
    }
}
export default Votes;