const { userSocketController } = require("../socket-controllers")

module.exports.userSocket = (io, socket, users) => {
    // User connect - online
    socket.on("joinUser", (client) => {
        userSocketController.joinUser(io, socket, users, client);
    });
    
    socket.on("checkUserOnline", (data) => {
        userSocketController.checkUserOnline(io, socket, users, data);
    });

    socket.on("follow", (data)=>{
        userSocketController.follow(io, socket, users, data);
    });
    socket.on("unFollow", (data)=>{
        userSocketController.unFollow(io, socket, users, data);
    })

    // User disconnect - offline
    // socket.on("disconnect", () => {
    //     userSocketController.checkUserOffline(io, socket, users)
    // });
}