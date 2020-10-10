const bcrypt = require("bcrypt");

class EncryptionService {
  constructor(SecretKey) {
    this.secretKey = SecretKey;
  }

  generateHash(data, saltRounds = 5) {
    return bcrypt.hashSync(data, saltRounds);
  }

  /**
   * @description Compares a string to a hash. Returns true if matches, otherwise returns false
   * @param {string} s string to compare
   * @param {string} h hash to test against
   */
  compareHash(s, h) {
    return bcrypt.compareSync(s, h);
  }
}

module.exports = EncryptionService;
