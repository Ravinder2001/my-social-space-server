const client = require("../configuration/db");
const generateTimestamp = require("../utils/common/generateTimestamp");

module.exports = {
  addFilesToTrash: async (images) => {
    try {
      images.map(async (file) => {
        await client.query(
          `
        INSERT INTO tbl_files_trash(file,created_at)
        VALUES($1,$2)
        `,
          [file, generateTimestamp()]
        );
      });
    } catch (error) {
      console.error("Error adding images to trash:", error);
      throw error;
    }
  },
  getExpiredFiles: async () => {
    try {
      const { rows: expiredImages } = await client.query(`
        SELECT file FROM tbl_files_trash 
        WHERE created_at < NOW() - INTERVAL '1 day'
      `);
      return expiredImages.map((img) => img.file);
    } catch (error) {
      console.error("Error fetching expired images:", error);
      throw error;
    }
  },
  removeFilesFromTrash: async (images) => {
    try {
      await client.query(`DELETE FROM tbl_files_trash WHERE file = ANY($1::text[])`, [images]);
    } catch (error) {
      console.error("Error removing images from trash:", error);
      throw error;
    }
  },
};
