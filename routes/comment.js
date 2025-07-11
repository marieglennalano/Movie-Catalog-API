const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment");
const { verify } = require("../auth");

// Add comment to a movie
router.patch("/addComment/:movieId", verify, commentController.addMovieComment);

// Get comments from a movie
router.get("/getComments/:movieId", commentController.getMovieComments);

module.exports = router;
