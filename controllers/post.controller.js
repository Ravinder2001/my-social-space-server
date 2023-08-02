const { Success, Bad } = require("../utils/constant");

module.exports = {
  Add_Post: (req, res) => {
    try {

    res.status(200).json({ data: "OK" });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
};
