const db = require('../model/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = '$h:n(?bj'
// msuy pjxx zhbt pcrf

async function Usersignup(req, res) {
    try {

        const { firstName, lastName, birthdate, email, phone, password, avatar, type } = req.body
        // console.log('req.body --->', req.body);

        const existingUserByEmail = await db.user.findOne({ where: { email } })
        if (existingUserByEmail) {
            return res.status(400).json({ msg: 'Email is already registered' })
        }
        const HashPassword = await bcrypt.hash(password, 10)
        const token = jwt.sign({ email }, secretKey, { expiresIn: '1d' })
        //crreate new user
        const newUser = await db.user.create({
            firstName,
            lastName,
            birthdate,
            email,
            phone,
            password: HashPassword,
            verification_token: token,
            avatar,
            type
        })
        return res.json({ newUser })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

async function UserSignIn(req, res) {
    try {
        const { email, password } = req.body;

        const User = await db.user.findOne({ where: { email } });
        if (!User) {
            return res.status(500).json({ msg: "User not exist with this email" });
        }

        const isPasswordValid = await bcrypt.compare(password, User.password);
        if (!isPasswordValid) {
            return res.status(500).json({ msg: "Password didn't match" });
        }

        const SignIntoken = await jwt.sign({id:User.id,email:User.email},secretKey,{expiresIn:"1d"})
        
        return res.status(200).json({ msg: "User Logged In Successfully",SignIntoken:SignIntoken });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}


async function SerchingData(req, res) {
    try {
        const data = await db.user.findOne({
            where: { id: 5 },
            attributes: ["firstName", "lastName"],
            include: [
                {
                    model: db.book,
                    attributes: ["bookName"]
                },
                {
                    model: db.bookIssue,
                    attributes: ["issuedate", "submitiondate"]
                }
            ]
        })
        res.json({ data: data })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}



module.exports = {
    Usersignup,
    SerchingData,
    UserSignIn
}