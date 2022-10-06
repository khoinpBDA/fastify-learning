const userRepository = require("../repositories/user.repository");
const User = require("../models/User.model");
const uuid = require("uuid");

const generateResponse = require("../utils/generateResponse");

module.exports = {
  addUser: async (user) => {
    console.log(
      "User service create new user" + JSON.stringify(user)
    );
    var id = uuid.v4();
    const newUser = {
      name: user.name,
      status: 0,
    };

    const userRes = await userRepository.addUser(newUser);
    return userRes;
  },
  findAll: async () => {
    const userList = await userRepository.findAll();
    return userList;
  },
};
