module.exports = function(sequlize, DataType) {
  const Record = sequlize.define("record", {
    path:{
      type: DataType.STRING,
      allowNull: false,
    },
    shortenPath:{
      type: DataType.STRING,
      field: "shorten_path"
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['path']
      }
    ],
  });
  return Record;
}