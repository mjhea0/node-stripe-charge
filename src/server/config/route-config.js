(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const productRoutes = require('../routes/products');
    const authRoutes = require('../routes/auth');
    const userRoutes = require('../routes/users');
    const productAPIRoutes = require('../routes/api/products');
    // const transactionAPIRoutes = require('../routes/api/transactions');
    const userAPIRoutes = require('../routes/api/users');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/products', productRoutes);
    app.use('/auth', authRoutes);
    app.use('/users', userRoutes);
    app.use('/api/v1/products', productAPIRoutes);
    // app.use('/api/v1/transactions', transactionAPIRoutes);
    app.use('/api/v1/users', userAPIRoutes);

  };

})(module.exports);
