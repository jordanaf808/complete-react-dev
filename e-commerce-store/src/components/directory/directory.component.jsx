// Don't need to import React, {Component} from 'react'; because
// it already exists in this shorter version
import React from 'react';

import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';

// this will need to be a class component because we need to 
// store the 'State' of the menu-items here.

class Directory extends React.Component {
  // always need to get all capabilities >>>
  constructor() {
    super();
    // always set State values
    this.state = {
      sections: [
        {
          title: 'hats',
          imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
          id: 1
        },
        {
          title: 'jackets',
          imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
          id: 2
        },
        {
          title: 'sneakers',
          imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
          id: 3
        },
        {
          title: 'womens',
          imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
          size: 'large',
          id: 4
        },
        {
          title: 'mens',
          imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
          size: 'large',
          id: 5
        }
      ]
    }

  }

  render() {
    return (
      <div className='directory-menu'>
        {
          this.state.sections.map(({title, imageUrl, id, size}) => (
            <MenuItem key={id} title={title} imageUrl={imageUrl} size={size}/>
          ))
        }
      </div>
    )
  }
}

export default Directory;