const { Op } = require("sequelize");
const { Layer, sequelize } = require("../db/models");

/**
 * Promotes layer
 *
 * @param {string} id Layer id
 * @returns Layer[]
 */
async function demoteLayer(id) {
  const layer = await Layer.findByPk(id);
  const nextLayer = await Layer.findOne({
    where: { versionId: layer.versionId, z: { [Op.lt]: layer.z } },
    order: [["z", "DESC"]]
  });

  if (!nextLayer) {
    return [layer];
  }

  const newZ = nextLayer.z;
  const oldZ = layer.z;

  await sequelize.transaction(transaction => {
    return Promise.all([
      layer.update({ z: newZ }, { transaction }),
      nextLayer.update({ z: oldZ }, { transaction })
    ]);
  });

  return [layer, nextLayer];
}

module.exports = demoteLayer;
