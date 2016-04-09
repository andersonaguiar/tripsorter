import React, { Component } from 'react'
import FormSelect from '../form/FormSelect'

export default class Home extends Component {
  constructor(props){
    super(props)

    this.state = {
      destiny: null
    }
  }

  // static get defaultProps() {
  //   return {
  //     destiny: null
  //   }
  // }

  componentDidMount(){
    this.getDeals();

    // this.setState({ destiny: destiny })
  }

  getDeals(){
    fetch('/api/response.json')
      .then(function(response) {
        return response.json()
          .then(function(response){
            this.setState({
              departures: this.filterDepartures(response.deals)
            });
          }.bind(this))
      }.bind(this)).catch(function(ex) {
        console.log('parsing failed', ex)
      })
  }

  filterDepartures(deals){
    let departures = deals.map((item, i) => {
      return item.departure;
    });

    return departures.filter((item, i) => {
      return departures.indexOf(item) == i;
    });
  }

  getArrivalsByDeparture(departure){

  }

  submit(e){
    e.preventDefault();

    console.log(';D');
  }

  render(){
    if (!this.state.destiny) {
      return null
    }

    return (
      <form action="" onSubmit={this.submit}>
        <div className="row">
          <FormSelect name="from" options={this.state.destiny.departures} />
        </div>
        <div className="row">
          <FormSelect name="to" options={this.state.destiny.arrivals} />
        </div>
        <div className="row">
          <input type="radio" name="condition" value="cheapest" defaultChecked />Cheapest
          <input type="radio" name="condition" value="fastest" />Fastest
        </div>
        <div className="row">
          <input type="submit" value="Search "/>
        </div>
      </form>
    )
  }
}
