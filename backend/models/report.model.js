<<<<<<< HEAD
const mongoose = require('mongoose');
//const Comments = require("Comment");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    username: {type: String, required: true, unique: false},
    reportedID: {type: String, required: true},
    offense: {type: String, required: true},
    content: {type: String, required: true}
    
},

    {
        timestamps: true
    }
);
const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
=======
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
>>>>>>> 565dcfcc670dfbce00683a991232b22159da875a
