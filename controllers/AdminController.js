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
  // Actions pour companies
  // READ (all)
  getCompanies: async (req, res) => {
    const companies = await db.query(`
        SELECT 
          c.*,
          u.id AS user_id,
          u.email AS user_email
        FROM companies c
        JOIN users u ON c.user_id = u.id ;`);
    res.render("admin/companies", { companies: companies });
  },
  // UPDATE
  getCompanyInfo: async (req, res) => {
    try {
      const companyId = req.params.companyId;
      const company = await db.query(
        `
        SELECT
            c.id,
            c.name,
            c.website,
            c.contact,
            c.address,
            c.city,
            u.id as user_id,
            u.email as user_email
        FROM companies c
        LEFT JOIN users u ON c.user_id = u.id
        WHERE c.user_id = $1;
      `,
        [companyId]
      ); // Passer userId comme paramètre
      res.render("admin/companyInfo", { company: company[0] });
    } catch (err) {
      console.error("Error: ", err);
      res.status(500).send("Erreur serveur");
    }
  },
  postCompanyInfo: async (req, res) => {
    try {
      const { id, name, website, contact, address, city, user_id, user_email } =
        req.body;

      // Requête préparée pour éviter les injections SQL
      const query = `
      UPDATE companies
      SET
        name = $1,
        website = $2,
        contact = $3,
        address = $4,
        city = $5
      WHERE id = $6
    `;

      // Valeurs à passer (NULL si non fournies, sauf pour is_admin qui a une valeur par défaut)
      const values = [
        name || null,
        website || null,
        contact || null,
        address || null,
        city || null,
        id,
      ];

      await db.query(query, values);
      res.status(200).send("Utilisateur mis à jour avec succès");
    } catch (err) {
      console.error(`Erreur serveur: ${err.message}`);
      res.status(500).send("Erreur serveur lors de la mise à jour");
    }
  },
  deleteCompany: async (req, res) => {
    try {
      const companyId = req.params.companyId;
      // Requête pour supprimer l'utilisateur de la base de données
      const query = "DELETE FROM companies WHERE id = $1";
      const values = [companyId];
      await db.query(query, values);
      res.status(200).send("Entreprise supprimée avec succès");
    } catch (err) {
      console.error("Erreur serveur: ", err);
      res
        .status(500)
        .send("Erreur serveur lors de la suppression de l'entreprise");
    }
  },

  // Admin Advertisements controller
  getAdvertisements: async (req, res) => {
    const advertisements = await db.query(`
      SELECT 
        a.*,
        c.name AS company_name
      FROM advertisements a
      JOIN companies c ON a.companies_id =  c.id;`);
    res.render("admin/advertisements", { advertisements: advertisements });
  },
  getAdvertisementInfo: async (req, res) => {
    try {
      const advertisementId = req.params.advertisementId;
      const advertisement = await db.query(
        `
      SELECT
          a.id,
          a.title,
          a.description,
          a.views,
          a.img_path,
          a.is_active,
          a.last_update,
          a.companies_id,
          c.name AS company_name
      FROM advertisements a
      JOIN companies c ON a.companies_id = c.id
      WHERE a.id = $1
    `,
        [advertisementId]
      );
      res.render("admin/advertisementInfo", {
        advertisement: advertisement[0],
      });
    } catch (err) {
      console.error("Error: ", err);
      res.status(500).send("Erreur serveur");
    }
  },
  postAdvertisementInfo: async (req, res) => {
    try {
      const {
        id,
        title,
        description,
        views,
        img_path,
        is_active,
        companies_id,
      } = req.body;
      const query = `
      UPDATE advertisements
      SET
        title = $1,
        description = $2,
        views = $3,
        img_path = $4,
        is_active = $5,
        companies_id = $6
      WHERE id = $7
    `;
      const values = [
        title || null,
        description || null,
        views || 0,
        img_path || null,
        is_active || true,
        companies_id || null,
        id,
      ];
      await db.query(query, values);
      res.status(200).send("Annonce mise à jour avec succès");
    } catch (err) {
      console.error(`Erreur serveur: ${err.message}`);
      res.status(500).send("Erreur serveur lors de la mise à jour");
    }
  },
  deleteAdvertisement: async (req, res) => {
    try {
      const advertisementId = req.params.advertisementId;
      const query = "DELETE FROM advertisements WHERE id = $1";
      const values = [advertisementId];
      await db.query(query, values);
      res.status(200).send("Annonce supprimée avec succès");
    } catch (err) {
      console.error("Erreur serveur: ", err);
      res
        .status(500)
        .send("Erreur serveur lors de la suppression de l'annonce");
    }
  },
};
