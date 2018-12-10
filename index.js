import http from 'http';
import express from 'express';
import cors from 'cors';
import io from 'socket.io';

// setup
const app = express();
const server = http.createServer(app);
const socketIo = io(server);
const PORT = 3000;

// CORS
app.use(cors());

// Start listening
server.listen(process.env.PORT || PORT);
console.log(`Chat api is running on port ${PORT}`);


let msgList = [], userList = [];


app.get('/', (req, res) =>
      res.send(`Chat api is running on port ${PORT}`)
);

socketIo.on('connection', socket => {
      const user = socket.handshake.query.user;
      console.log(`connected ${user}`);
      userList.push(user);
      console.log(userList);

      socketIo.emit('userList', userList);

      socket.on('client:msg', data => {
            console.log(`${data.user}: ${data.msg}`);
            msgList.push(data);
            msgList.slice(0, 10);
            socketIo.emit('msgList', msgList);
            console.log(msgList);
      });

      socket.on('disconnected', () => {
            var index = userList.indexOf(user);
            if (index > -1) {
                  userList.splice(index, 1);
            }
            console.log(`${user} disconnected`);
            console.log(userList);
            socket.broadcast.emit('userList', userList);

            msgList.push({user, msg: "disconnected"});
            msgList.slice(0, 10);
            socket.broadcast.emit('msgList', msgList);

      });

      socket.on('userList', () => {
            socketIo.emit('userList', userList);
      });
      socket.on('msgList', () => {
            socketIo.emit('msgList', msgList);
      });
      socket.on('userTyping', () => {
            socket.broadcast.emit('userTyping');
      });
});

export default app;