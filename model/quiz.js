const mongoose = require('mongoose');
const { QuestionSchema } = require('./Question');

const QuizSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    questions: [QuestionSchema],
    totalPoints: {
        type: Number,
        default: 0
    }
});

const Quiz = mongoose.model("Quiz", QuizSchema);
module.exports = { Quiz };
