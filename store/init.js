const _ = require("lodash");
const util = require("util");
const Sequelize = require('sequelize');
const {DB: { HOST, PORT, USER, PASSWORD, NAME }} = require("../config");
const models = require("./model");
const sequelize = new Sequelize(`postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${NAME}`,  {
    logging: false,
});

Object.keys(models).forEach((k) => {
    models[k](sequelize, Sequelize);
})

module.exports = function(force = false) {
    util.log("DB Init");
    return sequelize.sync({force});
};
