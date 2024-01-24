const mongoose = require('mongoose');

const AnswerSchema = mongoose.Schema({
    answerItem: {
        type: String,
        required: true
    },
    answerText: {
        type: String,
        required: true
    },
    answerCorrect: {
        type: Boolean,
        required: true
    },
    points: {
        type: Number,
        default: 0
    }
});

const Answer = mongoose.model("Answer", AnswerSchema);
module.exports = { Answer, AnswerSchema };
