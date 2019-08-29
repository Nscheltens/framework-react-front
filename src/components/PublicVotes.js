import React, { Component } from 'react';
import axios from 'axios';

const TableBody = props => {
    const rows = props.voteData.map((row, index) => {
        return (
            <tr key={row.id-1}>
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
        axios.get('https://framework-react-api.herokuapp.com/api/frameworks')
        .then(res => {
            const json = res.data;
            this.setState({ votes: json })
        })
        .catch(error => console.log(error))
    }
    render() {
        const { votes } = this.state;
        return (
            <div className="App">
                <h1>Voting Block</h1>
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