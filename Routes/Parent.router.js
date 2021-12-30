const express = require('express');
const router = express.Router();
const multer = require('../Middleware/multer.config')
const ParentController = require('../controllers/Parent.controller')
const Parent = require("../models/Parent.model");
const { GetParentbymail, authentificateToken } = require('../controllers/Parent.controller');
const KidController = require('../controllers/Kid.controller');
/**
 * @Path /Parent
 */
router.post('/RegisterParent',ParentController.RegisterParent)
router.post('/Login',ParentController.login)
router.get('/getall',ParentController.Getall)
router.post('/:_id/Registerkids',ParentController.RegisterKid)
router.post('/LoginwithSocial',ParentController.SigninwithSocialmedia)
router.post('/Addtask',ParentController.AddTask)
router.get('/:_id/getkids',KidController.Getkids)
module.exports = router;