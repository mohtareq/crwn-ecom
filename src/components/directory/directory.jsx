import React from 'react';
import { connect } from 'react-redux';
import { selectDirectorySections } from '../../redux/directory/dircetory.selectors.js';
import { createStructuredSelector } from 'reselect';
import MenuItem from '../menu-item/menu-item';

import { DirectoryMenuContainer } from './directory.styles';
const Directory = ({ sections }) => (
  <DirectoryMenuContainer>
    {sections.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </DirectoryMenuContainer>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);