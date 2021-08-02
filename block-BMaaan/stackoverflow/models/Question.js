var mongoose = require('mongoose');
var User = require('./user');

var Schema = mongoose.Schema;

var questionSchema = new Schema(
  {
    question: { type: String, required: true },
    commentId: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    upvotes: { type: Number, default: 0 },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    views: { type: Number, default: 0 },
    tags: [String],
  },
  { timestamps: true }
);

var Question = mongoose.model('Question', questionSchema);

module.exports = Question;