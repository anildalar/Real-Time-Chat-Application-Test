const express = require('express');
const app = express();
const { Server } = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);

app.get('/',(req,res)=>{
    console.log(__dirname);
    res.sendFile(__dirname+'/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected' ,socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected',socket.id);
    });

    socket.on('someEvent1',(payload)=>{
        console.log('payload',payload);
        io.emit('someEvent2',payload);
    })
});

let port = 3000;
server.listen(port,()=>{
    console.log("The server is running at ",port)
});
