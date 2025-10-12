# Job Board – Plateforme de gestion d’offres d’emploi

**Projet Express.js développé par Thibault FEAT et Elif Deniz Göktürk**
*Dans le cadre de la formation Epitech (Pre-MSc 2025)*

---

## Description

Ce projet est une **plateforme de Job Board** (tableau d’offres d’emploi) développée avec **Express.js**, utilisant **EJS** comme moteur de vues pour générer des pages dynamiques et **PostgreSQL** pour la gestion des données. L’interface est responsive grâce à **Bootstrap 5**.

---

## Fonctionnalités principales

- Affichage et gestion dynamique des offres d’emploi
- Système d’authentification (inscription/connexion)
- Interface utilisateur responsive
- Architecture MVC (Modèles, Vues, Contrôleurs)

---

## Prérequis

- Node.js (version 18 ou supérieure)
- PostgreSQL (version 14 ou supérieure)
- Un gestionnaire de paquets (npm ou yarn)

---

## Installation

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/Thibolognaize/Job-board.git
   cd Job-board
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Configurer la base de données :
   - Créer une base de données PostgreSQL.
   - Importer le schéma de base de données (voir section *Base de données*).

4. Lancer le serveur en mode développement :
   ```bash
   npm run dev
   ```
   Le serveur sera accessible à l’adresse [http://localhost:3000](http://localhost:3000).

---

## Structure du projet

```
Job-board/
├── controllers/
│   ├── AdvertisementController.js
│   └── UserController.js
├── models/
│   └──  db/
│       ├── scripts/
|       └── dumps/
├── public/
│   ├── assets/
│   ├── css/
│   └── js/
├── routes/
├── views/
│   ├── advertisements/
│   ├── users/
│   └── partials/
├── package.json
├── package-lock.json
└── .gitignore

```

---

## Configuration

- **Base de données** : Utilise `pg-promise` pour interagir avec PostgreSQL.
  Un fichier de configuration (ex: `db/index.js`) doit contenir les informations de connexion.

- **Variables d’environnement** : Si utilisées, créer un fichier `.env` à la racine du projet.

---

## Technologies utilisées

| Technologie       | Version   | Usage                     |
|-------------------|-----------|---------------------------|
| Express.js        | ^5.1.0    | Framework backend         |
| EJS               | ^3.1.10   | Moteur de vues            |
| Bootstrap         | ^5.3.8    | Design responsive         |
| pg-promise        | ^12.2.0   | Interaction avec PostgreSQL|
| Nodemon           | ^3.1.10   | Développement (rechargement automatique) |
| bcrypt            | ^6.0.0    | Encryption des mdps       |
---

## Routes principales

- `/` : Page d’accueil
- `user/login` : Page de connexion
- `user/register` : Page d’inscription
- `user/` : Liste de tous les users en json 
- `/advertisements` : Liste de tous les annonces
- `/advertisements/create` : Créer une annonce

*(À compléter)*

---