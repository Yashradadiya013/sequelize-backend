const db = require('../model/index')
async function Booksignup(req, res) {
    try {
        const {bookName,course,sem} = req.body
        const newBook = await db.book.create({
            bookName,
            course,
            sem
        })
        return res.json({ newBook })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = {Booksignup}