
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema(
  {
    name: { type: String, required: true },

    email: { type: String, unique: true },
    password: { type: String, minlength: 5 },

    questionId: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    answerId: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
  },
  { timestamps: true }
);

var User = mongoose.model('User', userSchema);