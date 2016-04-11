import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import Home from '../views/components/pages/Home.js';

describe('Home - React components', function() {
  it('contains a form', function() {
    expect(shallow(<Home />).render().find('form')).to.have.length(1);
  });

  it('contains the arrival select disabled', function() {
    expect(shallow(<Home />).render().find('form select[name="arrival"][disabled]')).to.have.length(1);
  });
});
