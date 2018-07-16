//列表
module.exports = function(sequelize, DataTypes){
  return sequelize.define('lists', {
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    content: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    }
  },{
        timestamps: false
    });
}

