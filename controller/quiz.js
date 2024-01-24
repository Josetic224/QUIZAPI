// import Quiz from "../models/Quiz.js"

const {Quiz} = require('../model/quiz')
require('dotenv').config()
const createQuiz = async(req, res) => {
    try {
        const quiz = new Quiz(req.body);
        const quizSaved = await quiz.save();
        res.status(200).json(quizSaved);
    } catch (error) {

        res.status(403).json(error.message)
    }
}

const getQuizzes = async(req, res) => {
    try {
        const quizes = await Quiz.find();
        return res.status(200).json(quizes)
    } catch (error) {
      
        return res.status(403).json(error.message)
    }
}

const getQuiz = async(req, res) => {
    try {
        const {id} = req.params;
        const quiz = await Quiz.findById(id)
        return res.status(200).json(quiz)
    } catch (error) {
        const e = new Error('Could not get the quiz')
        return res.status(403).json({msg: e.message})
    }
}

const deleteQuiz = async(req, res) => {
    const {id} = req.params;
    const quiz = await Quiz.findById(id);

    if(!quiz){
        return res.status(403).json({msg: 'Quiz not found'})
    }
    try {
        await quiz.deleteOne();
        res.status(200).json({msg: 'Quiz deleted successfully'});
    } catch (error) {
        const e = new Error('Could not delete the Quiz');
        res.status(403).json({msg: e.message})
    }
}
const submitQuiz = async (req, res) => {
    try {
        const quizId = req.params.quizId;
        const userAnswers = req.body.answers; // Assuming answers are provided in the request body

        // Retrieve the quiz from the database
        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({ success: false, message: 'Quiz not found' });
        }

        // Calculate total points based on user answers
        quiz.totalPoints = userAnswers.reduce((totalPoints, userAnswer) => {
            const question = quiz.questions.id(userAnswer.questionId);
            const answer = question.answers.id(userAnswer.answerId);

            if (answer && answer.answerCorrect) {
                totalPoints += answer.points || process.env.POINTS_PER_CORRECT_ANSWER;
            }

            return totalPoints;
        }, 0);

        // Save the updated quiz
        await quiz.save();

        res.status(200).json({ success: true, message: 'Quiz submitted successfully', totalPoints: quiz.totalPoints });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const getQuizResults = async (req, res) => {
    try {
        const quizId = req.params.quizId;

        // Fetch the quiz from the database based on the quizId
        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({ success: false, message: 'Quiz score not found, take a quiz' });
        }

        // Return the quiz results to the client
        res.status(200).json({ success: true, totalPoints: quiz.totalPoints });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};




module.exports = {
    createQuiz,
    getQuizzes,
    getQuiz,
    deleteQuiz,
    submitQuiz, 
    getQuizResults
}