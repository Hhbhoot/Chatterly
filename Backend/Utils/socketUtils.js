import UserModel from '../Models/UserModel.js';

export async function updateSocketId(userId, socketId) {
  const user = await UserModel.findById(userId);
  if (user) {
    user.socketId = socketId;
    await user.save();
    return user;
  }
}

export async function removeSocketId(userId) {
  const user = await UserModel.findById(userId);
  if (user) {
    user.socketId = '';
    await user.save();
    return user;
  }
}

export async function getSocketId(userId) {
  const user = await UserModel.findById(userId);
  if (user) {
    return user.socketId;
  }
}

export async function getAllUsers() {
  const users = await UserModel.find();
  return users;
}

export async function getOnlineUsers() {
  const users = await UserModel.find({ socketId: { $ne: '' } });
  return users;
}

export async function getOnlineUsersCount() {
  const users = await UserModel.find({ socketId: { $ne: '' } });
  return users.length;
}
