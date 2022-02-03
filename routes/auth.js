const auth = require('../controllers/AuthController');

const router = require ('express').Router();


router.route('/register').post(auth.register);
router.route('/login').post(auth.login);


module.exports = router;