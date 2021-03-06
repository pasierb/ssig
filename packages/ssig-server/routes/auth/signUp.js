const { localAuthSetup } = require("../../interactors");
const sequelize = require("sequelize");
const { User } = require("../../db/models");

function signUp(req, res) {
  const { email, password } = req.data;

  return sequelize
    .transaction(async transaction => {
      const user = await User.create({ email }, { transaction });

      await localAuthSetup(user, password, { transaction });

      return user;
    })
    .then(user => {
      res.json(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
}

module.exports = signUp;
