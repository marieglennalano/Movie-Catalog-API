// [SECTION] Dependencies and Modules 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// [SECTION] Routes
const userRoutes = require('./routes/user');
const movieRoutes = require('./routes/movie');
const commentRoutes = require('./routes/comment');

// [SECTION] Server setup
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow specific origins (adjust if needed)
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:4000', 'https://movie-catalog-fs.vercel.app', 'https://movie-application-weld.vercel.app/'],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// [SECTION] Database Setup
mongoose.connect(process.env.MONGODB_STRING)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB Atlas');
});

// [SECTION] Backend Routes
app.use('/users', userRoutes); 
app.use('/movies', movieRoutes);
app.use('/movies', commentRoutes);

// Optional: Fallback route
app.all('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// [SECTION] Server Listener
if(require.main === module) {
    app.listen( process.env.PORT || 4000, () => {
        console.log(`API is now online on port ${ process.env.PORT || 4000 }`);
    })
}

module.exports = { app, mongoose };
