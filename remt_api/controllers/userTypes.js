const { dataSource } = require("./userTypesData");
const { initialUserData } = require("./initialUserData");

const getUserTypes = (req, res) => {
    console.log('controller called');
    return res.status(200).json(dataSource);
};
const logInUser = (req, res) => {
    console.log(req.body);
    const {phoneNumber, name} = req.body.userInfos;
    const foundUser = dataSource.find(u=>u.userInfos.name.toLowerCase()==name.toLowerCase()&&u.userInfos.phoneNumber==phoneNumber);
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
    const user = req.body.userInfos;
    console.log(req.body);
    const foundUser = dataSource.find(u=>u.userInfos.name.toLowerCase()==user.name.toLowerCase()
    &&u.userInfos.phoneNumber==user.phoneNumber);
    if (foundUser) {
    return res.status(400).json('A user with same credentials already exit');
    } else {
        dataSource.push(req.body);
    return res.status(200).json(req.body);
    }
};
module.exports = {
    getUserTypes, logInUser, registerUser
};