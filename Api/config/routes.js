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
adviseeRouter.get('/lock/:advisor_id', Authorize("student"), AdviseeController.getLock, (err) => console.log("router.js: advisor controller: ", err));
adviseeRouter.get('/preference/:advisor_id', Authorize("student"), AdviseeController.getAdvisorPreferences, (err) => console.log("router.js: advisor controller: ", err));
//




//AdvisorController
const AdvisorController = new (require('../app/Controllers/AdvisorController.js'))();
const advisorRouter = require('koa-router')({
  prefix: '/advisor'
});
advisorRouter.get('/:advisor_id', Authorize("advisor"), AdvisorController.getAdvisees, (err) => console.log("router.js: advisor controller: ", err));
advisorRouter.get('/preferences/:id', Authorize("advisor"), AdvisorController.getPreferences, (err) => console.log("router.js: advisor controller: ", err));
advisorRouter.get('/lockDays/:advisor_id', Authorize("adivsor"), AdvisorController.getLockForAdvisor, (err) => console.log("router.js: advisor controller ", err));
advisorRouter.post('/postLockDays/:advisor_id/:lockDays', Authorize("adivsor"), AdvisorController.PostLockDays, (err) => console.log("router.js: advisor controller ", err));



//MeetingController
const MeetingController = new (require('../app/Controllers/MeetingController.js'))();
const meetingRouter = require('koa-router')({
  prefix: '/meeting'
});
meetingRouter.get('/advisor/:advisor_id', Authorize("advisor"), MeetingController.getAdviseeMeetings, (err) => console.log("router.js: meeting controller: ", err));
meetingRouter.get('/advisee/:advisee_id', Authorize("student"), MeetingController.getAdvisorMeetings, (err) => console.log("router.js: meeting controller: ", err));

//submit a new record from student.
meetingRouter.post('/postAdvisee/:advisor_id/:advisee_id/:advisingTime', Authorize("student"), MeetingController.postAdviseeMeeting, (err) => console.log("router.js: meeting controller: ", err));
//submit new record from advisor
meetingRouter.post('/postAdvisor/:advisor_id/:advisee_id/:advisingTime', Authorize("advisor"), MeetingController.postAdvisorMeeting, (err) => console.log("router.js: meeting controller: ", err));
// will post a AdvisingPreferences record //:advisor_id/:advisee_id/:advisingTime
meetingRouter.post('/postPreference/:advisor_id/:dayOfWeek/:startTime/:meetingLength/:numberOfSessions', Authorize("advisor"), MeetingController.postPreference, (err) => console.log("router.js: meeting controller: ", err));

//update meeting, addNote
meetingRouter.post('/addNote/:id/:meetingNotes', Authorize("advisor"), MeetingController.updateMeetingNote, (err) => console.log("router.js: meeting controller: ", err));
//update meeting, decline
meetingRouter.post('/decline/:id', Authorize("advisor"), MeetingController.updateDecline, (err) => console.log("router.js: meeting controller: ", err));

//delete record for student
meetingRouter.post('/advisee/delete/:id', Authorize("student"), MeetingController.deleteAppointment, (err) => console.log("router.js: meeting controller: ", err));
//delete record for advisor
meetingRouter.post('/advisor/delete/:id', Authorize("advisor"), MeetingController.deleteAppointment, (err) => console.log("router.js: meeting controller: ", err));
//delete preference-day for advisor
meetingRouter.post('/advisor/deletePreference/:id', Authorize("advisor"), MeetingController.deletePreference, (err) => console.log("router.js: meeting controller: ", err));


// TheatersController
// const TheaterController = new (require('../app/Controllers/TheaterController.js'))();
// const theaterRouter = require('koa-router')({
//   prefix: '/theater'
// });
//
// theaterRouter.get('/all-theaters', Authorize('admin'), TheaterController.allTheaters, (err) => console.log(err));


router.use(
    '',
    adviseeRouter.routes(),
    advisorRouter.routes(),
    meetingRouter.routes(),
    loginRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
