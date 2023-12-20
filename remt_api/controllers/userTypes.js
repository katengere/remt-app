const { dataSource } = require("./userTypesData");
const { initialUserData } = require("./initialUserData");

const getUserTypes = (req, res) => {
    console.log('controller called');
    return res.status(200).json(dataSource);
};
const logInUser = (req, res) => {
    const {phoneNumber, name} = req.body.userInfos;
    const foundUser = dataSource.find(u=>u.userInfos.name.toLowerCase()==name.toLowerCase()&&u.userInfos.phoneNumber==phoneNumber);
    if (foundUser) {
        console.log('login user ', foundUser);
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
    const admin_lga_Id = req.params.id;
    const user = req.body;
    const foundUser = dataSource.find(u=>u.userInfos.name.toLowerCase()==user.userInfos.name.toLowerCase()
    &&u.userInfos.phoneNumber==user.userInfos.phoneNumber);
    const admin_OR_lga = dataSource.find(u=>u.id === admin_lga_Id);
    if (foundUser) {
    return res.status(400).json('A user with same credentials already exit');
    } else if (admin_OR_lga) {
        if (!Array.isArray(admin_OR_lga.regUserIds)) {
            admin_OR_lga.regUserIds = [];
        }
        admin_OR_lga.regUserIds.push(user.id);
        console.log('update reg user ids ', admin_OR_lga);
        dataSource.splice(dataSource.findIndex(u=>u.id===admin_OR_lga.id),1, admin_OR_lga);

        const foundUserType = initialUserData.find(u=>u.userTypeName.toLowerCase() === user.userTypeName);
        user.permissions = [...foundUserType.permissions];
        user.ui = {...foundUserType.ui};
        dataSource.push(user);
        return res.status(200).json(req.body);
    }    
};
const getUser = (req, res) => {
    const userId = req.params.id;
    const foundUser = dataSource.find(u=>u.id==userId);
    if (foundUser) {
    return res.status(200).json(foundUser);
} else {
    return res.status(400).json('No user with the provided credentials exit');
    }
};
const updateUser = (req, res) => {
    const userId = req.params.id;
    const newUser = req.body;
    const foundUser = dataSource.find(u=>u.id==userId);
    if (foundUser) {
        const index = dataSource.findIndex(u=>u.id==foundUser.id);
        dataSource.splice(index, 1, newUser);
        return res.status(201).json(foundUser);
} else {
    return res.status(400).json('No user with the provided credentials exit');
    }
};
const deleteUser = (req, res) => {
    const userId = req.params.id;
    const foundUser = dataSource.find(u=>u.id==userId);
    if (foundUser) {
        const index = dataSource.findIndex(u=>u.id==foundUser.id);
        dataSource.splice(index, 1);
        return res.status(201).json(foundUser);
} else {
    return res.status(400).json('No user with the provided credentials exit');
    }
};
module.exports = {
    getUserTypes, logInUser, registerUser, getUser, updateUser, deleteUser
};