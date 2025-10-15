const db = require("../models/db");

module.exports = {
  // Tous les accès à nos pages
  get: (req, res) => {
    res.render("admin/index");
  },
  // Actions pour USERS
  getUsers: async (req, res) => {
    try {
      const users = await db.query(`
            SELECT
                u.id,
                u.first_name,
                u.last_name,
                u.email,
                u.tel,
                u.got_license,
                u.profile_desc,
                u.address,
                u.profile_picture_path,
                u.cv_path,
                u.created_at
            FROM users u
            LEFT JOIN companies c ON c.user_id = u.id
            ORDER BY u.created_at;
        `);
      console.log("Résultat de la requête :", users);
      res.render("admin/users", { users: users });
    } catch (err) {
      console.error("Error: ", err);
      res.status(500).send("Erreur serveur");
    }
  },
  getUserInfo: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await db.query(
        `
        SELECT
            u.id,
            u.first_name,
            u.last_name,
            u.email,
            u.tel,
            u.got_license,
            u.profile_desc,
            u.address,
            u.profile_picture_path,
            u.cv_path,
            u.created_at
        FROM users u
        LEFT JOIN companies c ON c.user_id = u.id
        WHERE u.id = $1
      `,
        [userId]
      ); // Passer userId comme paramètre
      console.log("Résultat de la requête :", user);
      res.render("admin/userInfo_copy", { user: user[0] });
    } catch (err) {
      console.error("Error: ", err);
      res.status(500).send("Erreur serveur");
    }
  },
  postUserInfo: async (req, res) => {
    try {
      const infos = res.body;
      console.log(infos);
    } catch (err) {
      console.error("Error: ", err);
      res.status(500).send("Erreur server");
    }
  },

  getCompanies: (req, res) => {
    res.render("admin/companies");
  },
  getAdvertisements: (req, res) => {
    res.render("admin/advertisements");
  },
  getKeywords: (req, res) => {
    res.render("admin/keywords");
  },
};
