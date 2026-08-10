const express = require("express");
const router = express.Router();
const komikController = require("../controller/komikController");
const userController = require("../controller/userController");
const genreController = require("../controller/genreController");
const authMiddleware = require("../middleware/authMiddleware");
