import React from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MenuItem from '../menu-item/menu-item.component';
import './directory.styles.scss'; 
import { selectDirectorySections } from './directory.selectors';


const Directory = ({ sections }) => {
  
    return (
      <div className='directory-menu'>
        { // section was destructured to {title, imageUrl, id, size, linkUrl}, then ...otherSectionProps = {title, imageUrl, size, linkUrl} 
          sections.map(({ id, ...otherSectionProps}) => (
            <MenuItem key={id} {...otherSectionProps}/>
          ))}
      </div>
    );
  }

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory);