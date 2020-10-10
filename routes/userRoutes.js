const { Router } = require("express");
const UserService = require("../services/modelServices/UserService");

const router = Router();

// TODO: Separate controllers
const UserServiceInstance = new UserService();

router.post("/register", async (req, res, next) => {
  try {
    const { body } = req;
    const createdUser = await UserServiceInstance.registerNewUser(body);

    if (!createdUser.success) throw createdUser.error;

    return res.status(200).json({
      message: "Registered new user",
      result: createdUser.result,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { body } = req;

    const result = await UserServiceInstance.loginByUsernameAndPassword(body);

    if (!result.success) throw result.error;

    return res.status(200).json({
      message: "Login success!",
      result: result.result,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
