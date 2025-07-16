const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const auth = require('../controllers/authController')

router.get('/profile', auth.Authenticated, auth.Admin, adminController.getAdminProfile)
router.put('/profile', auth.Authenticated, auth.Admin, adminController.updateAdminProfile)

module.exports = router