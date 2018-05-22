module.exports = function (sequelize, DataTypes) {
  var Clothing_item = sequelize.define("Clothing_item", {
    user_id: DataTypes.STRING,
    type: DataTypes.STRING,
    img_url: DataTypes.STRING,
    name: DataTypes.STRING,
  });
  return Clothing_item;
};