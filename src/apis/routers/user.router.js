const userController = require("../controllers/user.controller");
module.exports = async function (fastify, opts) {
  fastify.post("/users", async (req, res, next) => {
    console.log("Creating new user....");
    const newUser = req.body;
    const newUserRes = await userController.addUser(newUser);
    res.status(200).send(newUserRes)
  });

  /* Get users*/
  fastify.get("", async (req, res, next) => {
    const users = await userController.getAllUsers();
    res.status(200).send({
      listUsers: users,
      message: "Get all users",
    });
  });
};
