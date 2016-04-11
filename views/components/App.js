import React, { Component } from 'react'
import Header from './pages/partials/Header'

export default class App extends Component {
  componentDidMount(){
    document.body.className=''
  }
  render(){
    return (
      <div className="tripsorter">
        <Header />
        { this.props.children }
      </div>
    )
  }
}
