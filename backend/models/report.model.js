const mongoose = require("mongoose");
//const Comments = require("Comment");
const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
    username: { type: String, required: true, unique: false },
    offense: { type: String, required: true },
    content: { type: String, required: true },
    reportedID: { type: String, required: true },
  },

  {
    timestamps: true,
  }
);
const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
