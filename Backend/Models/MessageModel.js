import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
      required: true,
    },
    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    messageType: {
      type: String,
      enum: ['text', 'image', 'video', 'audio', 'file'],
      required: true,
    },
    messageStatus: {
      type: String,
      enum: ['sent', 'delivered', 'read'],
      default: 'sent',
    },
    file: {
      type: mongoose.Schema.Types.ObjectId,
      required: function () {
        return this.messageType !== 'text';
      },
    },
  },
  {
    timestamps: true,
  },
);

const MessageModel = mongoose.model('Message', messageSchema);

export default MessageModel;
