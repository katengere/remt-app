const { dataSource } = require("./userTypesData");

const getUserTypes = (req, res) => {
    console.log('controller called');
    return res.status(200).json(dataSource);
};

module.exports = {
    getUserTypes
};