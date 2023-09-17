const logger = require("node-color-log");
const { videoService } = require("../services");
const { getTracksInQueue, getPlayingVideo, getJunior, getOther, getSenior } = videoService;

function editData(data, id, call) {
    const newData = data.map(item => item.id === id ? { ...item, call } : item);
    return newData;
}

function SocketRoute(io, socketInfo) {
    let users = [];
    const onConnection = (socket) => {
        logger.info("NEW CONNECTION");

        // Users
        socket.on("joinUser", (user) => {
            !users.some(u => u.id === user._id) && users.push({ id: user._id, socketId: socket.id, followers: user.followers });
        });

        socket.on("checkUserOnline", (user) => {
            const clients = users.filter(u => user.following.find(c => c._id === u.id));
            socket.emit("checkUserOnlineToMe", clients);
            if (clients.length > 0) {
                clients.forEach(client => {
                    socket.to(`${client.socketId}`).emit('checkUserOnlineToClient', user._id)
                })
            }
        });

        socket.on("follow", (data) => {
            logger.info("Follow");
            try {
                const user = users.find(user => user.id === data._id);
                user && socket.to(`${user.socketId}`).emit('followToClient', data);
            } catch (error) {
                logger.error(error.message);
            }
        });

        socket.on("unFollow", (data) => {
            logger.info("UnFollow");
            try {
                const user = users.find(user => user.id === data._id);
                user && socket.to(`${user.socketId}`).emit('UnFollowToClient', data);
            } catch (error) {
                logger.error(error.message);
            }
        });

        // Message
        socket.on("addMessage", (msg) => {
            try {
                const user = users.find(user => user.id === msg.recipient);
                user && socket.to(`${user.socketId}`).emit('addMessageToClient', msg);
            } catch (error) {
                logger.error(error.message);
            }
        });

        socket.on("deleteMessage", (data) => {
            logger.warn("Delete Message");
            const { msg } = data;
            try {
                const user = users.find(u => u.id === msg.recipient);
                user && socket.to(`${user.socketId}`).emit("deleteMessageToClient", data);
            } catch (error) {
                logger.error(error.message);
            }
        });

        socket.on("deleteConversation", (data) => {
            logger.warn("Delete Conversation");
            try {
                const ids = [];
                let id = "";
                for (let i = 0; i < data.recipients.length; i++) {
                    if (data.recipients[i].toString() !== data.user._id.toString()) {
                        ids.push(data.recipients[i]);
                    } else {
                        id = data.recipients[i]
                    }
                }
                const user = users.find(u => ids.includes(u.id));
                user && socket.to(`${user.socketId}`).emit("deleteConversationToClient", id);
            } catch (error) {
                logger.error(error.message);
            }
        });

        // Post
        socket.on("likePost", (post) => {
            logger.info("Like post");
            try {
                const ids = [...post.user.followers, post.user._id];
                const clients = users.filter(user => ids.includes(user.id));
                if (clients.length > 0) {
                    clients.forEach(client => {
                        socket.to(`${client.socketId}`).emit('likeToClient', post)
                    });
                };
            } catch (error) {
                logger.error(error.message);
            }
        });

        socket.on("unLikePost", (post) => {
            logger.info("Unlike post");
            try {
                const ids = [...post.user.followers, post.user._id]
                const clients = users.filter(user => ids.includes(user.id))

                if (clients.length > 0) {
                    clients.forEach(client => {
                        socket.to(`${client.socketId}`).emit('unLikeToClient', post)
                    });
                };
            } catch (error) {
                logger.error(error.message);
            }
        });

        socket.on("createPost", (post) => {
            logger.info("Create post");
            try {
                const ids = [...post.user.followers.map(u => u._id), post.user._id];
                const clients = users.filter((user) => ids.includes(user.id));
                // console.log({ clients });
                if (clients && clients.length > 0) {
                    clients.forEach((client) => {
                        socket.to(`${client.socketId}`).emit('createPostToClient', post)
                    });
                };
            } catch (error) {
                logger.error(error.message);
            }
        });

        socket.on("editPost", (post) => {
            logger.info("Edit post");
            try {
                const ids = [...post.user.followers];
                // console.log({ ids });
                const clients = users.filter((user) => ids.includes(user.id));
                if (clients && clients.length > 0) {
                    clients.forEach((client) => {
                        socket.to(`${client.socketId}`).emit('editPostToClient', post);
                    });
                };
            } catch (error) {
                logger.error(error.message);
            }
        });

        socket.on("deletePost", (post) => {
            logger.warn("Delete post");
            // console.log({post});
            try {
                const ids = [...post.user.followers, post.user._id];
                // console.log({ ids });
                const clients = users.filter((user) => ids.includes(user.id));
                if (clients && clients.length > 0) {
                    clients.forEach((client) => {
                        socket.to(`${client.socketId}`).emit('deletePostToClient', post);
                    });
                };
            } catch (error) {
                logger.error(error.message);
            }
        });

        // Comment
        socket.on("createComment", (post) => {
            logger.info("Create comment");
            try {
                const ids = [...post.user.followers, post.user._id];
                const clients = users.filter(user => ids.find(id => id === user.id));
                if (clients.length > 0) {
                    clients.forEach(client => {
                        socket.to(`${client.socketId}`).emit("createCommentToClient", post)
                    })
                }
            } catch (error) {
                logger.error(error.message);
            }
        });

        socket.on("deleteComment", (post) => {
            logger.warn("Delete comment");
            try {
                const ids = [...post.user.followers, post.user._id];
                const clients = users.filter(user => ids.find(id => id === user.id));
                if (clients.length > 0) {
                    clients.forEach(client => {
                        socket.to(`${client.socketId}`).emit("deleteCommentToClient", post)
                    })
                }
            } catch (error) {
                logger.error(error.message);
            }
        })

        socket.on("likeComment", (post) => {
            logger.info("Like comment");
            try {
                const ids = [...post.user.followers, post.user._id];
                const clients = users.filter(user => ids.find(id => id === user.id));
                if (clients.length > 0) {
                    clients.forEach(client => {
                        socket.to(`${client.socketId}`).emit('likeCommentToClient', post);
                    });
                }
            } catch (error) {
                logger.error(error.message);
            }
        });

        socket.on("unLikeComment", (post) => {
            logger.info("UnLike comment");
            try {
                const ids = [...post.user.followers, post.user._id];
                const clients = users.filter(user => ids.find(id => id === user.id));
                if (clients.length > 0) {
                    clients.forEach(client => {
                        socket.to(`${client.socketId}`).emit("unLiekCommentToClient", post)
                    })
                }
            } catch (error) {
                logger.error(error.message);
            }
        });

        // Notify
        socket.on("createNotify", (msg) => {
            logger.info("Create Notify");
            const clients = users.filter(user => msg.recipients.includes(user.id));
            if (clients) {
                clients.forEach((client) => {
                    socket.to(`${client.socketId}`).emit('createNotifyToClient', msg);
                });
            }
        });

        socket.on("removeNotify", (msg) => {
            logger.info("Remove Notify");
            const clients = users.filter(user => msg.recipients.includes(user.id.toString()))
            if (clients) {
                clients.forEach((client) => {
                    socket.to(`${client.socketId}`).emit('removeNotifyToClient', msg);
                })
            }
        });

        // Call
        socket.on("callUser", (data) => {
            logger.info("CALLING...");
            // console.log({ data });
            try {
                // console.log({ old: users });
                users = editData(users, data.sender, data.recipient);
                const client = users.find(u => u.id === data.recipient);
                // console.log({client});
                if (client) {
                    if (client.call) {
                        socket.emit("userBusy", data);
                        users = editData(users, data.sender, null);
                    } else {
                        users = editData(users, data.recipient, data.sender);
                        socket.to(`${client.socketId}`).emit('callUserToClient', data);
                    }
                }
                // console.log({ new: users });
            } catch (error) {
                logger.error(error.message);
            }
        });

        socket.on("endCall", (data) => {
            logger.info("END CALL");
            // console.log({users});
            try {
                const client = users.find(u => u.id === data.sender);
                // const clientEndCall = users.find(u => u.id === data.recipient);
                // if (clientEndCall) {
                //     socket.to(`${clientEndCall.socketId}`).emit('endCallToClient', data);
                // }
                if (client) {
                    socket.to(`${client.socketId}`).emit('endCallToClient', data);
                    users = editData(users, client.id, null);
                    if (client.call) {
                        const clientCall = users.find(u => u.id === client.call);
                        clientCall && socket.to(`${clientCall.socketId}`).emit('endCallToClient', data);

                        users = editData(users, client.call, null);
                    }
                }
            } catch (error) {
                logger.error(error.message);
            }
        });

        // User disconnect - offline
        socket.on('disconnect', () => {
            logger.warn("SOCKET DISCONNECT!!!");
            const data = users.find(user => user.socketId === socket.id)
            if (data) {
                const clients = users.filter(user =>
                    data.followers.find(u => u._id === user.id)
                )

                if (clients.length > 0) {
                    clients.forEach(client => {
                        socket.to(`${client.socketId}`).emit('CheckUserOffline', data.id)
                    })
                }

                if (data.call) {
                    const callUser = users.find(user => user.id === data.call)
                    if (callUser) {
                        users = editData(users, callUser.id, null)
                        socket.to(`${callUser.socketId}`).emit('callerDisconnect')
                    }
                }
            }

            users = users.filter(user => user.socketId !== socket.id);
            // console.log({users});
        });

        // tracks
        const tracks = getTracksInQueue();
        socket.emit('update-tracks', tracks);
        const { playingVideo, playedTime } = getPlayingVideo();
        socket.emit('playingVideo', { playingVideo, playedTime });
        io.emit('senior-tracks-update', getSenior());
        io.emit('junior-tracks-update', getJunior());
        io.emit('other-tracks-update', getOther());

        socketInfo.io = io;
        socketInfo.socket = socket;
        socketInfo.users = users;
    }
    io.on("connection", onConnection);
}

module.exports = {
    socketRoute: SocketRoute
};