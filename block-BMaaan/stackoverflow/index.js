const Question = require('./models/question');
const { db } = require('./models/user');

Question.aggregate([
  {
    $group: {
      _id: null,
      count: { $sum: 1 },
    },
  },
]);

Question.aggregate([
  { $unwind: '$tags' },
  {
    $group: {
      _id: '$tags',
      count: { $sum: 1 },
    },
  },
]);

Question.aggregate([
  {
    $group: {
      _id: $views,
      count: { $sum: $views },
    },
  },
]);

User.aggregate([
  { $unwind: '$answerId' },

  {
    $group: { _id: '', totalValue: { $sum: '$answerId' } },
  },
]);