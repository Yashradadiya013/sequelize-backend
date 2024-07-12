const express = require('express')
const router = express.Router()
const {Booksignup} = require('../controller/Book')
const {BooksIssuSignup} = require('../controller/BookIssu')
const {Usersignup,SerchingData,UserSignIn,verify_email} = require('../controller/user')
const {authenticateToken} = require('../middleware/auth')

router.post('/Usersignup',Usersignup)
router.post('/UserSignIn',authenticateToken,UserSignIn)
router.get('/verify_email/:token',verify_email)
router.post('/Booksignup',Booksignup)
router.post('/BooksIssuSignup',BooksIssuSignup)
router.get('/search',SerchingData)

module.exports = router