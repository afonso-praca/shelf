import React from 'react';
import './style.less';
import { Link, History } from 'react-router';
import { stores } from 'sdk';

const Price = stores.ComponentStore.state.getIn(['Price@vtex.storefront-sdk', 'constructor']);
const Img = stores.ComponentStore.state.getIn(['Img@vtex.storefront-sdk', 'constructor']);

class Product extends React.Component {
  static contextTypes = History.contextTypes

  _handleDetails = (ev) => {
    ev.preventDefault();
    this.context.history.pushState(null, `/${this.props.slug}/p`);
  }

  render() {
    let display = this.props.isVisible ? 'block' : 'none';
    let defaultSku = this.props.skus[0];
    let name = this.props.name;
    let imageUrl = defaultSku.images.length > 0 ? defaultSku.images[0].src : 'http://placehold.it/200x235';
    let price = defaultSku.offers[0].price;

    return (
      <div className="ShelfProduct col-xs-12 col-sm-6 col-md-4 col-lg-4" style={{display: display}}>
        <Img className="ShelfProduct__photo" src={imageUrl} width={200} height={235} />
        <Link to={`/${this.props.slug}/p`} className="ShelfProduct__title">{name}</Link>
        <p className="ShelfProduct__price">
          <Price value={price}/>
        </p>
        <button className="ShelfProduct__btn" onTouchTap={this._handleDetails.bind(this)}>
          Ver detalhes
        </button>
      </div>
    );
  }
}

export default Product;