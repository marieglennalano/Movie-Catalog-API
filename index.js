// [SECTION] Dependencies and Modules 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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
    origin: ['http://localhost:3000', 'http://localhost:4000'],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// [SECTION] Database Setup (hardcoded URI)
const MONGODB_URI = 'mongodb+srv://admin123:admin123@b546.is2c4ug.mongodb.net/MovieCatalogAPI?retryWrites=true&w=majority&appName=b546';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

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
if (require.main === module) {
    app.listen(4000, () => {
        console.log(`API is now online on port 4000`);
    });
}

module.exports = { app, mongoose };
