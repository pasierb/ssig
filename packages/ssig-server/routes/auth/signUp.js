const { localAuthSetup } = require("../../interactors");
const sequelize = require("sequelize");
const { User } = require("../../db/models");

function signUp(req, res) {
  console.log(req);
  const { email, password } = req.data;

  sequelize
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
