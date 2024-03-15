const User = require('../models/users');
const House = require('../models/houses');

const houseRegister = function (req, res) {
  const { owner_Id, region, district, ward, street, type, open, rooms, caretakerPhoneNo, description } = req.body
  const newHouse = new House();
  newHouse.owner_Id = owner_Id; newHouse.region = region; newHouse.district = district; newHouse.ward = ward; newHouse.street = street;
  newHouse.type = type; newHouse.open = open; newHouse.rooms = rooms; newHouse.description = description;
  newHouse.coords = { type: "Point", coordinates: [39.2331264, -6.8059136] };
  // User.find({$and:{_id:[req.body.admin_Id, req.body.owner_Id]}})
  console.log('new house doc ', newHouse);

  if (req.body.admin_Id) {
    Promise.all([
      User.findById(req.body.admin_Id), User.findById(req.body.owner_Id), User.findOne({ 'userInfos.phoneNumber': caretakerPhoneNo })
    ]).then(([admin, owner, caretaker]) => {
      if (!Array.isArray(admin.regEstateIds)) {
        admin.regEstateIds = [];
      }
      admin.regEstateIds.push(newHouse._id);
      owner.estates.push(newHouse._id);
      caretaker.userTypeName === 'caretaker' ? newHouse.caretakers.push(caretaker._id) :
        Promise.reject(caretaker.userInfos.name + ' is not registered as caretaker');
      return Promise.all([newHouse.save(), admin.save(), owner.save()]);
    }).then(([house, adm, own]) => {
      console.log('updated admin doc ', adm);
      console.log('saved house doc ', house);
      console.log('saved owner doc ', own);
      return res.status(201).json(house);
    }).catch(err => {
      console.log('error from db; ', err);
      return res.status(400).json(err);
    })
  } else {
    User.findById(req.body.owner_Id).then((owner) => {
      owner.estates.push(newHouse._id);
      return Promise.all([newHouse.save(), owner.save()]);
    }).then(([house, own]) => {
      console.log('saved house doc ', house);
      console.log('saved owner doc ', own);
      return res.status(201).json(house);
    }).catch(err => {
      console.log('error from db; ', err);
      return res.status(400).json(err);
    })
  }
  // res.status(201).json('form successfuly received');
};

async function updateUserRentalHistory(phoneNumber, houseId, rental_history) {
  const user = await User.findOne({ 'userInfos.phoneNumber': phoneNumber });
  const house = await House.findById(houseId);
  if (!user || !house) return Promise.reject('Failed to Update. User not registered');
  if (!house.open) return Promise.reject('House not open for new Tenant');

  const found = house.rental_history.find(r => r.client.toString() == user._id.toString());
  // const found = house.rental_history.find(r => r.client.toString() == user._id.toString());
  // if (found) return Promise.reject('Failed to Approve. User has an ongoing contract to this house');

  if (found && new Date(found.to).getTime() > Date.now()) {
    const index = house.rental_history.findIndex(r => r.client.toString() == found._id.toString());
    const plusRooms = rental_history.rooms > found.rooms ? rental_history.rooms - found.rooms : undefined;
    const minusRooms = rental_history.rooms < found.rooms ? found.rooms - rental_history.rooms : undefined;
    house.rooms = plusRooms ? house.rooms - plusRooms : house.rooms;
    house.rooms = minusRooms ? house.rooms + minusRooms : house.rooms;
    house.rental_history.splice(index, 1, Object.assign(found, rental_history));
    return house.save();
  } return Promise.reject('Failed to Update. User rent duration has expired');
}

async function approveUserRentalHistory(phoneNumber, houseId, rental_history) {
  const user = await User.findOne({ 'userInfos.phoneNumber': phoneNumber });
  const house = await House.findById(houseId);
  if (!user || !house) return Promise.reject('Failed to Approve. User not registered');

  if (!house.open) return Promise.reject('House not open for new Tenant');
  const found = house.rental_history.find(r => r.client.toString() == user._id.toString());
  if (found) return Promise.reject('Failed to Approve. ' + user.userInfos.name + ' has ' + found.rooms + ' rooms in this house');
  const userRentalHistories = await House.findOne({ 'rental_history.client': user._id }, { 'rental_history.$': 1 });
  console.log('userRentalHistories ', userRentalHistories);
  if (new Date(rental_history.to).getTime() < Date.now()) {
    rental_history.client = user._id;
    house.rental_history.push(rental_history);
    console.log('updated house for past rentalhistory', house);
    return house.save();
  } else if (userRentalHistories) {
    if (new Date(userRentalHistories.rental_history[0].to).getTime() > Date.now()) {
      const house = await House.findById(userRentalHistories._id);
      const houseOwner = await User.findById(house.owner_Id);
      return Promise.reject('CONFLICT. ' + user.userInfos.name.toUpperCase() + ' has an ongoing contract to another house owned by ' + houseOwner.userInfos.name.toUpperCase());
    }
  } else {
    if (!(house.rooms - rental_history.rooms >= 0)) return Promise.reject('Failed to Approve. House has no enough rooms');
    if ((house.rooms - rental_history.rooms) === 0) house.open = false;
    rental_history.client = user._id;
    house.rooms = house.rooms - rental_history.rooms;
    house.rental_history.push(rental_history);
    console.log('updated house ', house);
    return house.save();
  }
}
async function deletedUserRentalHistory(phoneNumber, houseId) {
  const user = await User.findOne({ 'userInfos.phoneNumber': phoneNumber });
  const house = await House.findById(houseId);
  if (!user || !house) return Promise.reject('Failed to Delete. User not registered');

  const found = house.rental_history.find(r => r.client.toString() == user._id.toString());
  if (found) {
    const index = house.rental_history.findIndex(r => r.client.toString() == found._id.toString());
    house.rooms += found.rooms;
    house.rental_history.splice(index, 1);
    return house.save();
  }
}
async function houseUpdateHelper(req) {
  const { owner_Id, region, district, ward, street, type, open, rooms, _id, caretakerPhoneNo, description } = req.body;
  const h = await House.findById(_id);
  const caretaker = await User.findOne({ 'userInfos.phoneNumber': caretakerPhoneNo });
  if (caretaker) {
    h.region = region; h.district = district; h.ward = ward; h.street = street; h.type = type; h.open = open;
    h.rooms = rooms; h.description = description;
    // const found = h.caretakers.length > 0 ? h.caretakers.find(ct => ct.toString() === caretaker._id.toString()) : undefined;
    // if (!found){
    if (caretaker.userTypeName !== 'caretaker') return Promise.reject(caretaker.userInfos.name + ' is not registered as caretaker');
    h.caretakers.splice(0, 1, caretaker._id);
    // };
    console.log('house after update ', h);
    return h.save();
  } return Promise.reject('Unknown Caretakers phone number');
}
const houseUpdate = function (req, res) {
  console.log('req query ', req.query);
  if (req.body.from !== undefined && req.body.to !== undefined) {
    const rental_history = {
      from: req.body.from, to: req.body.to, rent: req.body.rent, house: req.body._id, rooms:
        req.body.rooms, phoneNumber: req.body.phoneNumber
    };
    if (req.query.action == 'delete') {
      deletedUserRentalHistory(req.body.phoneNumber, req.body._id).then(h => {
        console.log('success delete rental history ', h);
        res.status(204).json(h);
      }).catch(e => {
        console.log(e);
        return res.status(400).json(e);
      });
    } else if (req.query.action == 'update') {
      updateUserRentalHistory(req.body.phoneNumber, req.body._id, rental_history)
        .then(h => {
          console.log('updated house ', h);
          res.status(200).json(h);
        }).catch(e => {
          console.log(e);
          return res.status(400).json(e);
        });
    } else if (req.query.action == 'approve') {
      approveUserRentalHistory(req.body.phoneNumber, req.body._id, rental_history)
        .then(h => {
          console.log('updated house ', h);
          res.status(201).json(h);
        }).catch(e => {
          console.log(e);
          return res.status(400).json(e);
        });
    }
  } else {
    houseUpdateHelper(req).then(update => res.status(201).json(update)).catch(e => {
      console.log(e);
      return res.status(400).json(e);
    });
  }
}

const houseDelete = function (req, res) {
  console.log('del req body ', req.body);
  return res.status(204).json('delete success')
}

const getAllHouses = function (req, res) {
  console.log('get all houses called');
  House.find().then(houses => res.status(200).json(houses)).catch(e => res.status(400).json(e));
};
const getHouseByKey = function (req, res) {
  console.log('req query ', req.query);
  // House.find().then(houses => res.status(200).json(houses)).catch(e => res.status(400).json(e));
};
module.exports = { houseRegister, getAllHouses, getHouseByKey, houseUpdate, houseDelete }