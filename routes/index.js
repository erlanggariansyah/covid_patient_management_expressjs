'use strict'
const express = require('express')
const patient = require('../controllers/patientController')
const auth = require('../controllers/authController')
const { check, validationResult } = require('express-validator')
const passwordHash = require('password-hash')
const { authorization } = require('../middlewares/authorization')
const router = express()

const checkValidation = [
    check('username').not().isEmpty().withMessage('required value').isAlphanumeric(),
    check('fullname').isAlpha().isLength({ min: 5, max:50 }),
    check('email').not().isEmpty().withMessage('required value').isEmail(),
    check('password').not().isEmpty().withMessage('required value').isAlphanumeric()
];

const checkValidationLogin = [
    check('username').not().isEmpty().withMessage('required value').isAlphanumeric(),
    check('password').not().isEmpty().withMessage('required value').isAlphanumeric()
];

const postParam = (req) => {
    const passwordToSave = passwordHash.generate(req.body.password),
        data = {
            username: req.body.username.trim(),
            fullname: req.body.fullname.trim(),
            email: req.body.email,
            password: passwordToSave
        };

    return data;
}

router.post(`/api/v1/register`, [checkValidation], (req, res) =>  {
    const errors = validationResult(req);

    (!errors.isEmpty() ? res.status(422).json(errors) : auth.register(postParam(req), res))
})

router.post(`/api/v1/login`, [checkValidationLogin], (req, res) => {
     const errors = validationResult(req);

     (!errors.isEmpty() ? res.status(422).json(errors) : auth.authentication(req, res))
})

router.get(`/api/v1/patients`, authorization, patient.index)
router.post(`/api/v1/patients`, authorization, patient.store)
router.put(`/api/v1/patients/:id`, authorization, patient.update)
router.delete(`/api/v1/patients/:id`, authorization, patient.destroy)
router.get(`/api/v1/patients/:id`, authorization, patient.show)
router.get(`/api/v1/patients/search/:name`, authorization, patient.search)
router.get(`/api/v1/status/positive`, authorization, patient.positive)
router.get(`/api/v1/status/recovered`, authorization, patient.recovered)
router.get(`/api/v1/status/death`, authorization, patient.death)

module.exports = router
