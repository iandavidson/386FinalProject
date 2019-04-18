const dbConnection = require('../../database/mySQLconnect');

require('dotenv').config();

class LoginController {
    async authorizeUser(ctx) {//ctx gets passed in here from routes.js
        return new Promise((resolve, reject) => {

            //shouldnet this be a string.
            const match = ctx.params.user_id.match(/[^0-9]+/);  // We expect an all digit user-id.
            if (match) {
                console.log('about to return because user input contains non-digit characters..');
                return reject("Incorrect login credentials."); // send out this message as the response to this call.
            }
            let query = "select * from advisingUsers where login_id = ?"; // look at the ? mark
      	    console.log('About to run this query.', query);
      	    console.log('ctx.params.user_id is', ctx.params.user_id);
            dbConnection.query( //check the top line.
                {
                    sql: query,
                    values: [ctx.params.user_id] //plugs this value into '?'
                }, (error, tuples) => {
                    if (error) {
                        return reject(error);
                    }
                    if (tuples.length === 1) {
                        console.log('from LoginController. About to return ', tuples[0]);
                        ctx.body = {
                            status: "OK",
                            user: tuples[0],
                        };
                        return resolve();
                    }
                    return reject("No such user.");
                }
            )
        }).catch(err => {
            ctx.body = {
                status: "Failed",
                error: err,
                user: null
            };
        });

    }

}

module.exports = LoginController; //when you say "require" -> whatever was exported here (logincontroller) is grabbed when invoked from other JS file.
