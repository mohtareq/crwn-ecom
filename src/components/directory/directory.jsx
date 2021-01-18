import React from 'react';
import { connect } from 'react-redux';
import { selectDirectorySections } from '../../redux/directory/dircetory.selectors.js';
import { createStructuredSelector } from 'reselect';
import MenuItem from '../menu-item/menu-item';

import './directory.scss';

const Directory = ({ sections }) => (
  <div className='directory-menu'>
    {sections.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);