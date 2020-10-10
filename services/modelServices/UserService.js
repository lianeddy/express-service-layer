const moment = require("moment");
const { user } = require("../../models");
const AuthService = require("../AuthService");
const DaoService = require("../DaoService");
const EncryptionService = require("../EncryptionService");

class UserService {
  constructor() {
    this.UserDaoServiceInstance = new DaoService(user);
    // env variables won't be read here unless preload dotenv
    this.EncryptionServiceInstance = new EncryptionService(
      process.env.SECRET_KEY
    );
  }

  /**
   *
   * @param {{
   * username: string,
   * fullName: string,
   * email: string,
   * password: string,
   * role: string,
   * lastLogin: Date,
   * }} newUserObject
   */
  async registerNewUser(newUserObject) {
    try {
      // TODO: Add logic to check if username and email available
      newUserObject.password = this.EncryptionServiceInstance.generateHash(
        newUserObject.password
      );

      newUserObject.lastLogin = moment();

      const result = await this.UserDaoServiceInstance.save(newUserObject);

      delete result.dataValues.password;

      return {
        success: true,
        result,
      };
    } catch (err) {
      return {
        success: false,
        error: err,
      };
    }
  }

  async loginByUsernameAndPassword(userCredentials) {
    try {
      const { username, password } = userCredentials;

      const [findUserByUsername] = await this.UserDaoServiceInstance.findAll({
        username,
      });

      const passwordDoesMatch = this.EncryptionServiceInstance.compareHash(
        password,
        findUserByUsername.password
      );

      if (!passwordDoesMatch) throw new Error("Password does not match!");

      const tokenPayload = JSON.stringify(findUserByUsername);

      // Generate JWT token
      const AuthServiceInstance = new AuthService(process.env.JWT_KEY);
      const token = AuthServiceInstance.signToken(tokenPayload);

      await this.UserDaoServiceInstance.update(findUserByUsername.id, {
        lastLogin: moment(),
      });

      return {
        success: true,
        result: {
          ...findUserByUsername.dataValues,
          token,
        },
      };
    } catch (err) {
      return {
        success: false,
        error: err.message,
      };
    }
  }
}

module.exports = UserService;
