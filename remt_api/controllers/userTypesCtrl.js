const { initialUserData } = require("./initialUserData");
const User = require('../models/users');
const passport = require('passport');
const House = require("../models/houses");

const getUserTypes = (req, res) => {
    // console.log('req query ', req.query);
    // const lng = parseFloat(req.query.lng);
    // const lat = parseFloat(req.query.lat);
    // const near = {
    //     type: "Point",
    //     coordinates: [lng, lat]
    //     };
    // const geoOptions = {
    //     distanceField: "distance.calculated",
    //     spherical: true,
    //     maxDistance: 20000        };
    //     console.log(near, lng, lat);
    // .aggregate([{
    //     $geoNear: {
    //         near,
    //         ...geoOptions
    //         }
    // }])
    User.find().select('-salt -hash').populate(['regUserIds', 'regEstateIds', 'estates']).then(users => {
        console.log('get all users ctl called ', users.length);
        return res.status(200).json(users);
    }).catch(err => {
        console.log('err ', err);
        res.status(400).json(err)
    });
};

const logInUser = (req, res) => {
    console.log(req.body.phoneNumber);
    console.log(req.body.password);
    passport.authenticate('local', (err, user, info) => {
        let token;
        if (err) {
            console.log('err ', err);
            return res.status(404).json(err);
        }
        if (user) {
            token = user.generateJwt();
            console.log(token);
            res.status(200).json(token);
        } else {
            console.log('info ', info);
            res.status(401).json(info);
        }
    })(req, res);
};

const registerUser = (req, res) => {
    const admin_lga_Id = req.query.adminId;
    const user = req.body;
    console.log('req body ', req.body);
    const foundUserType = initialUserData.find(u => u.userTypeName.toLowerCase() === user.userTypeName);
    const modelUser = new User();
    modelUser.permissions = [...foundUserType.permissions];
    modelUser.userInfos = user.userInfos;

    // modelUser.coords={
    //     type: "Point",
    //     coordinates: [user.coords[0], user.coords[1]]
    //     };
    modelUser.userTypeName = user.userTypeName;
    modelUser.createdAt = user.createdAt;
    modelUser.setPassword(user.userInfos.password);
    console.log('model user ', modelUser);
    User.findById(admin_lga_Id).then(admin => {

        if (!Array.isArray(admin.regUserIds)) {
            admin.regUserIds = [];
        }
        admin.regUserIds.push(modelUser._id);
        return Promise.all([admin.save(), modelUser.save()]);
    }).then(([u, adm]) => {
        console.log('saved user ', u);
        return res.status(201).json(u);
    }).catch(e => {
        console.log('error from db; ', e);
        return res.status(400).json(e);
    });
};
const getUser = (req, res) => {
    const userId = req.params.id;
    User.findById(userId).select('-salt -hash').populate(['regUserIds', 'regEstateIds', 'estates']).then(u => {
        return res.status(200).json(u);
    }).catch(err => {
        console.log(err);
        res.status(404).json('No user with the provided credentials exit');
    });
};
async function createUserInvoice(req, res) {
    const { _id, invoiceId, invoiceName, tenantId, tenantName, tenantPhoneNumber, tax, netTotal, houseId, houseType, start,
        end, rooms, rent, rentTotal, createdAt } = req.body;
    const invoice = {
        invoiceName, tenantId, tenantName, tenantPhoneNumber, tax, netTotal, houseId, houseType, start, end,
        rooms, rent, rentTotal, invoiceId, createdAt
    };
    const tenant = await User.findById(tenantId);
    const house = await House.findById(houseId);
    tenant.invoices.find(i => i.invoiceId === invoiceId) ? tenant : tenant.invoices.push(invoice);
    if (req.query.user == 'caretaker') {
        console.log('caretakers invoicing ');
        const caretaker = await User.findById(_id);
        const landlord = await User.findById(house.owner_Id);

        caretaker.invoices.find(i => i.invoiceId === invoiceId) ? caretaker : caretaker.invoices.push(invoice);
        landlord.invoices.find(i => i.invoiceId === invoiceId) ? landlord : landlord.invoices.push(invoice);
        return Promise.all([tenant.save(), caretaker.save(), landlord.save()]);
    } else if (req.query.user == 'landlord') {
        console.log('landlords invoicing ');
        const landlord = await User.findById(house.owner_Id);
        landlord.invoices.find(i => i.invoiceId === invoiceId) ? landlord : landlord.invoices.push(invoice);
        return Promise.all([tenant.save(), landlord.save()]);
    }
}
const updateUser = (req, res) => {
    const userId = req.params.id;
    const newUser = req.body;
    console.log(req.query);
    res.status(201).json('success');
    if (req.query.action == 'create invoice') {
        createUserInvoice(req, res).then(([tenant, caretaker, landlord]) => {
            console.log('tenant invoice ', tenant);
            console.log('caretaker invoice ', caretaker);
            console.log('landlord invoice ', landlord);
            res.status(201).json();
        }).catch(e => res.status(400).json(e))
    } else if (req.query.action == 'Edit User') {
        User.findById(userId).then(u => {
            if (!u) return Promise.reject('No user with the provided credentials exit');
            u.userInfos.name = newUser.userInfos.name;
            u.userInfos.phoneNumber = newUser.userInfos.phoneNumber;
            u.userInfos.nation_Id = newUser.userInfos.nation_Id;
            u.userInfos.age = newUser.userInfos.age;
            u.userInfos.gender = newUser.userInfos.gender;
            u.userInfos.summary = newUser.userInfos.summary;
            u.userTypeName = newUser.userTypeName;
            return u.save();
        }).then(val => res.status(201).json(val)).catch(e => res.status(400).json(e));
    }
};
const deleteUser = (req, res) => {
    const userId = req.params.id;
    const adminId = req.query.adminId;
    User.findById(adminId).then(admin => {
        if (admin === null) return res.status(404).json('Sorry Incorrect ID');
        const regUserId = admin.regUserIds.find(ad => ad._id.toString() === userId);
        if (regUserId) {
            const index = admin.regUserIds.findIndex(id => id.toString() === userId);
            admin.regUserIds.splice(index, 1);
        }
        if (adminId === userId) {

        }
        return Promise.all([User.findByIdAndDelete(userId), admin.save()]);
    }).then(([deletedUser, savedAdmin]) => {
        console.log('deleted user ', deletedUser);
        console.log('saved admin ', savedAdmin);
        return res.status(204).json('User successful deleted');
    }).catch(err => {
        console.log('Error deleting a record ', err);
        return res.status(400).json(err);
    });
};

module.exports = {
    getUserTypes, registerUser, logInUser, getUser, updateUser, deleteUser
};