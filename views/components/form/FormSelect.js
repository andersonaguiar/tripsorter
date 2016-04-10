import React, { Component } from 'react'

export default class FormSelect extends Component {
  componentDidMount(){ }

  render(){
    let {options, ...props} = this.props

    return (
      <select {...props}>
        <option value="">Selecione</option>
        {
          options.map((option, i) => {
            return <option key={i}>{option}</option>
          })
        }
      </select>
    )
  }
}
