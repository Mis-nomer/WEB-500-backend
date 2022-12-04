import User from "../models/user";
import jwt from "jsonwebtoken";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import passport from "passport";

export default {
  signup: async (req, res) => {
    try {
      const target = req.body;
      const targetUser = await User.findOne({ email: target.email });

      if (targetUser) throw `Account '${target.email}' already exists`;

      const user = await new User(target).save((err, _) => {
        if (err) throw err;
      });

      return res.status(200).json({
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        message: error,
      });
    }
  },
  googleSignin: async (req, res) => {
    const userInfo = await passport.authenticate("google", {
      failureRedirect: "/",
    });
    res.status(200).json({
      data: userInfo,
    });
  },
  signin: async (req, res) => {
    try {
      const target = req.body;
      const targetUser = await User.findOne({ email: target.email });
      const token = jwt.sign({ _id: target._id }, "secret");
      if (!targetUser) throw `Account '${target.email}' does not exists`;
      if (!this.authenticate(target.password)) throw `Password does not match`;

      user.password = null; 

      return res.status(200).json({
        data: user,
        accessToken: token,
      });
    } catch (error) {
      res.status(400).json({
        message: error,
      });
    }
  },
  list: (req, res) => {
    User.find(req.body || "")
      .then((response) => res.status(200).json(response))
      .catch((err) => console.error(err));
  },
};
