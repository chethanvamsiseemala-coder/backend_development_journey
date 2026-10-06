const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    marks: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    branch: {
        type: String,
        required: true,
        enum: ["CSE", "ECE", "EEE", "MECH", "CIVIL"]
    },
    passed: {
        type: Boolean,
        default: false
    },
    joinedOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Student", studentSchema);