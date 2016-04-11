import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import App from '../views/components/App.js';
import Header from '../views/components/pages/partials/Header.js';

describe('App - React components', function() {
  it('contains a div with class tripsorter', function() {
    expect(shallow(<App />).is('.tripsorter')).to.equal(true);
  });

  it('contains a header component', function() {
    expect(shallow(<App />).contains([
      <Header />
    ])).to.equal(true);

  });
});
