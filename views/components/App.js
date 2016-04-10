import React, { Component } from 'react'

export default class App extends Component {
  componentDidMount(){
    document.body.className=''
  }
  render(){
    return (
      <div className="tripsorter">
        <header className="header">
          <h1 className="header-logo">
            <span className="none">MyCRM</span>
          </h1>
          <h2 className="header-text">Tripsorter</h2>
        </header>
        { this.props.children }
      </div>
    )
  }
}
