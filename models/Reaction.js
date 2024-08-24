const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => {
        const day = createdAt.getDate();
        const month = createdAt.getMonth();
        const year = createdAt.getFullYear();
        const hour = createdAt.getHours();
        const minute = createdAt.getMinutes();

        const dateCreated = `${day}-${month}-${year} at ${hour}:${minute}`;

        return dateCreated;
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
