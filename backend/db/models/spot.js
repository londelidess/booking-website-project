'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.hasMany(models.Booking, {
        foreignKey: 'spotId',
        onDelete:'CASCADE',
        hooks:true
      });
      Spot.hasMany(models.SpotImage, {
        foreignKey: 'spotId',
        onDelete:'CASCADE',
        hooks:true
      });
      Spot.hasMany(models.Review, {
        foreignKey: 'spotId',
        onDelete:'CASCADE',
        hooks:true
      });
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId'
      });
    }
  }
  Spot.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: 'user',
      //   key: 'id',
      // },

      // onDelete: 'CASCADE',
    },
    address: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lat: {
      type: DataTypes.DECIMAL(20, 14),
      allowNull: false,
    },
    lng: {
      type: DataTypes.DECIMAL(20, 14),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(200),
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
