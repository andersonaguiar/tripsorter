import React, { Component } from 'react'
import Form from '../Form'
import Result from '../Result'
import EventEmitter from 'wolfy87-eventemitter'

const ee = new EventEmitter()

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

    ee.addListener('form-submit', this.submit.bind(this));
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

  submit(params){
    this.setState({
      results: this.search(params)
    })
  }

  sortResults(type, results){
    switch (type) {
      case 'cheapest':
          results.sort((a, b) => {
            return parseFloat(a.cost) - parseFloat(b.cost)
          })
        break
      case 'fastest':
        results.sort((a, b) => {
          let timeA = a.duration.h * 60 + a.duration.m
          let timeB = b.duration.h * 60 + b.duration.m
          return timeA - timeB
        })
        break
    }

    return results
  }

  search(params){
    let deals = this.state.deals
    let results = deals.filter((item, i) => {
      return item.departure == params.departure &&
             item.arrival == params.arrival
    })

    return this.sortResults(params.sort, results)
  }


  render(){
    return (
      <div>
        <Form
          onChange={this.getArrivalsByDeparture.bind(this)}
          departures={this.state.departures}
          arrivals={this.state.arrivals}
          ee={ee}
        />
        <Result
          results={this.state.results}
          currency={this.state.currency}
        />
      </div>
    )
  }
}
