const express = require('express')
const router = express.Router()
const {Booksignup} = require('../controller/Book')
const {BooksIssuSignup} = require('../controller/BookIssu')
const {Usersignup,studentDetais,adminOnly,UserSignIn,verify_email,forgotPassword,resetPassword,changepassword, searching} = require('../controller/user')
const {authenticateToken} = require('../middleware/auth')

router.post('/Usersignup',Usersignup)
router.post('/UserSignIn',authenticateToken,UserSignIn)
router.get('/verify_email/:token',verify_email)
router.post('/forgotPassword',forgotPassword)
router.post('/resetpassword',resetPassword)
router.post('/changepassword/:id',changepassword)
router.post('/Booksignup',Booksignup)
router.post('/BooksIssuSignup',BooksIssuSignup)
router.get('/search/:bookName',searching)
router.get('/studentData/:id',studentDetais)
router.get('/adminOnly',adminOnly)



module.exports = router