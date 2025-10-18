const db = require("../models/db");
const { errors } = require("pg-promise");
const bcrypt = require("bcrypt");

module.exports = {
  renderLogin: (req, res) => {
    res.render("users/login", { error: req.query.error });
  },

    renderRegister: (req, res) => {
        res.render("users/register", { error: req.query.error });
    },

    renderProfil: async (req, res) => {
        try {
            if (!req.session.user) {
                return res.redirect("/user/login?error=Veuillez vous connecter");
            }
            const userId = req.session.user.id;
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
            ); 
            // Passer userId comme paramètre
            // console.log("Résultat de la requête :", user);
            res.render("users/profil", { user });
            } 
        catch (err) {
        console.error("Error: ", err);
        res.status(500).send("Erreur serveur");
        }
    },

  login: async (req, res) => {
    try {
      const email_input = req.body.email;
      const password_input = req.body.password;
      const remember = req.remember;

      // Recherche l'utilisateur par email
      const user = await db.oneOrNone("SELECT * FROM users WHERE email = $1", [
        email_input,
      ]);
      if (!user) {
        return res.redirect(
          "/user/login?error=Email ou mot de passe incorrect"
        );
      }

            // Compare le mot de passe saisi avec celui stocké en base
            const isPasswordValid = await bcrypt.compare(password_input, user.password);
            if (isPasswordValid) {
                // Stocke les informations de l'utilisateur en session
                req.session.user = {
                    id: user.id,
                    first_name : user.first_name,
                    last_name : user.last_name,
                    email: user.email,
                    role : user.role || 'user',
                    isAdmin: user.is_admin || false
                };

        // Si l'utilisateur a coché "Rester connecté", définissez une date d'expiration pour la session
        if (remember) {
          req.session.cookie.maxAge = 3 * 24 * 60 * 60 * 1000; // 3 jours avant date d'expiration
        } else {
          // Sinon, la session expirera à la fermeture du navigateur
          req.session.cookie.expires = false;
        }

        // Affiche la session dans la console pour débogage
        // console.log("Session après login :", req.session);

        // Redirige vers la page d'accueil après un login réussi
        return res.redirect("/");
      } else {
        return res.redirect(
          "/user/login?error=Email ou mot de passe incorrect"
        );
      }
    } catch (error) {
      console.error("Erreur lors de la vérification du profil :", error);
      res.status(500).send("Erreur serveur");
    }
  },

  register: async (req, res) => {
    try {
      const fname_input = req.body.fname;
      const lname_input = req.body.lname;
      const email_input = req.body.email;

      // Vérifie si l'email est déjà utilisé
      const existingUser = await db.oneOrNone(
        "SELECT * FROM users WHERE email = $1",
        [email_input]
      );
      if (existingUser) {
        return res.redirect(
          "/user/register?error=Cette adresse email est déjà utilisée"
        );
      }

      // Hachage du mot de passe
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

      // Insère le nouvel utilisateur dans la base de données
      await db.none(
        "INSERT INTO users VALUES (DEFAULT, $1, $2, $3, NULL, DEFAULT, DEFAULT, NULL, $4, NULL, NULL, NULL, NULL, DEFAULT)",
        [fname_input, lname_input, email_input, hashedPassword]
      );

      // Redirige vers la page de login après une inscription réussie
      return res.redirect("/user/login");
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      res.status(500).send("Erreur serveur");
    }
  },
    updateProfil: async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            email,
            tel,
            got_license,
            profile_desc,
            address,
        } = req.body;

        // Requête paramétrée pour éviter les injections SQL
        const query = `
        UPDATE users
        SET
            first_name = $1,
            last_name = $2,
            email = $3,
            tel = $4,
            got_license = $5,
            profile_desc = $6,
            address = $7
        WHERE id = $8
        `;
        
        // Valeurs à passer (NULL si non fournies, sauf pour is_admin qui a une valeur par défaut)
        const values = [
            first_name || req.session.user.first_name,
            last_name || req.session.user.last_name,
            email || req.session.user.email,
            tel || null,
            got_license || null,
            profile_desc || null,
            address || null,
            req.session.user.id,
        ];
        
        await db.query(query, values);
            res.status(200).send("Utilisateur mis à jour avec succès");

        } catch (err) {
            console.error(`Erreur serveur: ${err.message}`);
            res.status(500).send("Erreur serveur lors de la mise à jour");
        }
    },
};