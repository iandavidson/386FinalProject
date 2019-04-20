const Authorize = require('../app/Authorize.js');

/*
|--------------------------------------------------------------------------
| Default router
|--------------------------------------------------------------------------
|
| Default router is used to define any routes that don't belong to a
| controller. Also used as a parent container for the other routers.
|
*/
const router = require('koa-router')({
    prefix: '/api/v1'
});

router.get('/', function (ctx) {
    return ctx.body = 'What is up?';
});



const LoginController = new (require('../app/Controllers/LoginController.js'))(); //create loginController
const loginRouter = require('koa-router')({
    prefix: '/login' //takes cares of the prefix "/api/v1/login/..." this router should handle that.
                     // expects:  /api/v1/login/<user_id>
});
loginRouter.get('/:user_id', LoginController.authorizeUser, (err) => console.log("routers.js: loginRouter error:", err));

//AdviseeController Controller
const AdviseeController = new (require('../app/Controllers/AdviseeController.js'))();
const adviseeRouter = require('koa-router')({
  prefix: '/advisee'
});
adviseeRouter.get('/:student_id', Authorize("student"), AdviseeController.getAdvisor, (err) => console.log("router.js: advisee controller: ", err));




//AdviserController Controller
const AdviserController = new (require('../app/Controllers/AdviserController.js'))();
const adviserRouter = require('koa-router')({
  prefix: '/adviser'
});
adviseeRouter.get('/:advisor_id', Authorize("student"), AdviserController.getAdvisees, (err) => console.log("router.js: adviser controller: ", err));




// TheatersController
// const TheaterController = new (require('../app/Controllers/TheaterController.js'))();
// const theaterRouter = require('koa-router')({
//   prefix: '/theater'
// });
//
// theaterRouter.get('/all-theaters', Authorize('admin'), TheaterController.allTheaters, (err) => console.log(err));
//

router.use(
    '',
    adviseeRouter.routes(),
    adviserRouter.routes(),
    // theaterRouter.routes(),
    loginRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
