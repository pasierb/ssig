const { User } = require("../db/models");

/**
 *
 * @param {object} twitterProfile
 * @param {number} twitterProfile.id
 * @param {string} twitterProfile.name
 * @param {string} twitterProfile._raw
 *
 * @returns Promise<User>
 */
async function twitterAuthenticator(twitterProfile) {
  const raw = JSON.parse(twitterProfile._raw);

  const [user, isNew] = await User.findOrCreate({
    where: { twitterAccountId: twitterProfile.id },
    defaults: { username: raw.screen_name }
  });

  return user;
}

module.exports = twitterAuthenticator;
