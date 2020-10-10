const jwt = require("jsonwebtoken");

class AuthService {
  constructor(JWTKey) {
    this.jwtKey = JWTKey;
  }

  signToken(payload, expireTime = "12h") {
    return jwt.sign(payload, this.jwtKey, { expiresIn: expireTime });
  }

  verifyToken(token) {
    try {
      let decoded = jwt.verify(token, this.jwtKey);
      return {
        isVerified: true,
        decoded,
      };
    } catch (err) {
      return err;
    }
  }
}

module.exports = AuthService;
