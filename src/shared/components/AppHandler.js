import React from 'react';
import { Router, Link } from 'react-router';
import { history } from 'react-router/lib/HashHistory';


var pictures = [
  {descr: 'Стильный и модный', title: 'Iphone 6', id: 0, src: 'http://content2.onliner.by/catalog/device/header/5c89a202887278d66e83e9ea119a537d.jpg'},
  {descr: 'Стильный и модный 2', title: 'Iphone 5s', id: 1, src: 'http://content2.onliner.by/catalog/device/header/f16849c646ec7b06d7ceaa62c1a1b883.jpg'},
  {descr: 'Стильный и модный 3', title: 'Iphone 5', id: 2, src: 'http://content2.onliner.by/catalog/device/header/98b010c3ae263120c548aa3856fefc2f.jpg'},

];

var App = React.createClass({
  render () {
    return (
      <div className="container">
        <h1>Каталог смартфонов</h1>
        <p>
          Все представленные модели есть в продаже.
        </p>



        {this.props.children}
      </div>
    );
  }
});

var Feed = React.createClass({

  overlayStyles: {
    position: 'fixed',
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
    padding: 20,
    boxShadow: '0px 0px 50px 30px rgba(0, 0, 0, 0.5)',
    overflow: 'auto',
    background: '#fff'
  },

  render () {
    return (
      <div>
        <div>
          {pictures.map(picture => (
           <div className="col-sm-4 col-md-4">
                <div className="thumbnail">
                    <img src={picture.src} height="100" alt="..."/>
                    <div className="caption">
                        <h3>{picture.title}</h3>
                        <p>{picture.descr}</p>
                        <p><Link to={`/pictures/${picture.id}`}
              state={{fromFeed: true}} className="btn btn-primary" role="button">Подробнее</Link></p>
                    </div>
                </div>
            </div>
           
           

          ))}
        </div>
        {this.props.children && (
          <div style={this.overlayStyles}>
            {this.props.children}
          </div>
        )}
      </div>
    );
  }
});

var FeedPicture = React.createClass({
  render () {
    return (
      <div>
        <h2>Карточка товара {pictures[this.props.params.id].title}</h2>
        <Link type="button" className="btn btn-info" to="/">back</Link>
        <p>
          <img src={pictures[this.props.params.id].src} height="300"/>
        </p>
      </div>
    );
  }
});

var Picture = React.createClass({
  render () {
    return (
      <div>
        <h2><h2>Страница товара {pictures[this.props.params.id].title}</h2></h2>
        <Link to="/">Feed</Link>
        <p>
          <img height="300" src={pictures[this.props.params.id].src}/>
        </p>
      </div>
    );
  }
});

var FeedPictureRoute = {
  path: '/pictures/:id',
  component: FeedPicture
};

var FeedRoute = {
  component: Feed,
  childRoutes: [ FeedPictureRoute ],
};

var PictureRoute = {
  path: '/pictures/:id',
  component: Picture
};

var RootRoute = {
  path: '/',
  component: App,
  indexRoute: FeedRoute,

  getChildRoutes (state, cb) {
    if (state && state.fromFeed) {
      cb(null, [ FeedRoute ]);
    }
    else {
      cb(null, [ PictureRoute ]);
    }
  }
};
