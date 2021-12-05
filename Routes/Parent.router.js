const express = require('express');
const router = express.Router();
const multer = require('../Middleware/multer.config')
const ParentController = require('../controllers/Parent.controller')
const Parent = require("../Models/Parent.model");
const { GetParentbymail } = require('../controllers/Parent.controller');
/**
 * @Path /Parent
 */
router.post('/RegisterParent',multer,ParentController.RegisterParent)
router.post('/Login',GetParentbymail,ParentController.login)


module.exports = router;