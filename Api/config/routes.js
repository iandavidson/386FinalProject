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

//AdviserController
const AdviserController = new (require('../app/Controllers/AdviserController.js'))();
const adviserRouter = require('koa-router')({
  prefix: '/adviser'
});
adviserRouter.get('/:advisor_id', Authorize("advisor"), AdviserController.getAdvisees, (err) => console.log("router.js: adviser controller: ", err));


//MeetingController
const MeetingController = new (require('../app/Controllers/MeetingController.js'))();
const meetingRouter = require('koa-router')({
  prefix: '/meeting'
});
meetingRouter.get('/:advisor_id', Authorize("advisor"), MeetingController.getAdviseeMeetings, (err) => console.log("router.js: meeting controller: ", err));
meetingRouter.get('/:advisee_id', Authorize("student"), MeetingController.getAdvisorMeetings, (err) => console.log("router.js: meeting controller: ", err));
//submit a new record from student.
meetingRouter.post('/:advisee_id', Authorize("student"), MeetingController.postAdvisorMeetings, (err) => console.log("router.js: meeting controller: ", err));
//submit new record from adviser
meetingRouter.post('/:advisor_id', Authorize("advisor"), MeetingController.postAdviseeMeetings, (err) => console.log("router.js: meeting controller: ", err));

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
    meetingRouter.routes(),
    // theaterRouter.routes(),
    loginRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
