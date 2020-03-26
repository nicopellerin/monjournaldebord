const socketio = require('socket.io')
const express = require('express')

const { userJoin, userLeave, getUsers } = require('./utils/users')

const app = express()

const PORT = process.env.PORT || 5000

const expressServer = app.listen(PORT, console.log('Chat server listening'))

const io = socketio(expressServer)

io.on('connection', socket => {
  socket.emit('message', {
    username: 'monjournaldebord',
    message: 'Bienvenue sur le chat!',
    createdAt: Date.now(),
  })

  socket.on('userInfo', userInfo => {
    const user = userJoin({ id: socket.id, ...userInfo })

    socket.broadcast.emit('message', {
      username: user.username,
      avatar: user.avatar,
      message: 'a rejoint la conversation',
      createdAt: Date.now(),
      joined: true,
    })
  })

  console.log(getUsers())

  io.emit('users', getUsers())

  socket.on('disconnect', () => {
    const user = userLeave(socket.id)

    if (user) {
      io.emit('message', {
        username: user.username,
        avatar: user.avatar,
        message: 'a quitté la conversation',
        createdAt: Date.now(),
        joined: true,
      })
    }
  })

  socket.on('chatMessage', msg => {
    io.emit('message', msg)
  })
})
