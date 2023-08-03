const { Bad } = require("../../../utils/constant");
const { NoFile } = require("../../../utils/message");
const { validate_post_file, validate_post_body } = require("./validation");

module.exports = {
  Post_Validations: {
    PostFile: (req, res, next) => {
      if (!req.files) {
        return res.status(Bad).json({ message: NoFile, status: Bad });
      }
      if (req.body.caption.length == 0 && req.files.length == 0) {
        return res.status(Bad).json({ message: NoFile, status: Bad });
      }
      const { error } = validate_post_file(req.files);
      if (error)
        return res
          .status(Bad)
          .json({ message: error.details[0].message, status: Bad });
      return next();
    },
    PostBody: (req, res, next) => {
      const { error } = validate_post_body(req.body);
      if (error)
        return res
          .status(Bad)
          .json({ message: error.details[0].message, status: Bad });
      return next();
    },
  },
};
