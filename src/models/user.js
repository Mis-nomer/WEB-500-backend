import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      maxLength: 100,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
  },
  { timestamps: true }
);

userSchema.methods = {
  enc(secret) {
    if (!secret) return "";

    try {
      const salt = "helloworld!";
      return crypto.createHmac("SHA256", salt).update(secret).digest("hex");
    } catch (err) {
      console.error(err);
    }
  },

  authenticate(password) {
    return this.enc(password) === this.password;
  },
};

userSchema.pre("save", function (next) {
  this.password = this.enc(this.password);
  next();
});

export default mongoose.model("User", userSchema);
