import React, { Component } from 'react'
import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss'; 


class Directory extends Component {
  constructor() {
    super();

    this.state = {
      sections: [
        {
          title: 'HATS',
          imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
          id: 1,
          linkUrl: 'shop/hats'
        },
        {
          title: 'JACKETS',
          imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
          id: 2,
          linkUrl: 'shop/jackets'
        },
        {
          title: 'SNEAKERS',
          imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
          id: 3,
          linkUrl: 'shop/sneakers'
        },
        {
          title: 'WOMENS',
          imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
          size: 'large',
          id: 4,
          linkUrl: 'shop/womens'
        },
        {
          title: 'MENS',
          imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
          size: 'large',
          id: 5,
          linkUrl: 'shop/mens'
        }
      ]
    }
  }
  
  render() {
    return (
      <div className='directory-menu'>
        { // section was destructured to {title, imageUrl, id}
          this.state.sections.map(({ title, imageUrl, id }) => (
            <MenuItem key={id} title={title} imageUrl={imageUrl}/>
          ))}
      </div>
    );
  }
}

export default Directory;