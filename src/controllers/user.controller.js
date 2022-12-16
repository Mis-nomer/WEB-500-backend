import User from "../models/user";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { jwt } from "jsonwebtoken";
import * as dotenv from "dotenv";

export default {
  signup: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userExist = await User.findOne({ email }).exec();

      if (userExist) throw `Account '${target.email}' already exists`;

      const user = await new User({ email, password }).save((err, target) => {
        if (err) throw err;
      });

      return res.status(200).json({
        message: "User registered",
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        message: error,
      });
    }
  },
  signin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) throw `Account '${email}' does not exists`;
      if (!user.authenticate(password)) throw `Password does not match`;

      const token = jwt.sign("HS256", process.env.CLIENT_SECRET, {
        email,
      });
      return res.status(200).json({
        data: user,
        accessToken: token,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  },
  list: (req, res) => {
    User.find(req.body || "")
      .then((response) => res.status(200).json(response))
      .catch((err) => console.error(err));
  },
  remove: (req, res) => {
    const user = req.body;
    if (user.role) {
      return res
        .status(400)
        .json({ message: "You do not have permission for this action" });
    }

    User.findOne({ email: user.email, role: 0 }).deleteOne().exec();

    return res.status(200).json({ message: "user deleted successfully" });
  },
};
