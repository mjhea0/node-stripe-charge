(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const productRoutes = require('../routes/products');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/products', productRoutes);

  };

})(module.exports);
