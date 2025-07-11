const Movie = require('../models/Movie');
const { errorHandler } = require('../auth');

// [AUTHENTICATED USER] Add Comment to Movie
module.exports.addMovieComment = async (req, res) => {
    try {
        const { comment } = req.body;
        const { movieId } = req.params;
        const userId = req.user._id;

        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        // Create comment subdocument
        const newComment = {
            userId,
            comment
        };

        // Push to comments array
        movie.comments.push(newComment);

        // Save and return updated movie
        const updatedMovie = await movie.save();

        res.status(200).json({
            message: "comment added successfully",
            updatedMovie
        });

    } catch (error) {
        errorHandler(error, req, res);
    }
};

// Get Comments of a Movie
module.exports.getMovieComments = async (req, res) => {
    try {
        const { movieId } = req.params;

        const movie = await Movie.findById(movieId);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.status(200).json({ comments: movie.comments });

    } catch (error) {
        errorHandler(error, req, res);
    }
};
