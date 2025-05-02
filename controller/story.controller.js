const storyModel = require("../model/story.model");
const asyncHandler = require("../helpers/asyncHandler");
const { generatePreSignedURL, deleteImageFromS3 } = require("../utils/common/imageUploadToS3");

module.exports = {
  addStory: asyncHandler(async (req) => {
    await storyModel.addStory({ ...req.body, user_id: req.user.user_id });

    return {
      message: "Story added successfully",

      status: 200,
    };
  }),
  deleteStory: asyncHandler(async (req) => {
    const story_id = req.params.story_id;
    const storyData = await storyModel.deleteStory(story_id, req.user.user_id);

    if (storyData.media_url) {
      await deleteImageFromS3(storyData.media_url);
    }

    return {
      message: "Story deleted successfully",
      status: 200,
    };
  }),
  getUserStories: asyncHandler(async (req) => {
    const stories = await storyModel.getUserStories(req.user.user_id);

    const updatedStories = await Promise.all(
      stories.map(async (story) => {
        if (story.media_url) {
          story.media_url = await generatePreSignedURL(story.media_url);
        }
        if (story.profile_picture) {
          story.profile_picture = await generatePreSignedURL(story.profile_picture);
        }
        if (story.user_id == req.user.user_id) {
          story.ownStory = true;
          story.user_name = "You";
        }
        delete story.user_id;
        return story;
      })
    );

    return {
      message: "Story added successfully",
      data: updatedStories,
      status: 200,
    };
  }),
};
