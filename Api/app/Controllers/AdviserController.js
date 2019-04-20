const dbConnection = require('../../database/mySQLconnect');

class AdviserController{
  constructor() {
    console.log("constructing AdviserController");
  }

  async getAdvisees(ctx){
    return new Promise((resolve, reject) => {
      console.log(ctx.params.advisor_id);
      // const match = ctx.params.student_id.match(/[^0-9]+/);  // We expect an all digit user-id up to length 9.
      // if (match) {
      //     console.log('about to return because user input contains non-digit characters..');
      //     return reject("Incorrect student_id, rejecting."); // send out this message as the response to this call.
      // }

      let query = `select s.student_fName, s.student_lName, s.student_id
from cs386_sanitized_advisors sa
left join cs386_students s on s.student_id = sa.student_id
where sa.advisor_id = ?`;
      dbConnection.query({ //check the top line.
              sql: query,
              values: [ctx.params.advisor_id] //plugs this value into '?'
            }, (error, tuples) => {
              if (error) {
                  return reject("Connection error in getAdvisees()");
              }
              ctx.body = tuples;
              console.log("expecting many outputs in tuple: ", tuples.length);
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
module.exports = AdviserController;
