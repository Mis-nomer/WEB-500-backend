import { expressjwt, ExpressJwtRequest } from "express-jwt";

export const requireSignin = expressjwt({
  algorithms: ["HS256"],
  secret: "triple-six-five-forked-tongue",
  requestProperty: "auth",
});

export const isAuth = (req, res, next) => {
  const status = req.profile._id == req.auth._id;

  if (!status) {
    res.status(400).json({
      message: "You don't have required permission",
    });
  } else {
    next();
  }
};

export const isAdmin = (req, res, next) => {
  if (!req.profile.role) {
    res.status(401).json({
      message: "You don't have admin privilege!",
    });
  } else {
    next();
  }
};

// export const auth = async (req, res, next) => {
//   try {
//     const target = req.body;
//     const targetUser = await User.findOne({ email: target.email });

//     res.status(200).json({
//       data: targetUser,
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: error,
//     });
//   }

//   next();
// };
