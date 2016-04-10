import React, { Component } from 'react'
import FormSelect from '../form/FormSelect'

export default class Home extends Component {
  constructor(props){
    super(props)

    this.state = {
      departures: [],
      arrivals: []
    }
  }

  componentDidMount(){
    this.getDeals()
  }

  getDeals(){
    fetch('/api/response.json')
      .then(function(response) {
        return response.json()
          .then(function(response){
            this.setState({
              currency: response.currency,
              deals: response.deals,
              departures: this.filterDepartures(response.deals)
            })
          }.bind(this))
      }.bind(this)).catch(function(ex) {
        console.log('parsing failed', ex)
      })
  }

  filterDepartures(deals){
    let departures = deals.map((item, i) => {
      return item.departure
    })

    return departures.filter((item, i) => {
      return departures.indexOf(item) == i
    })
  }

  filterArrivalsByDeparture(deals, departure){
    let arrivals = deals.filter((item, i) => {
      return item.departure == departure
    }).map((item, i) => {
      return item.arrival
    })

    return arrivals.filter((item, i) => {
      return arrivals.indexOf(item) == i
    })
  }

  getArrivalsByDeparture(e){
    this.setState({
      arrivals: this.filterArrivalsByDeparture(this.state.deals, e.target.value)
    })
  }

  submit(e){
    e.preventDefault()

    let params = {
      departure: this.refs.form.departure.value,
      arrival: this.refs.form.arrival.value,
      sort: this.refs.form.sort.value
    }

    this.setState({
      results: this.search(params)
    })
  }

  sortResults(type, results){
    switch (type) {
      case 'cheapest':
          results.sort((a, b) => {
            return parseFloat(a.cost) - parseFloat(b.cost);
          })
        break;
      case 'fastest':
        results.sort((a, b) => {
          let timeA = a.duration.h * 60 + a.duration.m
          let timeB = b.duration.h * 60 + b.duration.m
          return timeA - timeB;
        })
        break;
    }

    return results;
  }

  search(params){
    let deals = this.state.deals
    let results = deals.filter((item, i) => {
      return item.departure == params.departure &&
             item.arrival == params.arrival
    })

    return this.sortResults(params.sort, results);
  }

  showForm(){
    return (
      <form action="" ref="form" onSubmit={this.submit.bind(this)}>
        <div className="row">
          <FormSelect
            name="departure"
            options={this.state.departures}
            onChange={this.getArrivalsByDeparture.bind(this)}
          />
        </div>
        <div className="row">
          <FormSelect
            name="arrival"
            options={this.state.arrivals}
            disabled={this.state.arrivals == false}
          />
        </div>
        <div className="row">
          <input
            type="radio"
            name="sort"
            value="cheapest"
            defaultChecked
          />
          Cheapest
          <input type="radio" name="sort" value="fastest" />Fastest
        </div>
        <div className="row">
          <input type="submit" value="Search "/>
        </div>
      </form>
    )
  }

  showResults(){
    if (!this.state.results) return null;

    return (
      <table>
        <thead>
          <tr>
            <th>Ref</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Cost ({this.state.currency})</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.results.map((trip, i) => {
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

  render(){
    if (!this.state.departures) return null

    return (
      <div>
        {this.showForm()}
        {this.showResults()}
      </div>
    )
  }
}
