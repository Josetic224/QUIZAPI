const  express = require ('express')

const router = express.Router();

const { createQuiz, getQuizzes,  getQuiz, deleteQuiz, submitQuiz, getQuizResults } =  require ('../controller/quiz.js');
const isAdmin = require('../middleware/isAdmin.js');
const { verifyToken } = require('../middleware/auth.js');



router.post('/quizapp/admin/:id/create',verifyToken, isAdmin, createQuiz)
router.get('/quizapp/allquiz', getQuizzes)
router.get('/quizapp/:quizid/getquiz', getQuiz)
router.post('/quizapp/quiz/submit',submitQuiz),
router.get('/quizapp/quiz/getscore',getQuizResults)
router.delete('/quizapp/quiz/:quizid/delete',verifyToken, isAdmin, deleteQuiz )
module.exports= router



