import mongoose from 'mongoose';
const callSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    caller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    reciever: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    callType: {
      type: String,
      enum: ['audio', 'video'],
      default: 'audio',
    },
    startTime: {
      type: Date,
      default: Date.now,
    },
    endTime: {
      type: Date,
    },
    duration: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['missed', 'rejected', 'completed'],
      default: 'missed',
    },
  },
  {
    timestamps: true,
  },
);

const CallModel = mongoose.model('Call', callSchema);

export default CallModel;
