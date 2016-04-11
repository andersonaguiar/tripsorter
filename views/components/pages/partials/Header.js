import React, { Component } from 'react'

export default class Header extends Component {
  render(){
    return (
      <header className="header">
        <h1 className="header-logo">
          <span className="none">MyCRM</span>
        </h1>
        <h2 className="header-text">Tripsorter</h2>
      </header>
    )
  }
}
