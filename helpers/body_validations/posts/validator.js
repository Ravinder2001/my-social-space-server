const { Bad, Image_Size } = require("../../../utils/constant");
const { NoFile, ImageSizeError } = require("../../../utils/message");
const {
  validate_post_file,
  validate_post_body,
  validate_comment_body,
  validate_like_body,
} = require("./validation");

module.exports = {
  Post_Validations: {
    PostFile: (req, res, next) => {
      // console.log(req.files)
      // console.log(req.body)
      if (!req.files) {
        return res.status(Bad).json({ message: NoFile, status: Bad });
      }
      if (req.body.caption.length == 0 && req.files.length == 0) {
        return res.status(Bad).json({ message: NoFile, status: Bad });
      }
      const index = req.files.findIndex(
        (item) => item.size > Image_Size * 1024 * 1024
      );
      if (index != -1) {
        return res.status(Bad).json({ message: ImageSizeError, status: Bad });
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
    CommentBody: (req, res, next) => {
      const { error } = validate_comment_body(req.body);
      if (error)
        return res
          .status(Bad)
          .json({ message: error.details[0].message, status: Bad });
      return next();
    },
    LikeBody: (req, res, next) => {
      const { error } = validate_like_body(req.body);
      if (error)
        return res
          .status(Bad)
          .json({ message: error.details[0].message, status: Bad });
      return next();
    },
  },
};
