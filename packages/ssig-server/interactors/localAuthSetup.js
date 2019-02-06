const crypto = require("crypto");

function genRandomString(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}

/**
 *
 * @param {*} user
 * @param {String} password
 */
function localAuthSetup(user, password, ...updateQueryOptions) {
  const salt = genRandomString(32);
  const hash = crypto.createHmac("sha512", salt);

  hash.update(password);

  return user.update(
    { salt, encryptedPassword: hash.digest("hex") },
    ...updateQueryOptions
  );
}

module.exports = localAuthSetup;
