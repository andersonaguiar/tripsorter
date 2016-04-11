import React, { Component, PropTypes } from 'react'

export default class Result extends Component {
  componentDidMount(){ }

  render(){
    if (!this.props.results) return null

    return (
      <table className="results">
        <thead>
          <tr>
            <th>Ref</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Cost ({this.props.currency})</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.results.map((trip, i) => {
              return <tr key={i}>
                <td>{trip.reference}</td>
                <td>{trip.departure}</td>
                <td>{trip.arrival}</td>
                <td>{trip.cost}</td>
                <td>{trip.duration.h}:{trip.duration.m}</td>
              </tr>
            })
          }
        </tbody>
      </table>
    )
  }
}
