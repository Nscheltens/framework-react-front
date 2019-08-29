import React, { Component } from 'react';
import axios from 'axios';
//import cookie from 'react-cookies';

const TableBody = props => {
    const rows = props.voteData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.name}</td>
                <td>{row.vote}</td>
                <td>
                    <button onClick={() => props.addVote(row.id, row.name, row.vote)}>Vote</button>
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
        }
        this.redirectHome = this.redirectHome.bind(this)
    }

    componentDidMount(){
        this.getVotes();
    }
    getVotes = () => {
        fetch('https://framework-react-api.herokuapp.com/api/frameworks')
        .then(res => res.json())
        .then(json => this.setState({ votes: json }))
        .catch(error => console.log(error))
    }
    addVote = (id, name, vote) => {
        var newVote = vote + 1;
        var fetchString = 'https://framework-react-api.herokuapp.com/api/frameworks/'+id;
        axios.put(fetchString, {
            name: name,
            vote: newVote
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => console.log(error))
        this.redirectHome()
    }
    redirectHome(){
        let path = '/';
        this.props.history.push(path)
    }

    render() {
        const { votes } = this.state;
        return (
            <div>
                <h1>Voting Block</h1>
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