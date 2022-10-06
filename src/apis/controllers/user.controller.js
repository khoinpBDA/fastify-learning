const userService = require("../../services/user.service");

module.exports = {
  addUser: async (user) => {
    try {
      const newUserRes = await userService.addUser(user);
      return newUserRes;
    } catch (e) {
      throw new Error(e);
    }
  },
  getAllUsers: async () => {
    try {
      const userList = await userService.findAll();
      return userList;
    } catch (e) {
      throw e;
    }
  },
};
