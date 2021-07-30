const router = require('express').Router()

const axios = require('axios')
const { getIo } = require('../socket')

function getData() {
    for (let i=0; i <= 10000000; i++) {}
    return 'test'
}

router.get('/signup', async (req, res) => {
    res.json({ msg: 'Check your email for further details...' })
    const users = await axios.get('https://jsonplaceholder.typicode.com/users')

    const test = getData()

    const io = getIo()
    io.emit('user-signup', users.data)
})

exports.signupRouter = router