const mongoose = require('mongoose');

const RentalHistorySchema = new mongoose.Schema({
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  rent: { type: Number, required: true },
  rooms: { type: Number, },
  phoneNumber: { type: Number, },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  house: { type: mongoose.Schema.Types.ObjectId, ref: 'House', }
});

const HouseSchema = new mongoose.Schema({
  owner_Id: { type: String, required: true },
  region: { type: String, required: true },
  district: { type: String, required: true },
  ward: { type: String, required: true },
  street: { type: String, required: true },
  type: { type: String, required: true },
  open: { type: Boolean, required: true },
  rooms: { type: Number, required: true },
  caretakers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  description: { type: String, required: true },
  rental_history: [RentalHistorySchema],
  coords: {
    type: { type: String, required: true },
    coordinates: [Number]
  }
});

HouseSchema.index({ coords: '2dsphere' });

const House = mongoose.model('House', HouseSchema);

module.exports = House;