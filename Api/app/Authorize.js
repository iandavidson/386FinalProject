
module.exports = (min_type) => { //arguement coming in is 'admin' or 'student'
    return (ctx, next) => { //  next() is passed through as a
                            //  parameter as the controller->method from route/url
        console.log('min_type in authorize is', min_type);
	// if (min_type !== 'admin') {
  //               return false;//returns not found, should be a 401.2 error code not 404
  //       }
  //       return next();
        return next();
    };
};
