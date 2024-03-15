const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const PersonInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Date },
  nation_Id: { type: Number, required: true, unique: true },
  phoneNumber: { type: Number, required: true, unique: true },
  gender: { type: String },
  summary: { type: String }
});

const InvoiceSchema = new mongoose.Schema({
  invoiceId: { type: String, required: true },
  invoiceName: { type: String, required: true },
  tenantId: { type: String, required: true },
  tenantName: { type: String, required: true },
  tenantPhoneNumber: { type: String, required: true },
  tax: { type: Number, required: true },
  netTotal: { type: Number, required: true },
  houseId: { type: String, required: true },
  houseType: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  rooms: { type: Number, required: true },
  rent: { type: Number, required: true },
  rentTotal: { type: Number, required: true },
  createdAt: { type: Date }
});

const userTypeSchema = new mongoose.Schema({
  userTypeName: String,
  permissions: [String],
  userInfos: PersonInfoSchema,
  estates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'House' }],
  regUserIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  regEstateIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'House' }],
  invoices: [InvoiceSchema],
  createdAt: Date,
  coords: {
    type: { type: String },
    coordinates: [Number]
  },
  salt: String,
  hash: String
});

userTypeSchema.methods.setPassword = function (pwd) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(pwd, this.salt, 1000, 64, 'sha512').toString('hex');
}

userTypeSchema.methods.isValidPassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

userTypeSchema.methods.generateJwt = function () {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign({
    _id: this._id,
    phoneNumber: this.userInfos.phoneNumber,
    name: this.userInfos.name,
    userTypeName: this.userTypeName,
    exp: parseInt(expiry.getTime() / 1000, 10),
  }, process.env.jwtSecret);
};

userTypeSchema.index({ coords: '2dsphere' });

const User = mongoose.model('User', userTypeSchema);

module.exports = User;