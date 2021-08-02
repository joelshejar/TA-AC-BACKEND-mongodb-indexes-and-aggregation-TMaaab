var mongoose = require('mongoose');
var Question = require('./question.js');

var Schema = mongoose.Schema;

var commentSchema = new Schema(
  {
    content: { type: String, required: true },
    questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    likes: { type: Number, default: 0 },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;