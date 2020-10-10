const ExpressLoader = require("../loaders/ExpressLoader");

// TODO: Add different role handlers
class AuthMiddleware {
  constructor(AuthService) {
    this.authService = AuthService;
  }

  validateToken(req, res, next) {
    let { token } = req.body;
    const { authorization } = req.headers;

    if (authorization) {
      token = token || authorization;
    }

    if (!token)
      return ExpressLoader.errorHandler({
        message: "This is a JWT Error",
      });

    let verifiedToken = this.authService.verifyToken(token);

    if (!verifiedToken.isVerified) {
      // TODO: Add handler to delete uploaded files

      return res.status(419).json({
        token,
        message: "This is a JWT Error. Your token has most likely expired",
      });
    }

    req.userData = verifiedToken.decoded;
    next();
  }
}

module.exports = AuthMiddleware;
