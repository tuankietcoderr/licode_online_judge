const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProblemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  examples: {
    type: [Object],
  },
  //! tags
  details: {
    type: Object,
    // ID, time, memory, mode, level, point, source
  },
  // optional
  hint: {
    type: String,
  },
  submissions: {
    type: Number,
    default: 0,
  },
  accepted: {
    type: Number,
    default: 0,
  },
  wrong: {
    type: Number,
    default: 0,
  },
  solved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("problems", ProblemSchema);
