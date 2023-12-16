const { Bad, Image_Size } = require("../../../utils/constant");
const { Something, NoFile, ImageSizeError } = require("../../../utils/message");
const { validate_add_story } = require("./validation");

module.exports = {
  Story_Validations: {
    AddStoryBody: (req, res, next) => {
      if (!req.file) {
        return res.status(Bad).json({ message: NoFile, status: Bad });
      }
      if (req.file.size > Image_Size * 1024 * 1024) {
        return res.status(Bad).json({ message: ImageSizeError, status: Bad });
      }
      const { error } = validate_add_story(req.file);
      if (error) return res.status(Bad).json({ message: error.details[0].message, status: Bad });
      return next();
    },
  },
};
