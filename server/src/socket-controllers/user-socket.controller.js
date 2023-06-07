'use strict';

class UserSocektContoller {
    joinUser(io, socket, users, user) {
        !users.some(u => u.id === user._id) && users.push({ id: user._id, socket: socket.id });
    }
}

module.exports = new UserSocektContoller;