const dbConnection = require('../../database/mySQLconnect');

class MeetingController{
  constructor() {
    console.log("constructing MeetingController");
  }

  async getAdviseeMeetings(ctx){
    return new Promise((resolve, reject) => {
      console.log(ctx.params.advisor_id);
      // const match = ctx.params.student_id.match(/[^0-9]+/);  // We expect an all digit user-id up to length 9.
      // if (match) {
      //     console.log('about to return because user input contains non-digit characters..');
      //     return reject("Incorrect student_id, rejecting."); // send out this message as the response to this call.
      // }

      let query = `select a.id, a.advisor_id, a.advisee_id, a.advisingTime, s.student_fName, s.student_lName from appointment a
                  left join cs386_students s on a.advisee_id = s.student_id
                  where a.advisor_id = ?
                  order by a.advisingTime`;
      dbConnection.query({ //check the top line.
              sql: query,
              values: [ctx.params.advisor_id] //plugs this value into '?'
            }, (error, tuples) => {
              if (error) {
                  return reject("Connection error in getAdviseeMeetings()");
              }
              ctx.body = tuples;
              console.log("expecting one output in tuple: ", tuples.length);
              ctx.status = 200;
              return resolve();
        });
      }).catch(err => console.log("Database connection error.", err));
    }


    async getAdvisorMeetings(ctx){
      return new Promise((resolve, reject) => {
        console.log(ctx.params.advisee_id);
        // const match = ctx.params.student_id.match(/[^0-9]+/);  // We expect an all digit user-id up to length 9.
        // if (match) {
        //     console.log('about to return because user input contains non-digit characters..');
        //     return reject("Incorrect student_id, rejecting."); // send out this message as the response to this call.
        // }

        let query = `select a.id, a.advisor_id, a.advisee_id, a.advisingTime, sa.advisor_fName, sa.advisor_lName from appointment a
                    left join cs386_sanitized_advisors sa on a.advisee_id = sa.student_id
                    where a.advisee_id = ?
                    order by a.advisingTime`;
        dbConnection.query({ //check the top line.
                sql: query,
                values: [ctx.params.advisee_id] //plugs this value into '?'
              }, (error, tuples) => {
                if (error) {
                    return reject("Connection error in getAdvisorMeetings()");
                }
                ctx.body = tuples;
                console.log("expecting one output in tuple: ", tuples.length);
                ctx.status = 200;
                return resolve();
          });
        }).catch(err => console.log("Database connection error.", err));
      }




//   async allTheaters(ctx){
//     return new Promise((resolve, reject) => {
//       let query = `select theaterName, mt.cityName, mt.movieTitle, genre, director, rating, description
//                   from moviesAtTheaters mt
//                   left join movies on mt.movieTitle = movies.movieTitle;`;
//       dbConnection.query(query, (error, tuples, fields) => {
//         if (error) {
//           return reject(`Connection error in AdvisingController::allTheaters`);
//         }
//         ctx.body = tuples;
//         console.log("all cities: returning ", tuples.length, "all Theaters in existence.")
//         ctx.status = 200;
//         return resolve();
//       });
//     }).catch(err => {
//       console.log("database connection error.", err);
//       ctx.status = 500;
//       ctx.body = err;
//     });
//   }
// }


}
module.exports = MeetingController;
