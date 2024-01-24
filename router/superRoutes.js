const  express = require ('express')

const router = express.Router();
const verifyAdmin = require('../controller/superUser.js');
const { verifyToken } = require('../middleware/auth.js');





router.put('/quizapp/superuser/makeadmin/:id',verifyToken,verifyAdmin)

module.exports = router