const admin = require("../firebase.config");
const { Bad } = require("../utils/constant");
module.exports = {
  Verify_Id_Token: async (req, res, next) => {
    try {
      const decode = await admin.auth().verifyIdToken(req.body.token);
      if (decode.email_verified) {
        req.customData = {
          email: decode.email,
          name: decode.name,
          id: decode.uid,
        };
        next();
      } else {
        res.status(Bad).json({ message: "Email not verified" });
      }
    } catch (err) {
      res.status(Bad).json({ message: "Invalid token", status: Bad });
    }
  },
};
