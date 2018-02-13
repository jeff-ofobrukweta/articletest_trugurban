/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
  
  
  '/': {
    view: 'homepage'
  },
  '/pay': {
    view: 'pay'
  },
  '/edit': {
    view: 'editvideo'
  },
  '/adexcercise': {
    view: 'adexcercise'
  },
  '/update': {
    view: 'changepassword'
  },
  'POST /create': {
    controller: 'UserController',
    action: 'create',
    cors: {
      origin: 'http://foobar.com,https://owlhoot.com'
    }
  },
  'GET /logout': {
    controller: 'AuthControllerControllerController',
    action: 'logout',
    cors: {
      origin: 'http://foobar.com,https://owlhoot.com'
    }
  },
  'POST /addOuestions/:id': {
    controller: 'NaterialschemaController',
    action: 'addOuestions',
    cors: {
      origin: 'http://foobar.com,https://owlhoot.com'
    }
  },
  'POST /login': {
    controller: 'AuthControllerControllerController',
    action: 'login'
  },
  'DELETE /destroyUser/:id': {
    controller: 'UserController',
    action: 'destroyUser',
    cors: {
      origin: 'http://foobar.com,https://owlhoot.com'
    }
  },
  'POST /api/v1/auth/facebook': {
    controller: 'AuthControllerControllerController',
    action: 'facebookAuth'
  },
  'GET /api/v1/auth/facebook/callback': {
    controller: 'AuthControllerControllerController',
    action: 'facebookCallback'
  },
  'POST /authenticate': {
    controller: 'AuthControllerControllerController', 
    action: 'authenticate'
  },
  'GET /authcallback': {
    controller: 'AuthControllerControllerController',
    action: 'authcallback'
  },
  'POST /forgotpassword': {
    controller: 'UserController',
    action: 'forgotpassword'
  },
  'POST /updateUserwithname': {
    controller: 'UserController',
    action: 'updateUserwithname'
  },
  'GET /all': {
    controller: 'UserController',
    action: 'All'
  },
  'POST /sendmailgun': {
    controller: 'NodemailerController',
    action: 'sendmailgun'
  },
  'POST /nodemailer': {
    controller: 'NodemailerController',
    action: 'forgot_password'
  },
  'GET /reset': {
    controller: 'UserController',
    action: 'view'
  },
  'GET /Allintermediate': {
    controller: 'NaterialschemaController',
    action: 'Allintermediate'
  },
  'GET /findintermediate': {
    controller: 'NaterialschemaController',
    action: 'findintermediate'
  },
  'GET /french': {
    controller: 'NaterialschemaController',
    action: 'french'
  },

  'POST /upload_content': {
    controller: 'Upload_contentController',
    action: 'upload_content'
  },
  'POST /upload_video': {
    controller: 'Upload_contentController',
    action: 'upload_video'
  },
  'POST /updatenew': {
    controller: 'UserController',
    action: 'updatenew'
  },
  'GET /showallvideos': {
   controller: 'Upload_contentController',
    action: 'showallvideos'
  },
  'GET /Allquestionmodel': {
    controller: 'NaterialschemaController',
     action: 'Allquestionmodel'
   },
  'POST /Videoscreate': {
    controller: 'NaterialschemaController',
    action: 'Videoscreate',
    cors: {
      origin: 'http://foobar.com,https://owlhoot.com'
    },
  },
    'POST /findonethroughEmail': {
      controller: 'UserController',
      action: 'findonethroughEmail',
      cors: {
        origin: 'http://foobar.com,https://owlhoot.com'
      }
    },
    'GET /Allvideos': {
        controller: 'NaterialschemaController',
        action: 'Allvideos',
        cors: {
          origin: 'http://foobar.com,https://owlhoot.com'
        }
  },
  'GET /All': {
    controller: 'UserController',
    action: 'All'
  },
  'POST /forgot_password': {
    controller: 'NodemailerController',
    action: 'forgot_password'
  },
  'POST /updateUser/:id': {
    controller: 'UserController',
    action: 'updateUser'
  },

  'POST /subquestionscreate': {
    controller: 'NaterialschemaController',
    action: 'subquestionscreate'
  },

// this section is the route configuration for updating the information on the application via the api


//this is the route for paystack payment services
'GET /listcustomers': {
  controller: 'Payment_servicesController',
  action: 'listcustomers'
},
'POST /payingcustomers': {
  controller: 'Payment_servicesController',
  action: 'payingcustomers'
},
  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
