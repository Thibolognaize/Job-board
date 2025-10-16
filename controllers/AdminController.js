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
      // console.log("Résultat de la requête :", user);
      res.render("admin/userInfo", { user: user[0] });
    } catch (err) {
      console.error("Error: ", err);
      res.status(500).send("Erreur serveur");
    }
  },
  postUserInfo: async (req, res) => {
    try {
      const {
        id,
        first_name,
        last_name,
        email,
        tel,
        role,
        is_admin,
        got_license,
        profile_desc,
        cv_path,
        address,
        profile_picture_path,
      } = req.body;

      // Requête paramétrée pour éviter les injections SQL
      const query = `
      UPDATE users
      SET
        first_name = $1,
        last_name = $2,
        email = $3,
        tel = $4,
        role = $5,
        is_admin = $6,
        got_license = $7,
        profile_desc = $8,
        cv_path = $9,
        address = $10,
        profile_picture_path = $11
      WHERE id = $12
    `;

      // Valeurs à passer (NULL si non fournies, sauf pour is_admin qui a une valeur par défaut)
      const values = [
        first_name || null,
        last_name || null,
        email || null,
        tel || null,
        role || "user", // Valeur par défaut si non fournie
        is_admin || false, // Valeur par défaut si non fournie
        got_license || null,
        profile_desc || null,
        cv_path || null,
        address || null,
        profile_picture_path || null,
        id, // ID doit être fourni et valide
      ];

      await db.query(query, values);
      res.status(200).send("Utilisateur mis à jour avec succès");
    } catch (err) {
      console.error(`Erreur serveur: ${err.message}`);
      res.status(500).send("Erreur serveur lors de la mise à jour");
    }
  },
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      // Requête pour supprimer l'utilisateur de la base de données
      const query = "DELETE FROM users WHERE id = $1";
      const values = [userId];
      await db.query(query, values);
      res.status(200).send("Utilisateur supprimé avec succès");
    } catch (err) {
      console.error("Erreur serveur: ", err);
      res
        .status(500)
        .send("Erreur serveur lors de la suppression de l'utilisateur");
    }
  },

  getCompanies: (req, res) => {
    res.render("admin/companies");
  },
  getAdvertisements: (req, res) => {
    res.render("admin/advertisements");
  },
  // Keywords CRUD
  // READ
  getKeywords: async (req, res) => {
    try {
      const keywords = await db.query("SELECT * FROM key_words");
      console.log(keywords);
      res.render("admin/keywords", { keywords: keywords });
    } catch (err) {
      console.error("Error: ", err);
      res.status(500).send("Erreur serveur");
    }
  },

  // CREATE
  postKeyword: (req, res) => {
    try {
      // Data envoyées par le front
      const data = req.body;
      console.log(data);
      // REQUETE préparé + db.query(query, values)
      const query = `

      ;`;
      // RES status + send
    } catch (error) {
      console.error(`Erreur serveur: ${err.message}`);
      res.status(500).send("Erreur serveur lors de la mise à jour");
    }
  },
  // UPDATE
  updateKeyword: (req, res) => {},
  // DELETE
  removeKeyword: (req, res) => {},
};
