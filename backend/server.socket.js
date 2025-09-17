require('dotenv').load()
const jwtHelper = require('./modules/core/helpers/jwtHelper')
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const ip = process.env.IP || 'localhost'
const port = 4005;

const app = express();
app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
    },
});

const loggedInSockets = new Set();
io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token || !token.startsWith('Bearer ')) {
        return next(new Error('Unauthorized: Missing or invalid token'));
    }

    const actualToken = token.replace('Bearer ', '');
    try {
        // ⚠️ KHÔNG xác thực chữ ký
        const decoded = jwtHelper.verifyToken(actualToken);

        if (!decoded || !decoded.exp) {
            return next(new Error('Unauthorized: Invalid token structure'));
        }

        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp < now) {
            return next(new Error('Unauthorized: Token expired'));
        }
        socket.user = decoded; // Hoặc verified nếu bạn dùng verify

        loggedInSockets.add(socket); // lưu socket vào danh sách đã login
        socket.on('disconnect', () => {
            loggedInSockets.delete(socket); // cleanup khi disconnect
        });
        next();
    } catch (err) {
        return next(new Error('Unauthorized: Token invalid'));
    }
});

io.on('connection', (socket) => {
    console.log('[Socket.IO] Client connected:', socket.id);
});

// 📌 API này sẽ được gọi từ server.js
app.post('/emit/shopping/order/new', (req, res) => {
    const order = req.body;
    // Chỉ emit tới các socket có gắn socket.user
    for (const socket of loggedInSockets) {
        socket.emit('shopping:order:new', order);
    }
    res.json({
        code: 1,
        status: 200,
        data: {
            order
        }
    });
});

server.listen(port, ip, () => {
    console.log('🚀 Socket.IO server listening on port 4005');
});
