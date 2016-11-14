(function (errorConfig) {

  'use strict';

  // *** error handling *** //

  errorConfig.init = function (app) {

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      const err = new Error('Not Found');
      err.status = 404;
      res.status(err.status).render('error', {
        message: 'Not found',
      });
    });

    // development error handler (will print stacktrace)
    if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
        console.log(err.message);
        res.status(err.status || 500).render('error', {
          message: 'Something went wrong',
        });
      });
    }

    // production error handler (no stacktraces leaked to user)
    app.use(function(err, req, res, next) {
      req.flash('messages', {
        status: 'danger',
        value: 'Something went wrong.'
      });
      res.status(err.status || 500).render('error', {
        message: 'Something went wrong',
      });
    });

  };

})(module.exports);
