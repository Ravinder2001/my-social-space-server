const OpenAI = require("openai");
const { Bad, Success } = require("../utils/constant");

const openai = new OpenAI();
module.exports = {
  Post_Caption_Generator: async (req, res) => {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are caption generator assistant." },
          {
            role: "user",
            content: `Generate a captivating caption for the following post:${req.body.post}.
                    and the caption should be under 255 words only.`,
          },
        ],
        model: "gpt-3.5-turbo",
        // max_tokens: 30,
      });

      res.status(Success).json({ data: completion.choices[0], status: Success });
      //   res.status(Success).json({
      //     data: {
      //       index: 0,
      //       message: {
      //         role: "assistant",
      //         content:
      //           '"Experiencing the serene beauty of Kedarnath with my soulmates – moments that will last a lifetime! 🏔️✨ #KedarnathTrip #UnforgettableJourneys #CherishingEveryMoment"',
      //       },
      //       logprobs: null,
      //       finish_reason: "stop",
      //     },
      //     status: Success,
      //   });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
};
