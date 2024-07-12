const db = require('../model/index')
async function Booksignup(req, res) {
    try {
        const {bookName,course,sem,userId} = req.body
        const newBook = await db.book.create({
            bookName,
            course,
            sem,
            userId
        })
        return res.json({ newBook })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = {Booksignup}