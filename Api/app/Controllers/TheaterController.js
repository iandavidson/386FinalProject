const dbConnection = require('../../database/mySQLconnect');

class TheaterController{
  constructor() {
    console.log("constructing TheaterController");
  }

  async allTheaters(ctx){
    return new Promise((resolve, reject) => {
      let query = `select theaterName, mt.cityName, mt.movieTitle, genre, director, rating, description
                  from moviesAtTheaters mt
                  left join movies on mt.movieTitle = movies.movieTitle;`;
      dbConnection.query(query, (error, tuples, fields) => {
        if (error) {
          return reject(`Connection error in TheaterController::allTheaters`);
        }
        ctx.body = tuples;
        console.log("all cities: returning ", tuples.length, "all Theaters in existence.")
        ctx.status = 200;
        return resolve();
      });
    }).catch(err => {
      console.log("database connection error.", err);
      ctx.status = 500;
      ctx.body = err;
    });
  }
}



module.exports = TheaterController;
