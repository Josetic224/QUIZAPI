const mongoose = require('mongoose');
const {AnswerSchema} = require('../model/Answer')
const QuestionSchema = mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    answers: {
        type: [AnswerSchema],
        default: []  // Provide an empty array as the default value
    }
})
const Question = mongoose.model("Question", QuestionSchema);

module.exports = {
    Question,
    QuestionSchema
};