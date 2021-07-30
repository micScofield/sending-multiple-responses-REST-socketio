const router = require('express').Router()

const axios = require('axios')
const { getIo } = require('../socket')


function getData() {
    for (let i=0; i <= 10000000; i++) {}
    return 'test'
}

router.get('/', async (req, res) => {
    res.json({ msg: 'Request under process' })
    const users = await axios.get('https://jsonplaceholder.typicode.com/users')

    const test = getData()

    const io = getIo()
    io.emit('user-data', users.data)
})

module.exports = { router }