// [SECTION] Dependencies and Modules
const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie");

// Middleware
const { verify, verifyAdmin } = require("../auth");

// ===============================
// [ADMIN ONLY] Movie Management
// ===============================

// Create a movie
router.post("/addMovie", verify, verifyAdmin, movieController.addMovie);

// Update a movie
router.patch("/updateMovie/:id", verify, verifyAdmin, movieController.updateMovie);

// Delete a movie
router.delete("/deleteMovie/:id", verify, verifyAdmin, movieController.deleteMovie);

// ===============================
// [PUBLIC & USER ACCESS] Movie Access
// ===============================

// Get one movie by ID
router.get("/getMovie/:id", movieController.getMovieById);

// Get all movies
router.get("/getMovies", movieController.getAllMovies);

// ===============================
// Export Route System
// ===============================
module.exports = router;
