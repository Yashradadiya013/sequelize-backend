const db = require('../model/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = '$h:n(?bj'
const { transporter } = require('../util/nodemailor')


async function Usersignup(req, res) {
    try {

        const { firstName, lastName, birthdate, email, phone, password, avatar, type } = req.body

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
        const mailOptions = {
            from: "yashradadiya013@gmail.com",
            to: email,
            subject: 'Email Verification',
            text: `Click on the following link to verify your email: http://localhost:3000/api/verify_email/${token}`,
        }
        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ msg: "Error sending verification email." });
            } else {
                return res.status(201).json({ msg: "Registration successful. Please check your email for verification." });
            }
        })
        console.log('newUser --->', newUser);
        res.status(200).json({ status: 'User Registration SuccessFully !' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

async function verify_email(req, res) {
    try {
        const { token } = req?.params
        console.log(' req?.query; --->', req?.params);
        if (!token) {
            return res.status(400).json({ msg: "Token is required" })
        }
        const user = await db.user.findOne({ where: { verification_token: token } });
        if (!user) {
            return res.status(401).json({ msg: "Invalid Token" });
        }
        user.isVerified = true;
        await user.save();
        return res.json({ status: 'Email Verification Successfully...' });
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

        const SignIntoken = await jwt.sign({ id: User.id, email: User.email }, secretKey, { expiresIn: "1d" })

        return res.status(200).json({ msg: "User Logged In Successfully", SignIntoken: SignIntoken });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

async function forgotPassword(req, res) {
    try {
        const findEmail = await db.user.findOne({ where: { email: req.body.email } })
        if (!findEmail) {
            res.json({ msg: "email not found" })
        } else {
            const token = jwt.sign({ id: findEmail.id }, secretKey, { expiresIn: "1d" })
            console.log('forgottoken --->', token);
            findEmail.forgotpasswordToken = token
            findEmail.save()

            const mailOptions = ({
                from: 'yashradadiya013@gmail.com',
                to: findEmail.email,
                subject: 'reset password',
                text: `Click on the following link to forgot your password: http://localhost:3000/api/resetpassword/${token}`
            })
            transporter.sendMail(mailOptions, (errro) => {
                if (errro) {
                    res.status(404).json({ error: 'Email sending failed' })
                }
                res.json({ status: 'email send success...!', token })
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}


async function resetPassword(req, res) {
    try {
        const token = req.headers?.token;
        if (!token) {
            return res.status(400).json({ message: 'Token is missing' });
        }

        const findUser = await db.user.findOne({ where: { forgotpasswordToken: token } });
        if (!findUser) {
            return res.status(404).json({ message: 'Token not found' });
        }

        const { newPassword } = req.body;
        if (!newPassword) {
            return res.status(400).json({ message: 'New password is missing' });
        }

        findUser.password = await bcrypt.hash(newPassword, 10);
        await findUser.save();

        res.json({ message: 'Password forgot successfully' });
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
    UserSignIn,
    verify_email,
    forgotPassword,
    resetPassword
}