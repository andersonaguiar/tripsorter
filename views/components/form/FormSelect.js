import React, { Component, PropTypes } from 'react'

export default class FormSelect extends Component {
  componentDidMount(){ }

  render(){
    let {defaultValue, options, ...props} = this.props

    return (
      <select {...props}>
        <option value="">{defaultValue}</option>
        {
          options.map((option, i) => {
            return <option key={i}>{option}</option>
          })
        }
      </select>
    )
  }
}

FormSelect.propTypes = {
  defaultValue: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array
}
