const { QueryTypes } = require("sequelize");
const logger = require("../common/logger");
const dbConn = require("../db/db");

class UserRepository {
  async addUser(userInput) {
    try {
      const newUser = await dbConn.user.create(userInput);
      console.log("Create new user successfully!");
      return newUser;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  async findAll() {
    const userList = await dbConn.user.findAll();

    return userList;
  }
}
module.exports = new UserRepository();
