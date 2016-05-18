import { editable } from 'vtex-editor';
import React from 'react';
import './Shelf.less';
import './ShelfCustom.less';
import ShelfPlaceholder from './ShelfPlaceholder/ShelfPlaceholder';
import ShelfSlider from './ShelfSlider/ShelfSlider';

@editable({
  name: 'Shelf@pilateslovers.shelf',
  title: 'Shelf'
})
class Shelf extends React.Component {
  render() {
    return !this.props.settings
        ? <div className="Shelf"><ShelfPlaceholder title="Destaques"/></div>
        : <div className="Shelf"><ShelfSlider {...this.props}/></div>
  }
}

export default Shelf;
