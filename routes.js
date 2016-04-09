import React, { Component } from 'react'
import { Route, IndexRoute, Link } from 'react-router'

// pages
import App from './views/components/App'
import Home from './views/components/pages/Home'
import NotFound from './views/components/pages/NotFound'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="*" component={NotFound} />
  </Route>
)
