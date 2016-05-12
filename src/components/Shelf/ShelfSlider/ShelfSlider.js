import React from 'react';
import './ShelfSlider.less';
import { stores, actions, connectToStores } from 'sdk';
import Immutable from 'immutable';
import Slider from 'react-slick';
import ShelfProduct from '../ShelfProduct/ShelfProduct';
import 'utils/slick/slick.less';
import 'utils/slick/slick-theme.less';

const Link = stores.ComponentStore.getState().getIn(['Link@vtex.storefront-sdk', 'constructor']);

const getSearchParams = (settings) => {
  return Immutable.Map({
    category: settings.get('category'),
    collection: settings.get('collection'),
    pageSize: settings.get('quantity')
  });
}

@connectToStores()
class ShelfSlider extends React.Component {
  static getStores() {
    return [stores.SearchStore];
  }

  static getPropsFromStores(props) {
    const location = stores.ContextStore.getState().get('location');
    const currentURL = location.pathname + location.search;
    const query = getSearchParams(props.settings);
    const availableQuery = query.set('availableOnly', true);
    const searchStore = stores.SearchStore.getState();
    const results = searchStore.getIn([availableQuery, 'results']);
    let productsIds = searchStore.getIn([currentURL, props.id, 'results']);

    productsIds = results ? results : productsIds;

    const products = productsIds ? stores.ProductStore.getProducts(productsIds) : [];
    return {
      products: products
    };
  }

  componentDidMount() {
    const query = getSearchParams(this.props.settings);
    const availableQuery = query.set('availableOnly', true);
    const searchStore = stores.SearchStore.getState();
    const loading = searchStore.getIn([availableQuery, 'loading']);

    if (!loading) {
      const results = searchStore.getIn([availableQuery, 'results']);
      if (!results) {
        setTimeout(() => actions.SearchActions.requestSearch(availableQuery));
      }
    }
  }

  shouldComponentUpdate() {
    const loading = stores.ContextStore.getState().get('loading');
    return !loading;
  }

  render() {
    const { products } = this.props;
    const desktopQty = this.props.settings.get('desktopQty');
    const tabletQty = this.props.settings.get('tabletQty');
    const title = this.props.settings.get('title') || '';
    const desktopSlidesQty = desktopQty ? desktopQty : 4;
    const tabletSlidesQty = tabletQty ? tabletQty : 2;
    const category = this.props.settings.get('category');
    const path = category ? '/' + category.toLowerCase().replace(/ /g, '-') + '/c': null;
    const link = path ?
      (
        <Link to={path}>
          <span className="ShelfSlider__detail">
            Ver todos
          </span>
        </Link>
      ) :
      null;

    const slickSettings = {
      dots: false,
      arrows: true,
      autoplay: false,
      infinite: true,
      draggable: false,
      slidesToShow: desktopSlidesQty,
      slidesToScroll: desktopSlidesQty,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            draggable: true,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 992,
          settings: {
            arrows: false,
            draggable: true,
            slidesToShow: tabletSlidesQty,
            slidesToScroll: tabletSlidesQty
          }
        }
      ]
    };

    return (
      <div>
        <div className="ShelfSlider__section clearfix">
          {
            title ? (
              <span className="ShelfSlider__section-title pull-left">{title}</span>
            ) : ''
          }
          <div className="ShelfSlider__section-link pull-left">{link}</div>
        </div>
        <div className="ShelfSlider clearfix">
          <div className="row-fluid">
            <Slider {...slickSettings}>
              {
                products ?
                  products.map(product => {
                    return (
                      <div key={product.slug}>
                        <ShelfProduct {...product} />
                      </div>
                    );
                  }) :
                  <div>Carregando</div>
              }
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

export default ShelfSlider;
