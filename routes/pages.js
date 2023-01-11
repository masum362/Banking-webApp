const express = require('express');
const con = require('../database/connection');
const authController = require('../controllers/get');
const auth = require('../routes/secret-route')

const router = express.Router();

router.get('/',authController.home);
router.get('/login',authController.login)
router.get('/register',authController.register)
// router.get('/home',authController.home)
router.get('/logout',authController.logout)
// router.get('/account',auth,authController.account)
router.get('/contact',auth,authController.contact)
router.get('/dashboard',auth,authController.dashboard)
router.get('/deposit',auth,authController.deposit)
router.get('/transection_history',auth,authController.transection_history)
router.get('/withdraw',auth,authController.withdraw)
// router.get('/withdraw_success',auth,authController.withdraw_success)
router.get('/deposit_Amount',auth,authController.deposit_Amount)



module.exports = router;
