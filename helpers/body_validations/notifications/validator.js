const { Bad, Image_Size } = require("../../../utils/constant");
const { Something, NoFile, ImageSizeError } = require("../../../utils/message");
const { validate_add_story, validate_create_body } = require("./validation");

module.exports = {
  Notifications_Validations: {
    CreateBody: (req, res, next) => {
      const { error } = validate_create_body(req.file);
      if (error) return res.status(Bad).json({ message: error.details[0].message, status: Bad });
      return next();
    },
  },
};
