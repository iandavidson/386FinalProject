const dbConnection = require('../../database/mySQLconnect');

class AdviseeController{
  constructor() {
    console.log("constructing AdviseeController");
  }

  async getAdvisor(ctx){
    return new Promise((resolve, reject) => {
      console.log(ctx.params.student_id);
      // const match = ctx.params.student_id.match(/[^0-9]+/);  // We expect an all digit user-id up to length 9.
      // if (match) {
      //     console.log('about to return because user input contains non-digit characters..');
      //     return reject("Incorrect student_id, rejecting."); // send out this message as the response to this call.
      // }

      let query = `select advisor_fName, advisor_lName, advisor_id
                  from cs386_sanitized_advisors where student_id = ?`;
      dbConnection.query({ //check the top line.
              sql: query,
              values: [ctx.params.student_id] //plugs this value into '?'
            }, (error, tuples) => {
              if (error) {
                  return reject("Connection error in getAdvisor()");
              }
              ctx.body = tuples;
              console.log("expecting one output in tuple: ", tuples.length);
              ctx.status = 200;
              return resolve();
        });
      }).catch(err => console.log("Database connection error.", err));
    }


//delete appointment if we are not in a locked day.
  // async deleteAppointment(ctx){
  //   return new Promise((resolve, reject) => {
  //     console.log(ctx.params.id);
  //     // const match = ctx.params.student_id.match(/[^0-9]+/);  // We expect an all digit user-id up to length 9.
  //     // if (match) {
  //     //     console.log('about to return because user input contains non-digit characters..');
  //     //     return reject("Incorrect student_id, rejecting."); // send out this message as the response to this call.
  //     // }
  //
  //     let query = `select advisor_fName, advisor_lName, advisor_id
  //                 from cs386_sanitized_advisors where student_id = ?`;
  //     dbConnection.query({ //check the top line.
  //             sql: query,
  //             values: [ctx.params.student_id] //plugs this value into '?'
  //           }, (error, tuples) => {
  //             if (error) {
  //                 return reject("Connection error in getAdvisor()");
  //             }
  //             ctx.body = tuples;
  //             console.log("expecting one output in tuple: ", tuples.length);
  //             ctx.status = 200;
  //             return resolve();
  //       });
  //     }).catch(err => console.log("Database connection error.", err));
  // }


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
module.exports = AdviseeController;
