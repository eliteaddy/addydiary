/**
 * @author: Adesile Isaiah Ayomide
 * aka: MasterAddy
 * Portfolio: https://eliteaddy.github.io
 */

module.exports = {
    ensureAuthenticated : (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', 'Please you have to Login to view this page');
        res.redirect('/user/login');
    },
    sessionChecker : (req, res, next) => {
        if (req.isAuthenticated()) {
            res.redirect('/user/dashboard')
        } else {
            next();
        }
    }
};