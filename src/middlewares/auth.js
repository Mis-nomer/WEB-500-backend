import User from "../models/user";

export const auth = async (req, res, next) => {
  try {
    const target = req.body;
    const targetUser = await User.findOne({ email: target.email });
    res.status(200).json({
      data: targetUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }

  next();
};
