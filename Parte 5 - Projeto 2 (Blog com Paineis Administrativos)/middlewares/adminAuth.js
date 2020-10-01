function adminAuth(req, res, next) {
    if (req.session.user != undefined) {  //Uusario autenticado/Logado
        next();
    }
    else {
        res.redirect("/login");
    }
}

module.exports = adminAuth;