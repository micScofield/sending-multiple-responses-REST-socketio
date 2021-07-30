const express = require('express')
const { router } = require('./routes')
const { signupRouter } = require('./routes/signup')

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Requested-With')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
    
    next()
})

app.use(router)
app.use(signupRouter)

const server = app.listen(5000, () => console.log('Server started on 5000'))

// Socket
const io = require('./socket').init(server)

io.on('connection', socket => {
    console.log('Client Connected')

    socket.on('disconnect', () => {
        console.log('Client disconnected')
    })
})
