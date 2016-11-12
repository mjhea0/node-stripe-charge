(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const productRoutes = require('../routes/products');
    const authRoutes = require('../routes/auth');
    const userRoutes = require('../routes/users');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/products', productRoutes);
    app.use('/auth', authRoutes);
    app.use('/users', userRoutes);

  };

})(module.exports);
