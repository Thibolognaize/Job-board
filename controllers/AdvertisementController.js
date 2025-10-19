const db = require("../models/db");
const { errors } = require("pg-promise");

module.exports = {
  // Définition du comportement des routes
  createAdvertisement: (req, res) => {
    res.render("advertisements/create");
  },

  getAll: (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;
    let totalPages;

    db.one("SELECT COUNT(*) FROM advertisements")
      .then((count) => {
        const totalAdvertisements = parseInt(count.count);
        totalPages = Math.ceil(totalAdvertisements / limit);
        return db.any(
          `
                    SELECT
                        a.*,
                        c.name AS company_name,
                        c.website,
                        c.contact,
                        c.address,
                        c.city
                    FROM advertisements a
                    LEFT JOIN companies c ON a.companies_id = c.id
                    ORDER BY a.id
                    LIMIT $1 OFFSET $2
                `,
          [limit, offset]
        );
      })
      .then((advertisements) => {
        res.render("advertisements/list", {
          advertisements,
          currentPage: page,
          totalPages: totalPages,
        });
      })
      .catch((error) => {
        console.error("Erreur :", error);
        res.status(500).send("Erreur serveur");
      });
  },

  // Récupération du Json d'un seul pour l'affichage des données
  getAdvertisementJson: (req, res) => {
    const id = req.params.id;
    const query = `
            SELECT
                a.*,
                c.name AS company_name,
                c.website,
                c.contact,
                c.address,
                c.city
            FROM advertisements a
            LEFT JOIN companies c ON a.companies_id = c.id
            WHERE a.id = $1
        `;
    db.one(query, [id])
      .then((advertisement) => {
        res.json(advertisement);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération de l'annonce :", error);
        res.status(500).json({ error: "Erreur serveur" });
      });
  },

  // Submission du formulaire de creation d'advertisement
  post: (req, res) => {
    const { title, description } = req.body;
    db.none("INSERT INTO advertisements(title, description) VALUES($1, $2)", [
      title,
      description,
    ])
      .then(() => {
        res.render("advertisements/create", {
          title: "",
          success: true,
          message: "Annonce créée avec succès !",
          link: "/advertisements",
        });
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de l'annonce :", error);
        res.render("advertisements/create", {
          title: title,
          error: true,
          message: "Erreur lors de la création de l'annonce.",
          link: "/advertisements",
        });
      });
  },
  getApply: async (req, res) => {
    let user = null;
    if (req.session.user) {
      try {
        user = await db.one(
          `SELECT first_name, last_name, email, tel, cv_path FROM users WHERE id = $1;`,
          [req.session.user.id]
        );
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données utilisateur :",
          error
        );
      }
    }

    // Récupérer les données de l'annonce
    let advertisement = null;
    try {
      advertisement = await db.one(
        `
                SELECT
                    a.*,
                    c.name AS company_name,
                    c.website,
                    c.contact,
                    c.address,
                    c.city
                FROM advertisements a
                LEFT JOIN companies c ON a.companies_id = c.id
                WHERE a.id = $1
            `,
        [req.params.id]
      );
    } catch (error) {
      console.error("Erreur lors de la récupération de l'annonce :", error);
    }

    res.render("advertisements/apply", {
      user: user,
      advertisement: advertisement || {},
    });
  },
  postApply: async (req, res) => {
    const { first_name, last_name, email, tel, cv_path, message } = req.body;
    const advertisementId = req.params.id;
    const userId = req.session.user ? req.session.user.id : null;

    try {
      await db.none(
        `INSERT INTO applications (user_id, advertisement_id, application_date, first_name, last_name, email, tel, cv_path, description)
             VALUES ($1, $2, CURRENT_TIMESTAMP, $3, $4, $5, $6, $7, $8)`,
        [
          userId,
          advertisementId,
          first_name,
          last_name,
          email,
          tel,
          cv_path,
          message,
        ]
      );
      // Récupérer à nouveau les données de l'annonce pour les afficher dans la vue
      const advertisement = await db.one(
        `
                SELECT
                    a.*,
                    c.name AS company_name,
                    c.website,
                    c.contact,
                    c.address,
                    c.city
                FROM advertisements a
                LEFT JOIN companies c ON a.companies_id = c.id
                WHERE a.id = $1
            `,
        [advertisementId]
      );
      res.render("advertisements/apply", {
        user: req.session.user
          ? await db.one(
              `SELECT first_name, last_name, email, tel, cv_path FROM users WHERE id = $1;`,
              [req.session.user.id]
            )
          : null,
        advertisement: advertisement,
        success: true,
        message: "Candidature envoyée avec succès !",
        link: "/advertisements",
      });
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement de la candidature :",
        error
      );
      res.render("advertisements/apply", {
        user: req.session.user
          ? await db.one(
              `SELECT first_name, last_name, email, tel, cv_path FROM users WHERE id = $1;`,
              [req.session.user.id]
            )
          : null,
        advertisement: await db.one(
          `
                    SELECT
                        a.*,
                        c.name AS company_name,
                        c.website,
                        c.contact,
                        c.address,
                        c.city
                    FROM advertisements a
                    LEFT JOIN companies c ON a.companies_id = c.id
                    WHERE a.id = $1
                `,
          [advertisementId]
        ),
        error: true,
        message: "Erreur lors de l'envoi de la candidature.",
        link: "/advertisements",
      });
    }
  },
};
