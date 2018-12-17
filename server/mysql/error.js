//列表 表名要加s
module.exports = function(sequelize, DataTypes){
    return sequelize.define('errorlogs', {
      err: {
        type: DataTypes.CHAR(255),
        allowNull: true
      },
      type: {
        type: DataTypes.CHAR(255),
        allowNull: true
      },
      ua: {
        type: DataTypes.CHAR(255),
        allowNull: true
      }
    },{
          timestamps: false
      });
  }