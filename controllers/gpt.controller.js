const OpenAI = require("openai");
const { Bad, Success } = require("../utils/constant");

const openai = new OpenAI();
module.exports = {
  Generator_Caption: async (req, res) => {
    try {
      // const completion = await openai.chat.completions.create({
      //   messages: [
      //     { role: "system", content: "You are caption generator assistant and your response should be inside 255 characters." },
      //     {
      //       role: "user",
      //       content: `Generate a captivating caption for the following post:${req.body.post}.`,
      //     },
      //   ],
      //   model: "gpt-3.5-turbo",
      //   // max_tokens: 30,
      // });

      // res.status(Success).json({ data: completion.choices[0].message?.content, status: Success });
      res.status(Success).json({
        data: '"Experiencing the serene beauty of Kedarnath with my soulmates – moments that will last a lifetime! 🏔️✨ #KedarnathTrip #UnforgettableJourneys #CherishingEveryMoment"',
        status: Success,
      });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
  Generator_Suggestion: async (req, res) => {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are message reply suggestion generator assistant and response should be inside 50 characters." },
          {
            role: "user",
            content: `Generate a reply suggestion for the following message:${req.body.message}.`,
          },
        ],
        model: "gpt-3.5-turbo",
        // max_tokens: 10,
      });

      res.status(Success).json({ data: completion.choices[0].message?.content?.replace(/['"]/g, ''), status: Success });
      // res.status(Success).json({ data: "I'm ssssfine, thanks.", status: Success });
    } catch (err) {
      res.status(Bad).json({ message: err.message, status: Bad });
    }
  },
};
