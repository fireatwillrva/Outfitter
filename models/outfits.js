module.exports = function(sequelize, DataTypes) {
  var Outfit = sequelize.define("Outfit", {
    name: DataTypes.STRING,
    user_id: DataTypes.STRING
  });
  Outfit.associate = function(models){
    Outfit.belongsTo(models.Clothing_item, { as:'top', foreignKey: 'top_id'});
    Outfit.belongsTo(models.Clothing_item, { as:'bottom', foreignKey: 'bottom_id'});
    Outfit.belongsTo(models.Clothing_item, { as:'shoes', foreignKey: 'shoes_id'}); 
    Outfit.belongsTo(models.Clothing_item, { as:'bag', foreignKey: 'bag_id'});
    Outfit.belongsTo(models.Clothing_item, { as:'toptwo', foreignKey: 'toptwo_id'}); 
    Outfit.belongsTo(models.Clothing_item, { as:'hat', foreignKey: 'hat_id'});
  };
  return Outfit;

};