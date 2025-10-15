// middlewares/auth.js

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect("/user/login"); // Redirige vers login
}


function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.isAdmin === true) {
        return next();
    } 
    console.log(req.session.user)
    res.status(403).send('Accès refusé');
}

function authenticateToken(req,res,next){
    const authHeader = req.headers["authorization"] //Authorization: Bearer <token> --> format de Bearer Authentication
    //si authheader == null ou undefined alors token devient ça
    //si autheader est un string valable alors on accede à la partie token 
    const token = authHeader && authHeader.split(' ')[1]

    if (!token){
        return res.sendStatus(401) // user doesn’t have permission to access a target resource
    }

    jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err,user)=>{
        if (err){
            return res.sendStatus(403) //403 renvoi qu'il a le mauvais token
        }

        req.user = user
        next()
    }); //on verifie la token avec la code qu'on l'a hashé avec

}

// Exportation des middlewares
module.exports = {
    isAuthenticated,
    isAdmin,
    authenticateToken
};
