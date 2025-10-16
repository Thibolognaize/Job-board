// middlewares/auth.js

function isAuthenticated(req, res, next) {
    if (req.user) {
        return next();
    }
    res.redirect("/user/login"); // Redirige vers login
}


function isAdmin(req, res, next) {
    if (req.user && req.user.isAdmin === true) {
        return next();
    } 
    console.log(req.user)
    res.status(403).send('Accès refusé');
}
/* 
function authenticateToken(req,res,next){
    const authHeader = req.cookies.accessToken //Authorization: Bearer <token> --> format de Bearer Authentication
    //si authheader == null ou undefined alors token devient ça
    //si autheader est un string valable alors on accede à la partie token 
    //const token = authHeader && authHeader.split(' ')[1]

    console.log(token)

    if (!token){
        return res.sendStatus(401) // user doesn’t have permission to access a target resource
    }

    jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err,user)=>{
        if (err){
            return res.sendStatus(403) //403 renvoi qu'il a le mauvais token
        }
        console.log("-------------------->" + user);
        req.user = user; 
        next();
    }); //on verifie la token avec la code qu'on l'a hashé avec

}

function refreshToken(req, res, next) {
  const refresh = req.cookies.refreshToken;
  if (!refresh) return res.status(401).send("Refresh token manquant");

  jwt.verify(refresh, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send("Refresh token invalide");

    const newAccessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.ACCES_TOKEN_SECRET,
      { expiresIn: "10m" }
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      maxAge: 10 * 60 * 1000,
    });

    req.user = user;
    next();
  });
} */

// Exportation des middlewares
module.exports = {
    isAuthenticated,
    isAdmin,
    //authenticateToken,
    //refreshToken
};
