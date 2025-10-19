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
  res.status(403).send("Accès refusé");
}

function isCompany(req, res, next) {
  if (req.session.user && req.session.user.role === "company") {
    return next();
  }
  res
    .status(403)
    .send(
      "Accès refusé, vous devez être affilié à une entreprise pour poster des annonces"
    );
}

// Exportation des middlewares
module.exports = {
  isAuthenticated,
  isAdmin,
  isCompany,
};
