const { mongoose } = require("mongoose");

const leadSchema = new mongoose.Schema({
    leadName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String },
    address: { type: String },
    status: { type: String, enum: ['new', 'in-progress', 'converted', 'lost'], default: 'new' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    nextFollowUpDate: { type: Date },
    nextFollowUpTime: { type: String },
    leadSource: { type: String },
    conversionDate: { type: Date },
    leadNotes: { type: String },
    customerType: { type: String },
    purchaseHistory: { type: Array },
    medicalNeeds: { type: String },
  });
  
  module.exports = mongoose.model('Lead', leadSchema);
  