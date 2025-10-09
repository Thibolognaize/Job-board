const express = require("express");
const router = express.Router();
const db = require("../db");
const { errors } = require("pg-promise");

router.get("/", (req, res) => {
    db.any("SELECT * FROM users;")
    .then(rows => {
        console.log(rows);
        res.json(rows)
    })
    .catch(error => {
        console.log(error)
    })
});

// router.post("/login", (req, res) => {
//     res.send("Formulaire de login")
// });

// // Route pour register l'user
// router.post("/", (req, res) => {
//     res.send("Formulaire d'enregistrement")
// });

// // Get a user by his id
// router
//     .route("/:id")
//     .get((req, res) => {
//         res.send(`Page de profile pour l'id ${req.params.id}`)
//     })
//     .put((req, res) => {
//         res.send(`Page de profile pour l'id ${req.params.id}`)
//     })
//     .delete((req, res) => {
//         res.send(`Page de profile pour l'id ${req.params.id}`)
//     })

module.exports = router;