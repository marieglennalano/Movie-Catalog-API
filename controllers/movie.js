const Movie = require('../models/Movie');
const { errorHandler } = require('../auth');

// [ADMIN] Create Movie
module.exports.addMovie = async (req, res) => {
    try {
        const { title, director, year, description, genre } = req.body;

        const newMovie = new Movie({
            title,
            director,
            year,
            description,
            genre,
            comments: []
        });

        const savedMovie = await newMovie.save();

        res.status(201).json(savedMovie);
    } catch (error) {
        errorHandler(error, req, res);
    }
};


//Get All Movies
module.exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json({ movies });
    } catch (error) {
        errorHandler(error, req, res);
    }
};


//Get Movie by ID
module.exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.status(200).json(movie);
    } catch (error) {
        errorHandler(error, req, res);
    }
};


// [ADMIN] Update Movie
module.exports.updateMovie = async (req, res) => {
    try {
        const movieId = req.params.id;
        const updateData = req.body;

        const updatedMovie = await Movie.findByIdAndUpdate(
            movieId,
            updateData,
            { new: true }
        );

        if (!updatedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.status(200).json({
            message: "Movie updated successfully",
            movie: updatedMovie
        });
    } catch (error) {
        errorHandler(error, req, res);
    }
};


// [ADMIN] Delete Movie
module.exports.deleteMovie = async (req, res) => {
    try {
        const movieId = req.params.id;

        const deletedMovie = await Movie.findByIdAndDelete(movieId);

        if (!deletedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
        errorHandler(error, req, res);
    }
};

