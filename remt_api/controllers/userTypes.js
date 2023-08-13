const { dataSource } = require("./userTypesData");
const { initialUserData } = require("./initialUserData");

const getUserTypes = (req, res) => {
    console.log('controller called');
    return res.status(200).json(dataSource);
};
const logInUser = (req, res) => {
    const {phoneNumber, name} = req.body;
    const foundUser = dataSource.find(u=>u.userInfos.name==name&&u.userInfos.phoneNumber==phoneNumber);
    if (foundUser) {
    return res.status(200).json(foundUser);
    } else {
    return res.status(400).json('No user by the provided credentials');
    }
};
function selectInitialUser(user) {
    const foundUser = initialUserData.
    find(u=>u.userTypeName.toLowerCase()==user.userTypeName.toLowerCase());
    return {
        ...foundUser, userInfos:user
    }
}
const registerUser = (req, res) => {
    const user = req.body;
    const foundUser = dataSource.find(u=>u.userInfos.name==user.name&&u.userInfos.phoneNumber==user.phoneNumber);
    if (foundUser) {
    return res.status(400).json('A user with same credentials already exit');
    } else {
        const registeredUser = selectInitialUser(user)
    return res.status(200).json(registeredUser);
    }
};
module.exports = {
    getUserTypes, logInUser, registerUser
};