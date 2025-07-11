const bcrypt = require('bcrypt');
const User = require('../models/User');
const auth = require('../auth');

const { errorHandler } = auth;

//[SECTION] User registration
module.exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, mobileNo } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            mobileNo
        });

        await newUser.save();
        res.status(201).send({ message: 'Registered successfully' });
    } catch (error) {
        errorHandler(error, req, res);
    }
};

//[SECTION] User login
module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }

        // Create a JWT token
        const token = auth.createAccessToken(user);
        res.status(200).send({ access: token });
    } catch (error) {
        errorHandler(error, req, res);
    }
};


//[SECTION] Get user profile
module.exports.profile = async (req, res) => {
    try {
        const user = req.user;

        res.status(200).json({
            user: {
                _id: user._id,
                email: user.email,
                __v: user.__v
            }
        });
    } catch (error) {
        errorHandler(error, req, res);
    }
}