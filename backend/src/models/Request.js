const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  machineName: { type: String, required: true },
  issueType: { type: String },
  description: { type: String },
  location: { type: String },
  attachments: [{ filename: String, originalname: String, path: String }],
  status: { type: String, enum: ['open','in_progress','done','closed'], default: 'open' },
  assignedTo: { type: mongoose.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

RequestSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Request', RequestSchema);
