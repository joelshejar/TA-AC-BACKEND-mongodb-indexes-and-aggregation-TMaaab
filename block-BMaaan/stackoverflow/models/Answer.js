var mongoose = require('mongoose');
var User = require('./user');

var Schema = mongoose.Schema;

var answerSchema = new Schema(
  {
    answer: { type: String, required: true },
    commentId: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    upvotes: { type: Number, default: 0 },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
  },
  { timestamps: true }
);

var Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;