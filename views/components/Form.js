import React, { Component, PropTypes } from 'react'
import FormSelect from './form/FormSelect'

export default class Form extends Component {
  componentDidMount(){ }

  submit(e){
    e.preventDefault()

    let params = {
      departure: this.refs.form.departure.value,
      arrival: this.refs.form.arrival.value,
      sort: this.refs.form.sort.value
    }

    this.props.ee.emitEvent('form-submit', [params]);
  }

  render(){
    if (!this.props.departures) return null

    return (
      <form action="" ref="form" onSubmit={this.submit.bind(this)}>
        <div className="row">
          <FormSelect
            name="departure"
            defaultValue="From"
            options={this.props.departures}
            onChange={this.props.onChange}
          />
        </div>
        <div className="row">
          <FormSelect
            name="arrival"
            defaultValue="To"
            options={this.props.arrivals}
            disabled={this.props.arrivals == false}
          />
        </div>
        <div className="row">
          <input
            id="cheapest"
            type="radio"
            name="sort"
            value="cheapest"
            defaultChecked
          />
          <label className="radio-text" htmlFor="cheapest">Cheapest</label>
          <input type="radio" name="sort" value="fastest" id="fastest" />
          <label className="radio-text" htmlFor="fastest">Fastest</label>
        </div>
        <div className="row">
          <input type="submit" value="Search "/>
        </div>
      </form>
    )
  }
}
