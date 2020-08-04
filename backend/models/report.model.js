const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
    userId: { type: String, required: true, unique: false },
    reportedId: { type: String, required: true },
    offense: { type: String, required: true },
    content: { type: String, required: true },
  },

  {
    timestamps: true,
  }
);
const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
