const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    lid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    content: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Comment", CommentSchema);
