const withAuth = (req,res,next) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
        console.log("not login");
      } else {
        next();
        console.log("login-next");
      }
};


module.exports =withAuth;