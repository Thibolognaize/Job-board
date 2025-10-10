const express = require("express");
const router = express.Router();

const controller = require("../controllers/UserController")

router.get("/", controller.get);
module.exports = router;
router.post("/login", (req, res) => {
    console.log(req.body.email)
});

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
