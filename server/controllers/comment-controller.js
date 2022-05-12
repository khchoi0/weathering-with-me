const Comment = require("../models/comment-model");

/**
 * Create a comment
 *
 * @typedef {object} requestBody
 * @property {String} locname
 * @property {String} username
 * @property {String} content
 *
 * @param {import('express').Response} req
 * @param {import('express').Response} res
 * @returns
 */
exports.commentCreate = async (req, res) => {
  try {
    let loc = await Location.findOne({ lname: req.body.locname }, "_id");
    if (loc === null) {
      return res.status(404).json({ message: "The location does not existed" });
    }

    const user = await User.findOne({ username: req.body.username }, "_id");
    if (user === null) {
      return res.status(404).json({ message: "User not found" });
    }

    const comment = new Comment({
      lid: loc._id,
      uid: user._id,
      content: req.body.content,
    });
    const commentRes = await comment.save();
    res.status(200).json(commentRes);
  } catch (err) {
    return res.status(500).json(err);
  }
};

/**
 * Read comments of a specific location
 *
 * @typedef {object} requestBody
 * @property {mongoose.Schema.Types.ObjectId} lid
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
exports.commentRead = async (req, res) => {
  try {
    const comment = await Comment.find({ lid: req.body.loc }, "-lid -__v")
      .populate("uid", "username")
      .sort("-_id");
    if (comment === []) {
      return res.status(404).json({ message: "No comments in database" });
    }
    res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json(error);
  }
};
