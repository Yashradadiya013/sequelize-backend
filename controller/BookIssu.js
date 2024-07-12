const db = require('../model/index')
async function BooksIssuSignup(req, res) {
    try {
        const {bookid,userId,issuedate,submitiondate} = req.body
        const newBook = await db.bookIssue.create({
            bookid,
            userId,
            issuedate,
            submitiondate
        })
        return res.json({ newBook })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = {BooksIssuSignup}