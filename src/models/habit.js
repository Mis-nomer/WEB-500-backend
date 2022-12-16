import mongoose from "mongoose";
import User from "./user";

const habitSchema = mongoose.Schema(
  {
    email: {
      type: String,
    },
    title: {
      type: String,
      maxLength: 150,
    },
    description: {
      type: String,
      maxLength: 500,
    },
    startDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    labels: {
      type: [String],
    },
    repeat: {
      type: [String],
    },
    streak: {
      default: [],
      type: [String],
    },
    options: {
      reminder: {
        type: Boolean,
        default: true,
      },
    },
  },
  { timestamps: true }
);

habitSchema.methods = {
  // check if user exist
  async authenticate(email) {
    let user = await User.findOne({ email });
    return user;
  },
};

export default mongoose.model("Habit", habitSchema);
