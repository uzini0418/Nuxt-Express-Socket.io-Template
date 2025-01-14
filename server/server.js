const { Nuxt, Builder } = require('nuxt')
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 3000
const isProd = process.env.NODE_ENV === 'production'

const api = require('./api');

// Import API Routes
app.use('/api', api);

// We instantiate Nuxt.js with the options
var config = require('../nuxt.config.js')
config.dev = !isProd

const nuxt = new Nuxt(config)
// Start build process in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}
app.use(nuxt.render)

// Listen the server
server.listen(port, '0.0.0.0')
console.log('Server listening on localhost:' + port) // eslint-disable-line no-console

// rooms
const rooms = [
  { id: 0, title: 'room1' },
  { id: 1, title: 'room2' },
  { id: 2, title: 'room3' },
  { id: 3, title: 'room4' },
];

// Socket.io
var messages = []
io.on('connection', (socket) => {
  socket.on('last-messages', function (fn) {
    fn(messages.slice(-50))
  })
  socket.on('send-message', function (message) {
    messages.push(message)
    console.log('socket id:' + socket.id + " / name:" + message.name + " / text:" + message.text)
    socket.broadcast.emit('new-message', message)
  })

  // room 입장
  socket.on('join-room', (num, name) => {
    console.log(num, name)
    console.log(rooms)

    socket.join(rooms[num], () => {
      console.log(name + ' join a ' + rooms[num].title)
      io.to(rooms[num]).emit('join-room', num, name)
    })
  })

})