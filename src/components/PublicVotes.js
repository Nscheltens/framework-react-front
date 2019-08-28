import React, { Component } from 'react';
import axios from 'axios';

const TableBody = props => {
    const rows = props.voteData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.name}</td>
                <td>{row.vote}</td>
            </tr>
        )
    })

    return <tbody>{rows}</tbody>
}

class PublicVotes extends Component {
    constructor(props){
        super(props);
        this.state = {
            votes: [],
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
        })
        .catch(error => console.log(error))
    }

    render() {
        const { votes } = this.state;
        return (
            <div className="App">
                <h1>Voteing Block</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Framework Name</th>
                            <th>Votes</th>
                        </tr>
                    </thead>
                    <TableBody voteData={votes}/>
                </table>
            </div>
        )
    }
}
export default PublicVotes;