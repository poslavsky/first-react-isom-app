import express from "express";
import React from "react";
import Router from "react-router";
import Location from 'react-router/lib/Location';
const app = express();

// set up Jade
app.set('views', './views');
app.set('view engine', 'jade');

import routes from "../shared/routes";

app.get('/', function (req, res) {
  var location = new Location(req.path, req.query);
  Router.run(routes, location, (error, initialState, transition) => {
    fetchSomeData(initialState.components, (error, initialData) => {
        var content = React.renderToString(<Router {...initialState}/>);
        res.render('index', { content: content });
    });
});
});
  

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
