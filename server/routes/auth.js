const jwt = require("jsonwebtoken");

module.exports = async (request, response, next) => {
  try {
    // Get the token from the authorization header
    const token = request.headers.authorization.split(" ")[1];

    // Verify and decode the token
    const decodedToken = jwt.verify(token, "RANDOM-TOKEN");

    // Extract user email from the decoded token
    const userEmail = decodedToken.email; // Modify this line based on your token structure

    // Attach the user email to the request object
    request.userEmail = userEmail;

    // Pass down functionality to the endpoint
    next();
    
  } catch (error) {
    response.status(401).json({
      error: "Unauthorized", // You can provide a more descriptive error message
    });
  }
};
