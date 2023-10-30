'use strict';
const {
  Model
} = require('sequelize');
const { hash, compare } = require("../helpers/bcrypt");
const { generateJWT } = require("../helpers/jwt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    validPassword(password) {
      return compare(password, this.password);
    }

    generateToken() {
      return generateJWT({
        id: this.id,
        email: this.email,
      });
    }

  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(), // Use the uuid library to generate a default UUID
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    email_verified_at: DataTypes.DATE,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true,
  });
  return User;
};