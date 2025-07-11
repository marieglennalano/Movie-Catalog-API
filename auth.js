const jwt = require("jsonwebtoken");
const User = require('./models/User');

// [SECTION] Token Creation
module.exports.createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    };

    // Create the JWT token using the data (ID, email, admin status)
    const token = jwt.sign(data, "MovieCatalogAPI", { expiresIn: '1h' }); // Token expires in 1 hour
    return token;  // Return the token to be used for authentication
}

// [SECTION] Token Verification
module.exports.verify = async (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).send({ auth: "Failed. No Token" });
    }

    // Extract the token (Bearer Token format)
    token = token.slice(7);  // Removing 'Bearer ' part

    // Verify the JWT token
    jwt.verify(token, "MovieCatalogAPI", async (err, decodedToken) => {
        if (err) {
            return res.status(403).send({
                auth: "Failed",
                message: err.message
            });
        }

        // If the token is valid, get the user from the database
        try {
            const user = await User.findById(decodedToken.id);  // Use the decoded ID to fetch the user
            if (!user) {
                return res.status(404).send({ auth: "Failed", message: "User not found" });
            }

            req.user = user;  // Attach the user to the request object
            next();  // Proceed to the next middleware or route
        } catch (err) {
            console.error(err);
            return res.status(500).send({
                auth: "Failed",
                message: "Internal Server Error"
            });
        }
    });
}

//[SECTION] Verify Admin

module.exports.verifyAdmin = (req, res, next) => {
    if(req.user.isAdmin) {
        next();
    } else {
        return res.status(403).send({
            auth: "Failed",
            message: "Action Forbidden"
        })
    }
}


// [SECTION] Error Handler
module.exports.errorHandler = (err, req, res, next) => {
    console.error(err);

    const statusCode = err.status || 500;
    const errorMessage = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        error: {
            message: errorMessage,
            errorCode: err.code || 'SERVER_ERROR',
            details: err.details
        }
    });
};

// Middleware to check if the user is authenticated
module.exports.isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);  // Unauthorized
    }
};
