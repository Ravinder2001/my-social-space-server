const { Bad } = require("../../../utils/constant");
const { NoFile } = require("../../../utils/message");
const { validate_post_file } = require("./validation");

module.exports = {
  Post_Validations: {
    PostFile: (req, res, next) => {
      if (!req.file) {
        return res.status(Bad).json({ message: NoFile, status: Bad });
      }
      const { error } = validate_post_file(req.file);
      if (error)
        return res
          .status(Bad)
          .json({ message: error.details[0].message, status: Bad });
      return next();
    },
  },
};
