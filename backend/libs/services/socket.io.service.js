// socket.js
const socketIo = require('socket.io');

let io; // io sẽ được khởi tạo ở init()

function initSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: "*",
        },
    });

    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);

        socket.on('message', (data) => {
            console.log('Received:', data);
            io.emit('message', data);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
}

function getSocket() {
    if (!io) {
        throw new Error('❌ Socket.IO chưa được khởi tạo!');
    }
    return io;
}

// Truy cập các emitter được chia theo domain
const socketShopping = {
    order: {
        emitNew(orderData) {
            if (!io) {
                console.warn('Socket.IO chưa được khởi tạo!');
                return;
            }
            console.log('[Emit] shopping:order:new', orderData);
            io.emit('shopping:order:new', orderData);
        }
    }
};

module.exports = {
    initSocket,
    getSocket,
    socketShopping,
};
