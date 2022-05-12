const Comment = require("../models/comment-model");
var mongoose = require("mongoose");

/**
 * Create a comment
 *
 * @typedef {object} requestBody
 * @property {mongoose.Schema.Types.ObjectId} lid
 * @property {mongoose.Schema.Types.ObjectId} username
 * @property {String} content
 *
 * @param {import('express').Response} req
 * @param {import('express').Response} res
 * @returns
 */
exports.commentCreate = async (req, res) => {
  try {
    const comment = new Comment({
      lid: mongoose.Types.ObjectId(req.body.lid),
      uid: mongoose.Types.ObjectId(req.body.uid),
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
    const comments = await Comment.find(
      { lid: mongoose.Types.ObjectId(req.params.lid) },
      "-lid -__v -updatedAt"
    )
      .populate("uid", "username")
      .sort("-_id");
    res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json(error);
  }
};
