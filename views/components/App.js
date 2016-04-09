import React, { Component } from 'react'

export default class App extends Component {
  componentDidMount(){
    document.body.className=''
  }
  render(){
    return (
      <div className="pf-tripsorter">
        <h1>Tripsorter</h1>
        { this.props.children }
      </div>
    )
  }
}
