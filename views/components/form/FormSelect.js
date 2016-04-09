import React, { Component } from 'react'

export default class FormSelect extends Component {
  componentDidMount(){

  }

  render(){
    let options = this.props.options.map((option, i) => {
      return React.createElement('option', {key: i}, option)
    })

    return (
      <select name={this.props.name}>
        {options}
      </select>
    )
  }
}
