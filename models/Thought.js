const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction.js");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: new Date(),
      get: function (createdAt) {
        const day = createdAt.getDate();
        const month = createdAt.getMonth();
        const year = createdAt.getFullYear();
        const hour = createdAt.getHours();
        const minute = createdAt.getMinutes();

        const dateCreated = `${day}-${month}-${year} at ${hour}:${minute}`;

        return dateCreated;
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return `${this.reactions.length}`;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
