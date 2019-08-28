import React, { Component } from 'react'

const TableHeader = () => {
    return (
      <thead>
        <tr>
          <th>Framework Name</th>
          <th>Total Watchers</th>
          <th>Total Stars</th>
          <th>Total Forks</th>
        </tr>
      </thead>
    )
}
const TableBody = props => {
    const rows = props.frameworkData.map((row, index) =>{
        return (
            <tr key={index}>
                <td>{row.name}</td>
                <td>{row.subscribers_count}</td>
                <td>{row.watchers_count}</td>
                <td>{row.forks_count}</td>
            </tr>
        )
    })
    return <tbody>{rows}</tbody>
  }

  class Table extends Component {
    render() {
        const { frameworkData } = this.props
        return (
            <table>
                <TableHeader />
                <TableBody  frameworkData={frameworkData} />
            </table>
        )
    }
  }
export default Table;