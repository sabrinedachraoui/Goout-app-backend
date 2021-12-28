const express = require('express');
const router = express.Router();
const multer = require('../Middleware/multer.config')
const ParentController = require('../controllers/Parent.controller')
const Parent = require("../models/Parent.model");
const { GetParentbymail, authentificateToken } = require('../controllers/Parent.controller');
/**
 * @Path /Parent
 */
router.post('/RegisterParent',ParentController.RegisterParent)
router.post('/Login',GetParentbymail,ParentController.login)
router.get('/getall',ParentController.Getall)
router.post('/:_id/Registerkids',ParentController.RegisterKid)
module.exports = router;