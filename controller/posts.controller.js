const postModel = require("../model/posts.model");
const common = require("./common.controller");
const { HttpStatus } = require("../utils/constant/constant");
const Messages = require("../utils/constant/messages");

module.exports = {
  getAllPosts: async (req, res) => {
    try {
      console.log(req.user);
      let data = [
        {
          post_id: 1,
          user_name: "John Doe",
          user_avatar: "https://example.com/avatar1.png",
          post_caption: "Exploring the beautiful beaches of Hawaii! 🌴🌊",
          post_images: ["https://example.com/beach1.jpg", "https://example.com/beach2.jpg"],
          visibility: "public",
          comments_disabled: false,
          created_at: "2024-12-10T14:30:00Z",
        },
        {
          post_id: 2,
          user_name: "Emily Smith",
          user_avatar: "https://example.com/avatar2.png",
          post_caption: "Throwback to my hiking adventure in the Rockies! 🏔️✨",
          post_images: ["https://example.com/hike1.jpg"],
          visibility: "friends",
          comments_disabled: true,
          created_at: "2024-12-09T10:20:00Z",
        },
        {
          post_id: 3,
          user_name: "Michael Brown",
          user_avatar: "https://example.com/avatar3.png",
          post_caption: "Here's a sneak peek of my latest art project. 🎨 #ArtistLife",
          post_images: ["https://example.com/artwork.jpg"],
          visibility: "public",
          comments_disabled: false,
          created_at: "2024-12-08T17:45:00Z",
        },
        {
          post_id: 4,
          user_name: "Sarah Johnson",
          user_avatar: "https://example.com/avatar4.png",
          post_caption: "Loving the cozy vibes of this coffee shop! ☕🍂",
          post_images: ["https://example.com/coffeeshop.jpg"],
          visibility: "friends",
          comments_disabled: false,
          created_at: "2024-12-07T09:00:00Z",
        },
        {
          post_id: 5,
          user_name: "Chris Lee",
          user_avatar: "https://example.com/avatar5.png",
          post_caption: "Game night with the squad! 🎮🕹️",
          post_images: ["https://example.com/game1.jpg", "https://example.com/game2.jpg"],
          visibility: "public",
          comments_disabled: false,
          created_at: "2024-12-06T21:15:00Z",
        },
      ];

      return common.successResponse(res, Messages.SUCCESS, HttpStatus.OK, data);
    } catch (error) {
      common.handleAsyncError(error, res);
    }
  },
  createPost: async (req, res) => {
    try {
      await postModel.createPost({ ...req.body, user_id: req.user.user_id });
      return common.successResponse(res, Messages.SUCCESS, HttpStatus.OK);
    } catch (error) {
      common.handleAsyncError(error, res);
    }
  },
};
